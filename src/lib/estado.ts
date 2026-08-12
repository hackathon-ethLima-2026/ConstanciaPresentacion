import { PERIODO_ESTADO } from "./contract";
import {
  IconVerificado,
  IconPendiente,
  IconRetraso,
  IconVencido,
  IconParcial,
  IconAcuerdo,
} from "@/components/EstadoIcon";

/**
 * DoD 5.1: cero vocabulario cripto, cada estado se explica sin jerga, se distingue además del
 * color por texto e ícono dibujado (independencia del color, DoD 5.2) — nunca emoji.
 */
const ESTADO_INFO: Record<
  number,
  { etiqueta: string; Icono: typeof IconVerificado; ink: string; bg: string }
> = {
  [PERIODO_ESTADO.PENDIENTE]: {
    etiqueta: "Todavía no vence",
    Icono: IconPendiente,
    ink: "var(--ink-muted)",
    bg: "var(--paper)",
  },
  [PERIODO_ESTADO.CUMPLIDO]: {
    etiqueta: "Verificado",
    Icono: IconVerificado,
    ink: "var(--signal-ink)",
    bg: "color-mix(in srgb, var(--signal) 12%, var(--panel))",
  },
  [PERIODO_ESTADO.CUMPLIDO_CON_RETRASO]: {
    etiqueta: "Verificado con retraso",
    Icono: IconRetraso,
    ink: "var(--amber)",
    bg: "var(--amber-bg)",
  },
  [PERIODO_ESTADO.VENCIDO]: {
    // wayfinder/tickets/015: "vencido" nunca se muestra tal cual — no afirma ausencia de pago,
    // solo ausencia de comprobante verificado. Color neutral, no de alarma.
    etiqueta: "Sin comprobante registrado aún",
    Icono: IconVencido,
    ink: "var(--ink-muted)",
    bg: "var(--paper)",
  },
  [PERIODO_ESTADO.PARCIAL]: {
    etiqueta: "Cumplimiento parcial",
    Icono: IconParcial,
    ink: "var(--amber)",
    bg: "var(--amber-bg)",
  },
  [PERIODO_ESTADO.CUMPLIDO_POR_ACUERDO]: {
    etiqueta: "Cumplido por acuerdo",
    Icono: IconAcuerdo,
    ink: "var(--signal-ink)",
    bg: "color-mix(in srgb, var(--signal) 12%, var(--panel))",
  },
};

/**
 * ¿Este estado nació de un correo del banco verificado? Solo entonces la pantalla puede
 * mostrar la cadena de evidencia. `CUMPLIDO_POR_ACUERDO` se pactó fuera del banco y no tiene
 * correo que enseñar; `PENDIENTE` y `VENCIDO` todavía no tienen comprobante. Afirmar
 * "la firma del banco coincidió" en esos casos sería inventar la prueba.
 */
export function tieneComprobanteVerificado(estado: number): boolean {
  return (
    estado === PERIODO_ESTADO.CUMPLIDO ||
    estado === PERIODO_ESTADO.CUMPLIDO_CON_RETRASO ||
    estado === PERIODO_ESTADO.PARCIAL
  );
}

export function esConRetraso(estado: number): boolean {
  return estado === PERIODO_ESTADO.CUMPLIDO_CON_RETRASO;
}

export function esParcial(estado: number): boolean {
  return estado === PERIODO_ESTADO.PARCIAL;
}

export function infoEstado(estado: number) {
  return (
    ESTADO_INFO[estado] ?? {
      etiqueta: "Desconocido",
      Icono: IconPendiente,
      ink: "var(--ink-muted)",
      bg: "var(--paper)",
    }
  );
}
