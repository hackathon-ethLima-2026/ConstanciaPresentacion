import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { obligaciones } from "@/lib/schema";
import { generarSalt, generarToken } from "@/lib/tokens";

interface PayloadObligacion {
  rol?: string;
  email?: string;
  destinatarioNombre?: string;
  destinatarioUltimos4?: string;
  montoEsperadoCentavos?: number;
  diaVencimientoMes?: number;
}

type ReglaValidacion = [(b: PayloadObligacion) => boolean, string];

const REGLAS_VALIDACION: ReglaValidacion[] = [
  [(b) => b.rol !== "receptora" && b.rol !== "pagador", "rol debe ser 'receptora' o 'pagador'"],
  [(b) => !b.email || !/^\S+@\S+\.\S+$/.test(b.email), "Falta un correo válido"],
  [(b) => !b.destinatarioNombre || b.destinatarioNombre.trim().length < 2, "Falta el nombre del destinatario"],
  [(b) => !b.destinatarioUltimos4 || !/^\d{4}$/.test(b.destinatarioUltimos4), "Los últimos 4 dígitos de la cuenta deben ser 4 números"],
  [(b) => !b.montoEsperadoCentavos || b.montoEsperadoCentavos <= 0, "El monto debe ser mayor a cero"],
  [(b) => !b.diaVencimientoMes || b.diaVencimientoMes < 1 || b.diaVencimientoMes > 31, "El día de vencimiento debe estar entre 1 y 31"],
];

function validarPayloadObligacion(body: PayloadObligacion | null): string | null {
  if (!body) return "Cuerpo inválido";
  const fallo = REGLAS_VALIDACION.find(([esInvalido]) => esInvalido(body));
  return fallo ? fallo[1] : null;
}


export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as PayloadObligacion | null;
  const errorValidacion = validarPayloadObligacion(body);
  if (errorValidacion) {
    return NextResponse.json({ error: errorValidacion }, { status: 400 });
  }

  const payload = body!;
  const salt = generarSalt();
  const tokenReceptora = generarToken();
  const tokenPagador = generarToken();
  const tokenConfirmacion = generarToken();
  const emailNormalizado = payload.email!.trim().toLowerCase();

  await db.insert(obligaciones).values({
    destinatarioNombre: payload.destinatarioNombre!.trim(),
    destinatarioUltimos4: payload.destinatarioUltimos4!,
    destinatarioSalt: Buffer.from(salt.slice(2), "hex"),
    montoEsperadoCentavos: payload.montoEsperadoCentavos!,
    diaVencimientoMes: payload.diaVencimientoMes!,
    tokenReceptora,
    tokenPagador,
    tokenConfirmacion,
    emailReceptora: payload.rol === "receptora" ? emailNormalizado : null,
    emailPagador: payload.rol === "pagador" ? emailNormalizado : null,
  });

  const tokenPropio = payload.rol === "receptora" ? tokenReceptora : tokenPagador;

  return NextResponse.json({
    enlacePropio: `/o/${tokenPropio}`,
    enlaceConfirmacion: `/confirmar/${tokenConfirmacion}`,
  });
}

