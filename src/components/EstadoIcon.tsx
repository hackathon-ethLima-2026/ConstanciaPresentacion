// Iconos dibujados a mano, un solo trazo (1.5px, sin relleno) — nunca emoji como ícono,
// per el mundo de instrumento de calibración: cada marca es una lectura, no una decoración.
import type { SVGProps } from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconVerificado(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M6.8 10.2l2.1 2.1 4.3-4.6" />
    </svg>
  );
}

export function IconPendiente(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.8v4.2l2.8 1.6" />
    </svg>
  );
}

export function IconRetraso(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.8v4.2l3.4 2" />
      <path d="M15.8 4.2l1.6-.4-.4 1.6" />
    </svg>
  );
}

export function IconVencido(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3.2l7.8 13.5H2.2z" />
      <path d="M10 8.4v3.6" />
      <circle cx="10" cy="14.2" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconParcial(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 2.5A7.5 7.5 0 0 1 10 17.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconAcuerdo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10.5l3-3 2.3 2.3L14 4l3 3" />
      <path d="M12.5 5.5H17V10" />
    </svg>
  );
}
