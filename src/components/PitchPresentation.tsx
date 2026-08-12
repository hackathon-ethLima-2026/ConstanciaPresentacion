"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ShieldCheck, CheckCircle2, Clock, FileText, Lock, Sparkles, ExternalLink, ArrowRight } from "lucide-react";

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

// Data for REDAM chart
const redamData = [
  { year: "2021", cases: 421 },
  { year: "2022", cases: 994 },
  { year: "2023", cases: 3115 },
  { year: "2024", cases: 7495 },
  { year: "2025", cases: 8000 },
  { year: "2026", cases: 18223 },
];

export function PitchPresentation() {
  const [isMounted, setIsMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#080c13] text-slate-200 font-sans relative overflow-hidden">
      {/* Background space pattern */}
      <div
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #080c13 0%, #040609 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMSI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9Ijk1IiByPSIxLjUiIGZpbGw9IiMwNmI2ZDQiLz48Y2lyY2xlIGN4PSI3MjAiIGN5PSIzMDAiIHI9IjEiLz48Y2lyY2xlIGN4PSI0NTAiIGN5PSI1NTAiIHI9IjEiIGZpbGw9IiMwNmI2ZDQiLz48Y2lyY2xlIGN4PSIxNzAiIGN5PSI3MDAiIHI9IjEiLz48L2c+PC9zdmc+')] bg-repeat" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/40 bg-[#06b6d4]/10 px-3 py-1 text-xs font-mono text-[#06b6d4] mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>ethLima Hackathon 2026 · Track Arbitrum Stylus</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Constancia
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Convertimos el correo que el banco ya te manda en una prueba de pago que nadie puede discutir.
        </p>

        <Link
          href="/nueva"
          className="bg-slate-100 hover:bg-white text-slate-900 font-medium py-3 px-8 rounded-md text-lg transition-all transform hover:scale-[1.02] shadow-lg mb-12 inline-flex items-center gap-2"
        >
          <span>Registrar un acuerdo</span>
          <ArrowRight className="h-5 w-5" />
        </Link>

        <p className="text-sm text-slate-500 max-w-lg mb-20 leading-relaxed">
          Si ya tienes un acuerdo registrado, entra por el enlace que recibiste — no hace falta crear una cuenta.{" "}
          <Link href="/recuperar" className="text-slate-300 underline underline-offset-4 hover:text-white">
            ¿Lo perdiste?
          </Link>{" "}
          ·{" "}
          <Link href="/perfil" className="text-slate-300 underline underline-offset-4 hover:text-white">
            Ver mi perfil
          </Link>
        </p>

        <div className="w-full max-w-4xl opacity-90 mt-4">
          <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest font-mono">
            Cada acuerdo confirmado queda respaldado así:
          </p>
          <div className="grid grid-cols-3 border border-slate-800 rounded-lg overflow-hidden bg-[#0d121b] shadow-2xl">
            <div className="p-4 border-r border-slate-800 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">Banco</span>
              <span className="font-mono text-white text-lg font-semibold">BCP</span>
            </div>
            <div className="p-4 border-r border-slate-800 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">Verificación</span>
              <span className="font-mono text-white text-lg font-semibold">Firma del banco</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">Registro</span>
              <span className="font-mono text-[#06b6d4] text-lg font-semibold">Permanente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative z-10 bg-[#06090e]">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  La carga de la prueba está al revés.
                </h2>
                <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                  Hoy, cuando un padre no paga la pensión, la madre tiene que probar que el dinero no llegó. Tiene que ir al juzgado, presentar estados de cuenta y demostrar un hecho negativo.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  La burocracia de la evidencia asume que el impago es un accidente, no una infracción.
                </p>
              </div>
              <div className="bg-[#111827]/80 border border-slate-800 p-8 rounded-2xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/80"></div>
                <div className="text-slate-300 space-y-4">
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-mono text-sm">1</div>
                    <span>No recibe el depósito</span>
                  </div>
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-mono text-sm">2</div>
                    <span>Pide estados de cuenta al banco</span>
                  </div>
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-mono text-sm">3</div>
                    <span>Presenta escrito al juzgado</span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-red-900/40 text-red-400 flex items-center justify-center border border-red-500/30 font-mono text-sm font-bold">4</div>
                    <span className="text-white font-medium">Espera meses por una resolución</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Invertimos la evidencia</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Con Constancia, el silencio de quien no paga se convierte automáticamente en evidencia lista para el juez.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "1. El banco envía un correo",
                  desc: "El pagador hace el depósito como siempre. El banco le envía un correo automático confirmando la transferencia."
                },
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  title: "2. Verificamos la firma DKIM",
                  desc: "Leemos la firma criptográfica (DKIM) que el banco ya incluyó en ese correo para probar que es auténtico. Sin integrarnos al banco."
                },
                {
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  title: "3. Registro Inmutable",
                  desc: "Se anota en un registro público permanente si el pago ocurrió antes de la fecha. Si no hay constancia, hay incumplimiento."
                }
              ].map((step, i) => (
                <div key={i} className="bg-[#111827]/80 p-8 rounded-2xl border border-slate-800 text-center hover:border-slate-700 transition-colors">
                  <div className="w-16 h-16 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700">
                    <svg className="w-8 h-8 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 relative z-10 bg-[#06090e]">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Demo Funcional</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                El producto real en funcionamiento. Así se transforma el correo automático del banco en un certificado legal inmutable.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-slate-800 bg-[#080c13] mx-auto max-w-4xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0d121b] border-b border-slate-800/60">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                </div>
                <div className="ml-4 px-3 py-1.5 bg-[#1a2332] rounded-md text-xs text-slate-400 font-mono truncate w-full max-w-md flex items-center gap-2 border border-slate-800">
                  <svg className="w-3 h-3 text-[#06b6d4]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>localhost:3000/o/bJ2zBgCfaWEL-kFjYVmgl1GXvWFbsQoT</span>
                </div>
              </div>

              {/* Demo screenshot image or interactive UI fallback */}
              {!imgError ? (
                <img
                  src="image_f6f972.png"
                  alt="Pantalla real de Constancia mostrando un pago verificado con retraso"
                  onError={() => setImgError(true)}
                  className="w-full h-auto block transform transition-transform duration-700 hover:scale-[1.01]"
                />
              ) : (
                <div className="p-8 space-y-6 bg-[#0a0a0c] font-sans text-left">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-[#06b6d4] animate-pulse" />
                      <span className="font-mono text-sm font-semibold text-white">Acuerdo #BCP-2026-8492</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#06b6d4]/10 text-[#06b6d4] font-mono text-xs border border-[#06b6d4]/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>VERIFICADO ON-CHAIN</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                    <div className="bg-[#111827] p-4 rounded border border-slate-800">
                      <div className="text-slate-500 uppercase text-[10px]">Monto Mensual</div>
                      <div className="text-xl font-bold text-white mt-1">S/ 650.00</div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded border border-slate-800">
                      <div className="text-slate-500 uppercase text-[10px]">Día de Pago</div>
                      <div className="text-xl font-bold text-white mt-1">05 de cada mes</div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded border border-slate-800">
                      <div className="text-slate-500 uppercase text-[10px]">Firma Validada</div>
                      <div className="text-xl font-bold text-[#06b6d4] mt-1">DKIM BCP RSA-2048</div>
                    </div>
                  </div>

                  <div className="bg-[#111827] p-4 rounded border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="text-slate-400 flex justify-between">
                      <span>Hash del Commitment:</span>
                      <span className="text-[#06b6d4] truncate max-w-[240px]">0x7f83a...b912</span>
                    </div>
                    <div className="text-slate-400 flex justify-between">
                      <span>Precompilado Stylus:</span>
                      <span className="text-slate-200">MODEXP + SHA256 (Gas: 0.00004 ETH)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-10 border-y border-slate-800/50 bg-[#06090e]/50">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Un sistema colapsado</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                El problema de la evidencia crece exponencialmente. En Perú, los deudores inscritos en el REDAM aumentaron más de 4200% desde 2021.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-[#111827]/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h3 className="text-lg font-medium text-slate-300 mb-6">Deudores Alimentarios (REDAM Perú)</h3>
                <div className="h-[300px] w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={redamData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="year" stroke="#64748b" tick={{ fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" tick={{ fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc" }}
                          itemStyle={{ color: "#06b6d4" }}
                        />
                        <Bar dataKey="cases" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-500 font-mono text-xs">
                      Cargando gráfico...
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-6">
                <div className="bg-[#111827]/80 p-8 rounded-2xl border border-slate-800">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Crisis Internacional</div>
                  <div className="text-4xl font-light text-white mb-2">$117 Billones</div>
                  <p className="text-slate-400 text-sm">Deuda acumulada por pensiones de alimentos solo en Estados Unidos.</p>
                </div>
                <div className="bg-[#111827]/80 p-8 rounded-2xl border border-slate-800">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Impacto Regional</div>
                  <div className="text-4xl font-light text-white mb-2">66%</div>
                  <p className="text-slate-400 text-sm">Hogares monoparentales en Argentina que no reciben la pensión a tiempo y completa (UNICEF).</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { metric: "100%", title: "Automatización", desc: "La creación de evidencia legal ocurre sin intervención manual." },
                { metric: "0", title: "Cuentas Cripto", desc: "Ni la madre ni el padre necesitan saber qué es una wallet." },
                { metric: "S/ 0", title: "Costo Judicial", desc: "Probar el pago o el impago deja de costar más que la pensión." }
              ].map((stat, i) => (
                <div key={i} className="bg-[#111827]/80 p-6 rounded-2xl border-t-2 border-[#06b6d4] shadow-sm">
                  <div className="text-4xl font-mono text-[#06b6d4] mb-2 font-bold">{stat.metric}</div>
                  <h4 className="font-bold text-white mb-2">{stat.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-24 relative z-10 bg-[#080c13]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeInSection>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 font-mono">Under the hood</h2>
            <h3 className="text-3xl font-bold text-white mb-8">Construido para escalar</h3>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 border border-slate-800 rounded-xl bg-[#0d121b]">
                <div className="font-mono text-[#06b6d4] mb-2 font-semibold">Arbitrum Stylus + Rust</div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  El contrato inteligente verifica la firma RSA de 2048-bits del banco directamente on-chain utilizando precompiles nativos (MODEXP y SHA256), logrando una validación barata que sería inviable en la EVM tradicional.
                </p>
              </div>
              <div className="p-6 border border-slate-800 rounded-xl bg-[#0d121b]">
                <div className="font-mono text-[#06b6d4] mb-2 font-semibold">Account Abstraction (Relayer)</div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Una wallet de servicio asume los costos de gas. Los usuarios finales no interactúan con tokens ni firman transacciones, superando la mayor barrera de adopción para herramientas legales en web3.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 relative z-10 bg-[#040609]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-white mb-4">Constancia</div>
          <p className="text-slate-500 text-sm font-mono">ethLima Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default PitchPresentation;
