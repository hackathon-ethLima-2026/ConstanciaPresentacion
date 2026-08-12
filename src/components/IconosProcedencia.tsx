/**
 * Marcas de PROCEDENCIA: de dónde salió cada eslabón de la prueba.
 *
 * Aquí conviven dos familias a propósito, y la diferencia es deliberada:
 *
 * 1. Logos de terceros (Gmail, Google) — a color, con su geometría oficial. Rompen la regla de
 *    "un solo trazo" del mundo de instrumento de calibración porque NO son decoración: son una
 *    cita. Decir "esto salió de tu Gmail" con un dibujo genérico de sobre obliga a leer el
 *    texto para creerlo; con la marca real se reconoce antes de leer, que es exactamente lo que
 *    esta pantalla necesita. Alterarles el color los volvería un dibujo cualquiera y perderían
 *    justo esa propiedad, así que se dejan tal cual.
 *
 * 2. Marcas propias (sello, registro, enlace) — un trazo de 1.5px sin relleno, idénticas a
 *    EstadoIcon.tsx, porque describen pasos NUESTROS y tienen que leerse como parte del
 *    instrumento, no como logos de algo.
 *
 * Nunca emoji, ni acá ni en EstadoIcon (ver el contrato de dirección en layout.tsx).
 */
import type { SVGProps } from "react";

const trazo = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Logo oficial de Gmail. `aria-hidden` porque el texto que acompaña ya lo nombra. */
export function IconGmail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 48 48" aria-hidden {...props}>
      <path
        fill="#4caf50"
        d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
      />
      <path
        fill="#1e88e5"
        d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
      />
      <polygon
        fill="#e53935"
        points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
      />
      <path
        fill="#c62828"
        d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
      />
      <path
        fill="#fbc02d"
        d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"
      />
    </svg>
  );
}

/** Logo oficial de Google, para el botón de conexión de cuenta. */
export function IconGoogle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 48 48" aria-hidden {...props}>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

/** Sello lacrado: la firma que el banco puso en el correo y que el programa recalculó. */
export function IconSello(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...trazo} {...props}>
      <path d="M10 2.2l2.3 1.4 2.7-.3 1 2.5 2.2 1.6-1 2.5 1 2.5-2.2 1.6-1 2.5-2.7-.3L10 17.8l-2.3-1.4-2.7.3-1-2.5L1.8 12.6l1-2.5-1-2.5 2.2-1.6 1-2.5 2.7.3z" />
      <path d="M7.2 10.1l1.9 1.9 3.7-4" />
    </svg>
  );
}

/** Bloques encadenados: el registro público donde quedó anotado el resultado. */
export function IconRegistro(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...trazo} {...props}>
      <rect x="2.2" y="7.6" width="4.8" height="4.8" />
      <rect x="13" y="7.6" width="4.8" height="4.8" />
      <path d="M7 10h6" />
      <path d="M9.4 4.6h1.2M9.4 15.4h1.2" />
    </svg>
  );
}

/** Flecha que sale del marco — enlace que abre fuera del sitio. */
export function IconEnlaceExterno(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...trazo} width={14} height={14} {...props}>
      <path d="M8.2 3.4H4.2A1.4 1.4 0 0 0 2.8 4.8v11a1.4 1.4 0 0 0 1.4 1.4h11a1.4 1.4 0 0 0 1.4-1.4v-4" />
      <path d="M11.6 2.6h5.6v5.6M17.2 2.6l-7.4 7.4" />
    </svg>
  );
}
