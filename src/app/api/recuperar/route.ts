import { NextRequest, NextResponse } from "next/server";
import { or, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { obligaciones } from "@/lib/schema";
import { enviarCorreo } from "@/lib/mailer";

// Mensaje siempre igual, exista o no una coincidencia — no confirma ni niega si un correo
// tiene un acuerdo registrado (wayfinder/tickets/014-recuperar-enlace-por-correo.md, punto 4).
const MENSAJE_GENERICO = "Si ese correo tiene un acuerdo registrado, le va a llegar un enlace en unos minutos.";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;
  if (!email) {
    return NextResponse.json({ error: "Falta el correo" }, { status: 400 });
  }

  const filas = await db
    .select({
      tokenReceptora: obligaciones.tokenReceptora,
      tokenPagador: obligaciones.tokenPagador,
      emailReceptora: obligaciones.emailReceptora,
      emailPagador: obligaciones.emailPagador,
    })
    .from(obligaciones)
    .where(or(eq(obligaciones.emailReceptora, email), eq(obligaciones.emailPagador, email)));

  if (filas.length > 0) {
    const origin = new URL(req.url).origin;
    const enlaces = filas.map((f) => {
      const token = f.emailReceptora === email ? f.tokenReceptora : f.tokenPagador;
      return `${origin}/o/${token}`;
    });
    const texto =
      `Encontramos ${enlaces.length === 1 ? "un acuerdo" : `${enlaces.length} acuerdos`} registrado${enlaces.length === 1 ? "" : "s"} con este correo:\n\n` +
      enlaces.join("\n") +
      "\n\nSi no reconoces esto, puedes ignorar este correo.";

    // No bloquear la respuesta al usuario por el envío — igual siempre se responde lo mismo.
    enviarCorreo(email, "Tu enlace de Constancia", texto).catch(() => {});
  }

  return NextResponse.json({ mensaje: MENSAJE_GENERICO });
}
