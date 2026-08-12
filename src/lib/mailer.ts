import nodemailer from "nodemailer";

/**
 * Envío saliente vía Gmail SMTP — no Resend, porque sin dominio propio Resend no manda a
 * destinatarios reales (confirmado contra su doc). Requiere una cuenta de Gmail del proyecto
 * con una contraseña de aplicación (no la contraseña normal de la cuenta).
 * Ver wayfinder/tickets/014-recuperar-enlace-por-correo.md.
 */
function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Falta GMAIL_USER o GMAIL_APP_PASSWORD");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function enviarCorreo(destinatario: string, asunto: string, textoPlano: string) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: destinatario,
    subject: asunto,
    text: textoPlano,
  });
}
