/**
 * Camino único desde un .eml crudo hasta el registro on-chain del pago.
 *
 * Lo comparten la subida manual y la búsqueda automática en Gmail a propósito: da igual
 * de dónde salgan los bytes, la verificación siempre la hace el contrato. Si esto se
 * duplicara, una de las dos rutas podría relajar la validación sin que se note.
 */

import { db } from "./db";
import { comprobantes } from "./schema";
import { getContratoRelayer } from "./contract";

const MENSAJES_ERROR: Record<string, string> = {
  DkimInvalido:
    "No pudimos verificar la firma del banco en este correo. Confirma que es el archivo .eml original descargado de Gmail (menú de tres puntos → Mostrar original → Descargar mensaje original), sin modificarlo.",
  // La firma del banco SÍ era válida: lo que falló fue leer los datos del cuerpo. Casi siempre
  // significa que el correo es de otro tipo de operación, o que el BCP cambió la plantilla.
  CamposNoLegibles:
    "Este correo viene firmado por el banco, pero no pudimos leer sus datos. Asegúrate de que sea la constancia de una transferencia, no otro aviso del BCP.",
  DestinatarioNoCoincide:
    "El destinatario de esta transferencia no coincide con la cuenta registrada para este acuerdo.",
  CorreoYaUsado: "Este comprobante ya fue registrado antes.",
  ObligacionNoExiste: "Este acuerdo todavía no está registrado.",
  ObligacionCerrada: "Este acuerdo ya fue cerrado y reemplazado por uno nuevo.",
};

/**
 * Nombre del error del contrato (`DestinatarioNoCoincide`, `CamposNoLegibles`, …) o null si el
 * fallo no fue un rechazo suyo sino algo técnico (RPC caído, sin gas, revert sin datos).
 *
 * Se expone el NOMBRE y no solo el mensaje porque quien revisa varios correos necesita
 * agruparlos por causa: son motivos distintos con arreglos distintos.
 */
export function nombreDeRechazo(err: unknown): string | null {
  const anyErr = err as { data?: string };
  if (!anyErr?.data) return null;
  try {
    const parsed = getContratoRelayer().interface.parseError(anyErr.data);
    return parsed && MENSAJES_ERROR[parsed.name] ? parsed.name : null;
  } catch {
    return null;
  }
}

export function mensajeDeError(err: unknown): string {
  const nombre = nombreDeRechazo(err);
  if (nombre) return MENSAJES_ERROR[nombre];

  const anyErr = err as { shortMessage?: string; reason?: string };
  return (
    anyErr?.shortMessage ??
    anyErr?.reason ??
    "No pudimos registrar el comprobante. Intenta de nuevo."
  );
}

/** De dónde salieron los bytes del correo. Se guarda para que la constancia no afirme de más. */
export type OrigenComprobante = "gmail" | "manual";

export async function procesarPruebaDePago(
  contractObligacionId: string,
  destinatarioSalt: Buffer,
  emlBytes: Uint8Array,
  obligacionId: string,
  origen: OrigenComprobante,
): Promise<string | undefined> {
  const saltHex = `0x${destinatarioSalt.toString("hex")}`;
  const contrato = getContratoRelayer();

  // staticCall primero: así un correo inválido falla sin gastar gas.
  await contrato.enviarPruebaDePago.staticCall(
    BigInt(contractObligacionId),
    emlBytes,
    saltHex,
  );
  const tx = await contrato.enviarPruebaDePago(
    BigInt(contractObligacionId),
    emlBytes,
    saltHex,
  );
  const receipt = await tx.wait();

  const ahora = new Date();
  await db
    .insert(comprobantes)
    .values({
      obligacionId,
      anio: ahora.getFullYear(),
      mes: ahora.getMonth() + 1,
      emailHash: receipt?.hash ?? "",
      txHash: receipt?.hash ?? null,
      origen,
      estado: "verificado",
    })
    .onConflictDoNothing();

  return receipt?.hash;
}
