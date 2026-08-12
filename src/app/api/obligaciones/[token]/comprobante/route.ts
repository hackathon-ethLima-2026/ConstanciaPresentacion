import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { obligaciones } from "@/lib/schema";
import { contratoConfigurado } from "@/lib/contract";
import { mensajeDeError, procesarPruebaDePago } from "@/lib/comprobante";

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ token: string }> }
) {
  const { token } = await ctx.params;

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

  const form = await req.formData().catch(() => null);
  const archivo = form?.get("archivo");
  if (!archivo || !(archivo instanceof Blob)) {
    return NextResponse.json({ error: "Falta el archivo .eml" }, { status: 400 });
  }

  const emlBytes = new Uint8Array(await archivo.arrayBuffer());

  try {
    const txHash = await procesarPruebaDePago(
      o.contractObligacionId,
      o.destinatarioSalt,
      emlBytes,
      o.id,
      "manual"
    );
    return NextResponse.json({ ok: true, txHash });
  } catch (err) {
    return NextResponse.json({ error: mensajeDeError(err) }, { status: 422 });
  }
}
