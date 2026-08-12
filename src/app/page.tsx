import { PitchPresentation } from "@/components/PitchPresentation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constancia — Presentación Pitch ethLima 2026",
  description: "Presentación interactiva de Constancia App para ethLima 2026 (Track Arbitrum Stylus)",
};

export default function Home() {
  return <PitchPresentation />;
}