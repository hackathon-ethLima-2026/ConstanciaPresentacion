/**
 * Explica por qué NINGUNO de los correos del banco sirvió para registrar el pago.
 *
 * La búsqueda en Gmail es deliberadamente amplia (todo lo que venga del BCP en 60 días), así
 * que lo normal es que la mayoría de los candidatos se rechace: son boletines, alertas y
 * estados de cuenta. Rechazar no es el problema — el problema es contarlo mal.
 *
 * La versión anterior guardaba `ultimoRechazo` y lo sobreescribía en cada vuelta, así que la
 * pantalla mostraba el motivo del ÚLTIMO correo de la lista. Con nueve transferencias a otra
 * cuenta y un boletín al final, decía "no pudimos leer sus datos": el rechazo menos
 * informativo de los diez, y encima apuntaba a depurar la plantilla del correo cuando lo que
 * fallaba era la cuenta de destino.
 */

/** Cuántos correos se rechazaron por cada error del contrato. */
export type ConteoRechazos = Record<string, number>;

/**
 * De más a menos informativo. No es la frecuencia lo que manda: un solo
 * `DestinatarioNoCoincide` dice muchísimo más que nueve `CamposNoLegibles`, porque significa
 * que sí hubo transferencias reales y el desajuste está en la cuenta registrada.
 */
const PRIORIDAD: readonly string[] = [
  "CorreoYaUsado",
  "DestinatarioNoCoincide",
  "CamposNoLegibles",
  "DkimInvalido",
  "ObligacionCerrada",
  "ObligacionNoExiste",
];

function correos(n: number): string {
  return n === 1 ? "1 correo" : `${n} correos`;
}

function transferencias(n: number): string {
  return n === 1 ? "1 era una transferencia" : `${n} eran transferencias`;
}

/** El error dominante: el más informativo de los que efectivamente ocurrieron. */
export function rechazoDominante(conteo: ConteoRechazos): string | null {
  return PRIORIDAD.find((nombre) => (conteo[nombre] ?? 0) > 0) ?? null;
}

export function resumirRechazos(
  conteo: ConteoRechazos,
  revisados: number,
  ultimos4: string,
): string {
  const dominante = rechazoDominante(conteo);

  switch (dominante) {
    case "CorreoYaUsado":
      return "Ese comprobante ya estaba registrado. El pago de este período ya figura en el acuerdo.";

    // El caso más útil de distinguir: hubo constancias de transferencia de verdad, pero hacia
    // otra cuenta. Decir cuántas evita que la persona crea que el sistema no encontró nada.
    case "DestinatarioNoCoincide": {
      const n = conteo.DestinatarioNoCoincide;
      return `Revisamos ${correos(revisados)} del BCP y ${transferencias(n)}, pero ninguna fue a la cuenta terminada en ${ultimos4} de este acuerdo. Verifica que el pago se haya hecho a esa cuenta.`;
    }

    case "CamposNoLegibles":
      return `Revisamos ${correos(revisados)} del BCP y ninguno es una constancia de transferencia — son avisos de otro tipo. Si ya hiciste el pago, reenvía o sube la constancia a mano.`;

    case "DkimInvalido":
      return `Revisamos ${correos(revisados)} del BCP pero no pudimos verificar la firma del banco en ninguno. Sube el .eml original descargado de Gmail, sin modificarlo.`;

    case "ObligacionCerrada":
      return "Este acuerdo ya fue cerrado y reemplazado por uno nuevo.";

    case "ObligacionNoExiste":
      return "Este acuerdo todavía no está registrado en el sistema.";

    default:
      return `Revisamos ${correos(revisados)} del BCP y ninguno corresponde a este acuerdo.`;
  }
}
