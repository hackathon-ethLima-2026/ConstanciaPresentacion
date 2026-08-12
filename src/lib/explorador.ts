/**
 * Enlaces al registro público, para que la prueba sea comprobable por fuera de este sitio.
 *
 * Es el eslabón que convierte "confía en nosotros" en "míralo tú misma": el resultado vive en
 * un sitio que no controlamos. Sin este enlace, la pantalla de verificado es una afirmación
 * nuestra; con él, es verificable.
 *
 * En la interfaz el enlace NUNCA se nombra con jerga ("blockchain", "Arbitrum", "tx"): se
 * llama registro público, per la restricción de PRODUCT.md. La jerga vive del lado de allá.
 */

const EXPLORADORES: Record<number, string> = {
  42161: "https://arbiscan.io",
  421614: "https://sepolia.arbiscan.io",
};

function base(): string | null {
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
  return EXPLORADORES[chainId] ?? null;
}

/** URL de la anotación concreta, o null si la red no tiene explorador conocido. */
export function urlDeRegistro(txHash: string): string | null {
  const raiz = base();
  return raiz ? `${raiz}/tx/${txHash}` : null;
}

/**
 * Abrevia un identificador largo para mostrarlo sin romper la fila: 0x9852219d…4325f7f8.
 * Se conservan las dos puntas porque son las que se comparan de un vistazo contra el
 * explorador; recortar solo el final haría que dos anotaciones distintas se vieran iguales.
 */
export function abreviarHash(hash: string): string {
  return hash.length <= 20 ? hash : `${hash.slice(0, 10)}…${hash.slice(-8)}`;
}
