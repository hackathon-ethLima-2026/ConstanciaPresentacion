import { keccak256, concat, type BytesLike } from "ethers";
// Extensión explícita: así este módulo se puede importar tal cual desde los tests, que corren
// en el runner nativo de Node (ESM) y no en el bundler. Ver el script `test` en package.json.
import { toBytesDelCorreo } from "./bytesCorreo.ts";

/**
 * Debe coincidir EXACTAMENTE con `calcular_commitment` en contract/src/lib.rs:
 * keccak256(ultimos4_bytes || salt_bytes), concatenación cruda, sin ABI-encode.
 *
 * El nombre del destinatario NO entra. Estuvo aquí y se quitó: se comparaba lo que teclea una
 * persona contra lo que renderiza el banco, así que fallaba en cuanto había un apellido de
 * más o una tilde distinta. El razonamiento completo está en el comentario de esa función.
 *
 * Los 4 dígitos se hashean como TEXTO ("8200"), no como número: el contrato los recibe como
 * los bytes que extrajo del correo. El vector de prueba compartido vive en commitment.test.ts
 * y en el test `coincide_con_la_implementacion_de_typescript` del contrato.
 */
export function calcularCommitment(ultimos4: string, saltHex: string): string {
  const partes: BytesLike[] = [toBytesDelCorreo(ultimos4), saltHex];
  return keccak256(concat(partes));
}
