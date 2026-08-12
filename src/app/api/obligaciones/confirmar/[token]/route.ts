import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { obligaciones } from "@/lib/schema";
import { calcularCommitment } from "@/lib/commitment";
import { contratoConfigurado, getContratoRelayer } from "@/lib/contract";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;

  const [o] = await db
    .select({
      destinatarioNombre: obligaciones.destinatarioNombre,
      destinatarioUltimos4: obligaciones.destinatarioUltimos4,
      montoEsperadoCentavos: obligaciones.montoEsperadoCentavos,
      diaVencimientoMes: obligaciones.diaVencimientoMes,
      confirmadaPorAmbas: obligaciones.confirmadaPorAmbas,
    })
    .from(obligaciones)
    .where(eq(obligaciones.tokenConfirmacion, token));

  if (!o) {
    return NextResponse.json({ error: "Este enlace no existe o ya fue usado" }, { status: 404 });
  }
  return NextResponse.json(o);
}

async function registrarObligacionEnContrato(o: {
  destinatarioSalt: Buffer;
  destinatarioUltimos4: string;
  montoEsperadoCentavos: number;
  diaVencimientoMes: number;
}) {
  const saltHex = `0x${o.destinatarioSalt.toString("hex")}`;
  // Solo la cuenta entra al commitment; el nombre se queda off-chain para la constancia
  // legible (ver calcular_commitment en contract/src/lib.rs).
  const commitment = calcularCommitment(o.destinatarioUltimos4, saltHex);
  const contrato = getContratoRelayer();
  const obligacionId: bigint = await contrato.registrarObligacion.staticCall(
    commitment,
    BigInt(o.montoEsperadoCentavos),
    o.diaVencimientoMes
  );
  const tx = await contrato.registrarObligacion(commitment, BigInt(o.montoEsperadoCentavos), o.diaVencimientoMes);
  await tx.wait();
  return obligacionId;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Falta un correo válido" }, { status: 400 });
  }

  const [o] = await db.select().from(obligaciones).where(eq(obligaciones.tokenConfirmacion, token));
  if (!o) {
    return NextResponse.json({ error: "Este enlace no existe o ya fue usado" }, { status: 404 });
  }
  if (o.confirmadaPorAmbas) {
    return NextResponse.json({ error: "Este acuerdo ya fue confirmado antes" }, { status: 409 });
  }
  if (!contratoConfigurado()) {
    return NextResponse.json(
      { error: "El sistema todavía no tiene el contrato desplegado — ver contract/DEPLOY.md" },
      { status: 503 }
    );
  }

  const obligacionId = await registrarObligacionEnContrato(o);
  const emailFaltante = o.emailReceptora ? { emailPagador: email } : { emailReceptora: email };

  await db
    .update(obligaciones)
    .set({
      confirmadaPorAmbas: true,
      confirmadaEn: new Date(),
      contractObligacionId: obligacionId.toString(),
      ...emailFaltante,
    })
    .where(eq(obligaciones.id, o.id));

  return NextResponse.json({ ok: true });
}

