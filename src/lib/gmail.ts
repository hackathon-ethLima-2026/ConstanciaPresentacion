/**
 * Lectura del buzón del pagador para encontrar la notificación del BCP sin que tenga que
 * exportar el .eml a mano — ver wayfinder/tickets/013-conexion-gmail-oauth.md.
 *
 * PROPIEDAD CLAVE: este módulo NO decide si un pago ocurrió. Baja el mensaje en crudo
 * (format=RAW, bytes idénticos a los que firmó el banco) y se los entrega al contrato,
 * que verifica la firma DKIM on-chain. Si aquí se eligiera el correo equivocado —o uno
 * falsificado— el contrato lo rechaza. Automatizar la búsqueda no amplía la superficie
 * de confianza en el servidor; solo le ahorra cuatro pasos manuales a la usuaria.
 *
 * El correo de confirmación del BCP dice "Enviado a", así que vive en el buzón de quien
 * ENVÍA el dinero: el pagador, no la receptora.
 */

import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { accounts } from "./schema";

const GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

// Se deja deliberadamente amplia: el filtro real y confiable es la verificación DKIM del
// contrato, no esta consulta. Preferimos traer algún candidato de más a perder el correcto
// por afinar demasiado el criterio.
const CONSULTA_BCP =
  "from:(bcp.com.pe OR notificacionesbcp.com.pe) newer_than:60d";

export class GmailNoConectado extends Error {
  constructor() {
    super(
      "Todavía no conectaste tu Gmail, o el permiso caducó. Inicia sesión con Google de nuevo para reconectarlo.",
    );
  }
}

type CuentaGoogle = {
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
};

/**
 * Devuelve un access_token vigente. Los tokens de Google duran una hora, así que casi
 * siempre hay que renovarlo con el refresh_token guardado por el adapter de Auth.js.
 */
export async function obtenerAccessToken(userId: string): Promise<string> {
  const [cuenta] = await db
    .select({
      refresh_token: accounts.refresh_token,
      access_token: accounts.access_token,
      expires_at: accounts.expires_at,
    })
    .from(accounts)
    .where(and(eq(accounts.userId, userId), eq(accounts.provider, "google")));

  if (!cuenta) throw new GmailNoConectado();

  if (tokenSigueVigente(cuenta)) return cuenta.access_token!;
  if (!cuenta.refresh_token) throw new GmailNoConectado();

  return renovarAccessToken(userId, cuenta.refresh_token);
}

// Margen de 60s para no usar un token que caduca en pleno vuelo.
function tokenSigueVigente(cuenta: CuentaGoogle): boolean {
  if (!cuenta.access_token || !cuenta.expires_at) return false;
  return cuenta.expires_at - 60 > Math.floor(Date.now() / 1000);
}

async function renovarAccessToken(
  userId: string,
  refreshToken: string,
): Promise<string> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID!,
      client_secret: process.env.AUTH_GOOGLE_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  // En modo Testing el refresh_token caduca a los 7 días: aquí es donde se nota, y el
  // mensaje tiene que mandar a reconectar en vez de dejar un error opaco.
  if (!res.ok || !data.access_token) throw new GmailNoConectado();

  const expiresAt =
    Math.floor(Date.now() / 1000) + Number(data.expires_in ?? 3600);
  await db
    .update(accounts)
    .set({ access_token: data.access_token, expires_at: expiresAt })
    .where(and(eq(accounts.userId, userId), eq(accounts.provider, "google")));

  return data.access_token;
}

/** IDs de los mensajes candidatos, del más reciente al más antiguo. */
export async function buscarCorreosBcp(
  accessToken: string,
  maximo = 10,
): Promise<string[]> {
  const url = `${GMAIL_API}/messages?q=${encodeURIComponent(CONSULTA_BCP)}&maxResults=${maximo}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401 || res.status === 403) throw new GmailNoConectado();
  if (!res.ok)
    throw new Error("No pudimos consultar tu Gmail. Intenta de nuevo.");

  const data = (await res.json()) as { messages?: { id: string }[] };
  return (data.messages ?? []).map((m) => m.id);
}

/**
 * Baja el mensaje tal cual lo recibió Gmail. `format=RAW` devuelve el RFC 822 completo en
 * base64url — es lo que hace que la firma DKIM sobreviva y el contrato pueda verificarla.
 * Cualquier otro formato reconstruye el mensaje y la invalida.
 */
export async function descargarEmlCrudo(
  accessToken: string,
  messageId: string,
): Promise<Uint8Array> {
  const res = await fetch(`${GMAIL_API}/messages/${messageId}?format=RAW`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401 || res.status === 403) throw new GmailNoConectado();
  if (!res.ok) throw new Error("No pudimos descargar el correo desde Gmail.");

  const data = (await res.json()) as { raw?: string };
  if (!data.raw) throw new Error("Gmail devolvió el correo vacío.");

  return new Uint8Array(Buffer.from(data.raw, "base64url"));
}
