/**
 * El cuerpo del correo de BCP viene en UTF-8 — el propio correo declara
 * `Content-Type: text/html; charset=utf-8`, verificado contra un .eml real. El contrato
 * recalcula el commitment del destinatario a partir de esos bytes crudos, así que lo que el
 * usuario tipea en el formulario tiene que hashearse como los MISMOS bytes UTF-8.
 *
 * Este archivo se llamaba latin1.ts y convertía a iso-8859-1, por un análisis hecho sobre el
 * correo copiado como texto plano en vez de sobre el .eml. El bug era silencioso y de la peor
 * clase: para un nombre sin tildes los bytes coinciden y todo parecía funcionar, pero
 * "María Pérez" producía un commitment distinto al del contrato y devolvía
 * DestinatarioNoCoincide para siempre, sin ninguna pista de por qué.
 * Ver wayfinder/tickets/008-extraccion-campos-correo.md.
 */
export function toBytesDelCorreo(input: string): Uint8Array {
  return new TextEncoder().encode(input);
}
