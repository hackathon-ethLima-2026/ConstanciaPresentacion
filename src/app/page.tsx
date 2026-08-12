import ConstanciaPitch from "@/components/PitchPresentation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constancia — La constancia de pago que se genera sola",
  description: "Transformamos el correo automático del banco en una prueba legal inmutable de la pensión de alimentos. ethLima 2026.",
};

export default function Home() {
  return <ConstanciaPitch />;
}