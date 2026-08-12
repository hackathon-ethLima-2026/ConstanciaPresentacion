import { PitchPresentation } from "@/components/PitchPresentation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constancia — Pitch Presentation",
  description: "Presentación interactiva para la Hackathon ethLima 2026",
};

export default function PitchPage() {
  return <PitchPresentation />;
}
