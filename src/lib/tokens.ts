import { randomBytes } from "crypto";

/** Token de acceso por enlace directo — no hay cuentas, el token ES el acceso (DoD 5.2). */
export function generarToken(): string {
  return randomBytes(24).toString("base64url");
}

/** Salt de 32 bytes para el commitment del destinatario (ver wayfinder/tickets/006). */
export function generarSalt(): string {
  return `0x${randomBytes(32).toString("hex")}`;
}
