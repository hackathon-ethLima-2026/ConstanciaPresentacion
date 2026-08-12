import { NextRequest, NextResponse } from "next/server";
import { and, eq, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { comprobantes, obligaciones } from "@/lib/schema";
import { contratoConfigurado, getContratoLectura } from "@/lib/contract";

/**
 * Identificador de la anotación en el registro público. Se expone para que la pantalla pueda
 * enlazar la prueba a un sitio que no controlamos: sin esto, "verificado" es solo palabra
 * nuestra. Es un hash de transacción pública — no revela nada del acuerdo ni de las personas.
 */
async function obtenerTxDelPeriodo(obligacionId: string, anio: number, mes: number) {
  const [c] = await db
    .select({ txHash: comprobantes.txHash, origen: comprobantes.origen })
    .from(comprobantes)
    .where(
      and(
        eq(comprobantes.obligacionId, obligacionId),
        eq(comprobantes.anio, anio),
        eq(comprobantes.mes, mes)
      )
    );
  return { txHash: c?.txHash ?? null, origen: c?.origen ?? null };
}

async function obtenerEstadoPeriodo(contractObligacionId: string, anio: number, mes: number) {
  if (!contratoConfigurado()) return null;
  const contrato = getContratoLectura();
  const [estado, montoVerificadoCentavos, timestampPago] = await contrato.obtenerPeriodo(
    BigInt(contractObligacionId),
    anio,
    mes
  );
  return {
    estado: Number(estado),
    montoVerificadoCentavos: montoVerificadoCentavos.toString(),
    timestampPago: timestampPago.toString(),
  };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;

  const [o] = await db
    .select()
    .from(obligaciones)
    .where(or(eq(obligaciones.tokenReceptora, token), eq(obligaciones.tokenPagador, token)));

  if (!o) {
    return NextResponse.json({ error: "Este enlace no existe" }, { status: 404 });
  }

  const rol = o.tokenReceptora === token ? "receptora" : "pagador";

  if (!o.confirmadaPorAmbas || !o.contractObligacionId) {
    return NextResponse.json({
      rol,
      confirmadaPorAmbas: false,
      montoEsperadoCentavos: o.montoEsperadoCentavos,
      diaVencimientoMes: o.diaVencimientoMes,
    });
  }

  const url = new URL(req.url);
  const ahora = new Date();
  const anio = Number(url.searchParams.get("anio") ?? ahora.getFullYear());
  const mes = Number(url.searchParams.get("mes") ?? ahora.getMonth() + 1);

  const [periodo, comprobante] = await Promise.all([
    obtenerEstadoPeriodo(o.contractObligacionId, anio, mes),
    obtenerTxDelPeriodo(o.id, anio, mes),
  ]);

  return NextResponse.json({
    rol,
    confirmadaPorAmbas: true,
    montoEsperadoCentavos: o.montoEsperadoCentavos,
    diaVencimientoMes: o.diaVencimientoMes,
    destinatarioUltimos4: o.destinatarioUltimos4,
    anio,
    mes,
    periodo,
    txHash: comprobante.txHash,
    origenComprobante: comprobante.origen,
    contratoDesplegado: contratoConfigurado(),
  });
}

