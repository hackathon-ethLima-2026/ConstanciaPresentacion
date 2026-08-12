import type { Metadata } from "next";
import { Hanken_Grotesk, Martian_Mono } from "next/font/google";
import { CabeceraSitio } from "@/components/CabeceraSitio";
import { ASMRStaticBackground } from "@/components/ui/asmr-background";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-data",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Constancia",
  description:
    "Una prueba de que la pensión se pagó, que nadie puede discutir.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${hankenGrotesk.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="fixed inset-0 -z-10">
          <ASMRStaticBackground />
        </div>
        {/*
          THESIS: cada acuerdo es un instrumento calibrado, no una tarjeta de dashboard —
          el estado se lee como una traza fija en su sitio (verificado) o ausente (pendiente).
          OWN-WORLD (revisado): panel de misión oscuro — bordes rectos, tinta casi blanca sobre
          hoja profunda tipo espacio, acento de señal cian reservado para lo verificado; lecturas
          tabulares en monoespaciada; campo de estrellas estático de fondo (CSS puro, sin brillo
          ni parpadeo). Reemplaza la hoja clara original (candidato 3, seed 9edbc063) por pedido
          explícito del usuario, confirmado dos veces pese a que revierte la razón original
          (legibilidad al sol en mobile barato) — ver el comentario en globals.css :root para el
          detalle del tradeoff y cómo revertir si hace falta.
          STORY: quien mira sabe en segundos si el mes está en su sitio, sin leer jerga.
          FIRST VIEWPORT: título del acuerdo sobre la hoja, la traza del período activo
          centrada, la acción primaria como un borde recto, sin sombras ni tarjetas flotantes.
          FORM: Instrumento de calibración / panel de misión. shadcn/ui remapeado a estos mismos
          tokens (radius 0, paleta propia) — ver ticket 011.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
          review, the verdict, and DESIGN.md.
        */}
        <CabeceraSitio />
        {children}
      </body>
    </html>
  );
}
