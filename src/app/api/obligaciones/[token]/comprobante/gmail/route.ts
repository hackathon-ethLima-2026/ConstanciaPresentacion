import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { obligaciones } from "@/lib/schema";
import { contratoConfigurado } from "@/lib/contract";
import { mensajeDeError, nombreDeRechazo, procesarPruebaDePago } from "@/lib/comprobante";
import { resumirRechazos, type ConteoRechazos } from "@/lib/diagnostico";
import {
  GmailNoConectado,
  buscarCorreosBcp,
  descargarEmlCrudo,
  obtenerAccessToken,
} from "@/lib/gmail";

/**
 * Busca la notificación del BCP en el Gmail del pagador y la registra on-chain, para que
 * no tenga que exportar el .eml a mano cada mes.
 *
 * No hay un "detector de pagos" aquí: se bajan los correos candidatos del banco y se le
 * ofrecen al contrato uno por uno. El contrato acepta como mucho el que trae una firma
 * DKIM válida de notificacionesbcp.com.pe con el destinatario correcto. Elegir mal aquí
 * no puede producir un falso positivo, solo un intento rechazado.
 */
export async function POST(
  _req: Request,
  ctx: { params: Promise<{ token: string }> }
) {
  const { token } = await ctx.params;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Inicia sesión con Google para que podamos buscar el correo del banco." },
      { status: 401 }
    );
  }

  const [o] = await db
    .select()
    .from(obligaciones)
    .where(or(eq(obligaciones.tokenReceptora, token), eq(obligaciones.tokenPagador, token)));

  if (!o) {
    return NextResponse.json({ error: "Este enlace no existe" }, { status: 404 });
  }
  if (!o.confirmadaPorAmbas || !o.contractObligacionId) {
    return NextResponse.json(
      { error: "Este acuerdo todavía no fue confirmado por las dos partes" },
      { status: 409 }
    );
  }
  if (!contratoConfigurado()) {
    return NextResponse.json(
      { error: "El sistema todavía no tiene el contrato desplegado — ver contract/DEPLOY.md" },
      { status: 503 }
    );
  }

  try {
    const accessToken = await obtenerAccessToken(session.user.id);
    const ids = await buscarCorreosBcp(accessToken);

    if (ids.length === 0) {
      return NextResponse.json(
        {
          error:
            "No encontramos ningún correo del BCP en tu Gmail de los últimos 60 días. Si el pago fue a otra cuenta de correo, sube el archivo a mano.",
        },
        { status: 404 }
      );
    }

    return await intentarCandidatos(accessToken, ids, o);
  } catch (err) {
    if (err instanceof GmailNoConectado) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: mensajeDeError(err) }, { status: 502 });
  }
}

type Obligacion = typeof obligaciones.$inferSelect;

async function intentarCandidatos(accessToken: string, ids: string[], o: Obligacion) {
  // Se cuentan los rechazos por causa en vez de quedarse con el último: ver diagnostico.ts.
  const conteo: ConteoRechazos = {};

  for (const id of ids) {
    const emlBytes = await descargarEmlCrudo(accessToken, id);
    try {
      const txHash = await procesarPruebaDePago(
        o.contractObligacionId!,
        o.destinatarioSalt,
        emlBytes,
        o.id,
        "gmail"
      );
      return NextResponse.json({ ok: true, txHash, revisados: ids.length });
    } catch (err) {
      // Un rechazo del contrato solo descarta ESTE correo: seguimos con el siguiente.
      // Un fallo técnico (RPC caído, sin gas) sí corta, porque reintentar no ayuda.
      const rechazo = nombreDeRechazo(err);
      if (!rechazo) throw err;
      conteo[rechazo] = (conteo[rechazo] ?? 0) + 1;
    }
  }

  return NextResponse.json(
    {
      error: resumirRechazos(conteo, ids.length, o.destinatarioUltimos4),
      revisados: ids.length,
      // Desglose por causa: lo que hace depurable un "no encontramos nada" sin leer los logs.
      rechazos: conteo,
    },
    { status: 422 }
  );
}
