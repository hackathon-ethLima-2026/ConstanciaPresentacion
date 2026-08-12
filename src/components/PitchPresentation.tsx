"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileText,
  Sparkles,
  Cpu,
  Lock,
  Mail,
  ArrowRight,
  ExternalLink,
  Scale,
  HeartHandshake,
  FileUp,
  RotateCcw,
  Zap,
  Check,
  AlertCircle
} from "lucide-react";
import { WordRotate } from "@/components/ui/word-rotate";

const SLIDES = [
  { id: "portada", title: "Portada" },
  { id: "problema", title: "El Problema" },
  { id: "cifras", title: "Las Cifras Invisibles" },
  { id: "pitch", title: "El Pitch & Solución" },
  { id: "pasos", title: "Cómo Funciona" },
  { id: "tecnologia", title: "Arbitrum Stylus & DKIM" },
  { id: "demo", title: "Simulación en Vivo" },
  { id: "principios", title: "Principios & Cierre" },
];

export function PitchPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [simulatedState, setSimulatedState] = useState<"pendiente" | "validando" | "verificado">("pendiente");
  const [activeTab, setActiveTab] = useState<"bcp" | "eml" | "stylus">("bcp");

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      setCurrentSlide(index);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space" || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(SLIDES.length - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleSimulateUpload = () => {
    setSimulatedState("validando");
    setTimeout(() => {
      setSimulatedState("verificado");
    }, 1800);
  };

  const handleResetSimulation = () => {
    setSimulatedState("pendiente");
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full select-none overflow-hidden bg-paper text-ink">
      {/* Top Controls & Navigation Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-grid-line bg-paper/85 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-semibold tracking-tight text-ink transition-colors hover:text-signal"
          >
            CONSTANCIA
          </Link>
          <span className="text-grid-line">|</span>
          <span className="rounded bg-panel px-2 py-0.5 text-[11px] font-mono text-signal tracking-wide border border-grid-line">
            PITCH ETHLIMA 2026
          </span>
        </div>

        {/* Slide Indicator & Quick Select */}
        <div className="hidden md:flex items-center gap-1.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`h-7 px-2.5 text-xs font-mono transition-all rounded ${
                currentSlide === idx
                  ? "bg-signal/20 text-signal border border-signal/40 font-bold"
                  : "text-ink-muted hover:text-ink hover:bg-panel"
              }`}
              title={`Diapositiva ${idx + 1}: ${slide.title}`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded border border-grid-line bg-panel text-ink-muted hover:text-ink transition-colors"
            title="Pantalla completa (F)"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <Link
            href="/"
            className="btn-instrumento hidden sm:inline-flex h-8 items-center justify-center rounded border border-signal/40 bg-signal/10 px-3 text-xs font-medium text-signal hover:bg-signal/20"
          >
            Probar App
          </Link>
        </div>
      </header>

      {/* Slide Progress Bar */}
      <div className="h-1 w-full bg-panel">
        <div
          className="h-full bg-signal transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Slide Canvas Body */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl w-full mx-auto">
          {/* SLIDE 0: PORTADA */}
          {currentSlide === 0 && (
            <div className="lectura space-y-8 text-center py-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-mono text-signal">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ethLima 2026 · Track Arbitrum Stylus</span>
              </div>

              <div className="space-y-4">
                <WordRotate
                  words={[
                    "Constancia",
                    "Prueba de Pago",
                    "Cero Fricción",
                    "Evidencia On-Chain",
                    "Justicia Familiar"
                  ]}
                  className="text-4xl sm:text-6xl font-bold tracking-tight text-ink"
                />

                <p className="text-xl sm:text-2xl font-light text-signal max-w-2xl mx-auto leading-relaxed">
                  Prueba criptográfica del pago de una pensión de alimentos.
                </p>

                <p className="text-base text-ink-muted max-w-xl mx-auto leading-relaxed pt-2">
                  Convertimos el correo electrónico que el banco ya envía automáticamente en una prueba indiscutible e inmutable, sin integrar al banco y sin pedirle una wallet a los padres.
                </p>
              </div>

              {/* Status Display Simulation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-4 text-left font-mono">
                <div className="bg-panel border border-signal/40 p-3 rounded">
                  <div className="flex items-center justify-between text-xs text-signal">
                    <span>ESTADO ON-CHAIN</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">Verificado</div>
                </div>

                <div className="bg-panel border border-amber/40 p-3 rounded">
                  <div className="flex items-center justify-between text-xs text-amber">
                    <span>EN ESPERA</span>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">Pendiente</div>
                </div>

                <div className="bg-panel border border-danger/40 p-3 rounded">
                  <div className="flex items-center justify-between text-xs text-danger">
                    <span>INCUMPLIMIENTO</span>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">Vencido</div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={nextSlide}
                  className="btn-instrumento min-h-[48px] inline-flex items-center justify-center rounded border border-ink bg-ink px-8 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink transition-all"
                >
                  <span>Ver la Presentación</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 1: EL PROBLEMA */}
          {currentSlide === 1 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-danger uppercase tracking-wider">
                <AlertCircle className="h-4 w-4" />
                <span>01 / El Problema Real</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
                "El 5 de cada mes debía llegar la pensión. Es 19 y no llegó."
              </h2>

              <p className="text-base text-ink-muted leading-relaxed">
                No llegó en julio tampoco, y en junio llegó la mitad. La madre ya pidió un adelanto y reorganizó los gastos de su hogar.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-panel border border-grid-line p-5 rounded space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber">
                    <Clock className="h-4 w-4" />
                    <span>La Carga Invisible</span>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    La pensión que no llega <strong className="text-ink font-medium">no desaparece</strong>: la termina pagando la madre con horas extra, segundo trabajo y privaciones. El tiempo de crianza perdido nunca se recupera.
                  </p>
                </div>

                <div className="bg-panel border border-grid-line p-5 rounded space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-danger">
                    <Scale className="h-4 w-4" />
                    <span>Probar un Hecho Negativo</span>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    A la madre le toca probar que <strong className="text-ink font-medium">algo no ocurrió</strong>. Un proceso con abogados y juzgados cuesta más dinero y tiempo que la pensión que se reclama.
                  </p>
                </div>
              </div>

              <div className="bg-panel border-l-4 border-l-signal border border-grid-line p-4 rounded text-sm text-ink-muted italic leading-relaxed">
                "El costo real de una pensión impaga no es solo monetario: se mide en las horas que esa madre deja de estar con su hijo para cubrir lo que otro no cubrió."
              </div>
            </div>
          )}

          {/* SLIDE 2: LAS CIFRAS INVISIBLES */}
          {currentSlide === 2 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
                <FileText className="h-4 w-4" />
                <span>02 / La Realidad de las Cifras</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                El sesgo del registro oficial
              </h2>

              <div className="bg-panel border border-grid-line p-6 rounded grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="text-center sm:text-left space-y-1">
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-signal">8,000</div>
                  <div className="text-xs font-mono text-ink-muted">Inscritos en el REDAM (Perú)</div>
                </div>

                <div className="sm:col-span-2 text-sm text-ink-muted leading-relaxed border-t sm:border-t-0 sm:border-l border-grid-line pt-4 sm:pt-0 sm:pl-6">
                  <p>
                    Esa cifra <strong className="text-ink font-medium">no significa</strong> que solo 8,000 personas incumplan en el país. Significa que para entrar al registro hace falta un juicio completo de 3 años.
                  </p>
                  <p className="mt-2 text-xs text-amber font-mono">
                    La enorme mayoría nunca denuncia porque el camino cuesta más de lo que se debe.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono">
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="text-xs text-ink-muted">01</div>
                  <div className="text-sm font-semibold text-ink">Lo que no se prueba, no se registra</div>
                </div>
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="text-xs text-ink-muted">02</div>
                  <div className="text-sm font-semibold text-ink">Lo que no se registra, no existe</div>
                </div>
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="text-xs text-ink-muted">03</div>
                  <div className="text-sm font-semibold text-ink">Lo que no existe, no se corrige</div>
                </div>
              </div>

              <div className="text-center text-sm font-medium text-ink">
                Constancia hace que la prueba exista <strong className="text-signal">desde el primer día</strong>.
              </div>
            </div>
          )}

          {/* SLIDE 3: EL PITCH & SOLUCION */}
          {currentSlide === 3 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>03 / El Pitch de Solución</span>
              </div>

              <div className="bg-panel border border-signal/40 p-6 rounded text-center space-y-4">
                <blockquote className="text-xl sm:text-2xl font-semibold text-ink leading-snug">
                  "Ninguna madre debería tener que contratar un abogado para probar que este mes no le pagaron la comida de su hijo."
                </blockquote>
                <p className="text-sm text-signal font-mono">
                  Convertimos el correo que el banco ya te manda en una prueba que nadie puede discutir.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-panel border border-grid-line p-5 rounded space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <HeartHandshake className="h-4 w-4 text-signal" />
                    <span>Sin Custodia</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    El sistema nunca toca ni custodia dinero. El dinero viaja por BCP/Yape exactamente como hoy. Se certifica el hecho.
                  </p>
                </div>

                <div className="bg-panel border border-grid-line p-5 rounded space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <RotateCcw className="h-4 w-4 text-signal" />
                    <span>Inversión de Carga</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Quien paga deja rastro automático. Quien no paga genera silencio, y ese silencio es la evidencia computable.
                  </p>
                </div>

                <div className="bg-panel border border-grid-line p-5 rounded space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Lock className="h-4 w-4 text-signal" />
                    <span>Cero Jerga Web3</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Sin wallets, sin gas, sin hashes visibles para los padres. Login por enlace mágico de correo sin contraseñas.
                  </p>
                </div>
              </div>

              <div className="bg-panel border border-grid-line p-4 rounded flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>REAPROVECHAMIENTO DKIM</span>
                <span className="text-signal">Reutilizamos la firma criptográfica que el banco emite para protegerse</span>
              </div>
            </div>
          )}

          {/* SLIDE 4: COMO FUNCIONA EN 3 PASOS */}
          {currentSlide === 4 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
                <Zap className="h-4 w-4" />
                <span>04 / Cómo Funciona en 3 Pasos</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Simplicidad total para los padres
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-panel border border-grid-line p-5 rounded relative flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-signal">01</span>
                      <span className="text-xs font-mono text-ink-muted">UNA SOLA VEZ</span>
                    </div>
                    <h3 className="text-base font-semibold text-ink">Se acuerda</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Ambas partes definen monto, día de pago y correo electrónico. Se genera un enlace mágico de acceso.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-grid-line text-[11px] font-mono text-ink-muted">
                    Sin crear cuenta ni contraseña
                  </div>
                </div>

                <div className="bg-panel border border-grid-line p-5 rounded relative flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-signal">02</span>
                      <span className="text-xs font-mono text-ink-muted">CERO FRICCIÓN</span>
                    </div>
                    <h3 className="text-base font-semibold text-ink">Se paga como siempre</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Vía BCP, Yape o transferencia habitual. El banco emite su correo automático de confirmación firmado.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-grid-line text-[11px] font-mono text-ink-muted">
                    El banco no sabe que existimos
                  </div>
                </div>

                <div className="bg-panel border border-signal/50 p-5 rounded relative flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-signal">03</span>
                      <span className="text-xs font-mono text-signal">AUTOMÁTICO</span>
                    </div>
                    <h3 className="text-base font-semibold text-ink">Se prueba solo</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Se sube el comprobante (.eml). El contrato valida la firma DKIM y asienta la pensión. Si vence sin pago, el incumplimiento queda registrado.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-grid-line text-[11px] font-mono text-signal">
                    On-Chain inmutable
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: ARBITRUM STYLUS & TECNOLOGIA */}
          {currentSlide === 5 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
                <Cpu className="h-4 w-4" />
                <span>05 / Innovación en Arbitrum Stylus</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Verificación DKIM en Smart Contracts (Rust)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-panel border border-grid-line p-5 rounded space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-signal">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Contrato inteligente Stylus (Rust)</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Escrito en Rust compilado a WebAssembly. Aprovecha los precompilados <code className="text-signal bg-paper px-1 rounded">MODEXP</code> y <code className="text-signal bg-paper px-1 rounded">SHA256</code> para verificar firmas RSA/SHA-256 de correos bancarios directamente on-chain con costo de gas ultra-bajo.
                  </p>
                  <div className="text-[11px] font-mono text-ink-muted">
                    ✓ 18/18 tests pasando, verificados con correos BCP reales.
                  </div>
                </div>

                <div className="bg-panel border border-grid-line p-5 rounded space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-signal">
                    <Lock className="h-4 w-4" />
                    <span>Privacidad: Salt + Commitment</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Para proteger los datos de la receptora (número de cuenta y nombre), el contrato almacena únicamente un commitment hash encriptado con un salt aleatorio, evitando ataques de fuerza bruta en 10,000 combinaciones.
                  </p>
                  <div className="text-[11px] font-mono text-ink-muted">
                    ✓ Cero fuga de datos personales en la blockchain.
                  </div>
                </div>
              </div>

              <div className="bg-panel border border-grid-line p-4 rounded grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
                <div>
                  <span className="text-ink-muted">Red:</span>{" "}
                  <span className="text-ink font-semibold">Arbitrum Sepolia</span>
                </div>
                <div>
                  <span className="text-ink-muted">Relayer:</span>{" "}
                  <span className="text-ink font-semibold">Wallet de Servicio (0 Gas User)</span>
                </div>
                <div>
                  <span className="text-ink-muted">Stack:</span>{" "}
                  <span className="text-ink font-semibold">Next.js 15 + Drizzle + Rust</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 6: SIMULACION EN VIVO */}
          {currentSlide === 6 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
                <FileUp className="h-4 w-4" />
                <span>06 / Demostración en Vivo</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Simulador del Instrumento de Calibración
              </h2>

              <div className="bg-panel border border-grid-line p-6 rounded space-y-6">
                {/* Tabs selection */}
                <div className="flex border-b border-grid-line gap-4 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("bcp")}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === "bcp" ? "border-signal text-signal font-semibold" : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    1. Correo BCP
                  </button>
                  <button
                    onClick={() => setActiveTab("eml")}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === "eml" ? "border-signal text-signal font-semibold" : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    2. Cabecera DKIM
                  </button>
                  <button
                    onClick={() => setActiveTab("stylus")}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === "stylus" ? "border-signal text-signal font-semibold" : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    3. Contrato Stylus
                  </button>
                </div>

                {activeTab === "bcp" && (
                  <div className="space-y-3 text-xs font-mono text-ink-muted bg-paper p-4 rounded border border-grid-line">
                    <div className="text-ink font-semibold">De: Banco de Crédito del Perú &lt;bcpnotificaciones@bcp.com.pe&gt;</div>
                    <div>Asunto: Confirmación de transferencia realizada</div>
                    <div className="text-signal">Monto: S/ 650.00 · Fecha: 05 de Agosto de 2026</div>
                    <div>Cuenta Destino: **** 4921</div>
                  </div>
                )}

                {activeTab === "eml" && (
                  <div className="space-y-2 text-[11px] font-mono text-ink-muted bg-paper p-4 rounded border border-grid-line overflow-x-auto">
                    <div>DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=bcp.com.pe;</div>
                    <div>s=s2024; h=from:to:subject:date:message-id;</div>
                    <div className="text-signal break-all">bh=k8Z92xQ1L...; b=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgK...</div>
                  </div>
                )}

                {activeTab === "stylus" && (
                  <div className="space-y-2 text-[11px] font-mono text-ink-muted bg-paper p-4 rounded border border-grid-line">
                    <div className="text-signal">pub fn verificar_comprobante(host: &Host, dkim_bytes: Vec&lt;u8&gt;) -&gt; Result&lt;bool, Error&gt;</div>
                    <div>1. Extraer RSA exponente & modulus desde precompilado MODEXP</div>
                    <div>2. Calcular hash SHA-256 de cabeceras canónicas</div>
                    <div>3. Validar commitment de pensión de alimentos del mes actual</div>
                  </div>
                )}

                {/* Simulation Control */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-grid-line">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-ink-muted">Estado Actual:</span>
                    {simulatedState === "pendiente" && (
                      <span className="inline-flex items-center gap-1.5 rounded bg-amber-bg px-2.5 py-1 text-xs font-mono text-amber border border-amber/40">
                        <Clock className="h-3.5 w-3.5" />
                        <span>PENDIENTE (Esperando .eml)</span>
                      </span>
                    )}
                    {simulatedState === "validando" && (
                      <span className="inline-flex items-center gap-1.5 rounded bg-panel px-2.5 py-1 text-xs font-mono text-signal border border-signal/40 animate-pulse">
                        <Sparkles className="h-3.5 w-3.5 animate-spin" />
                        <span>VERIFICANDO EN ARBITRUM STYLUS...</span>
                      </span>
                    )}
                    {simulatedState === "verificado" && (
                      <span className="inline-flex items-center gap-1.5 rounded bg-signal/15 px-2.5 py-1 text-xs font-mono text-signal border border-signal/40 font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>VERIFICADO ON-CHAIN</span>
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {simulatedState === "pendiente" && (
                      <button
                        onClick={handleSimulateUpload}
                        className="btn-instrumento inline-flex items-center justify-center rounded border border-signal bg-signal px-4 py-2 text-xs font-medium text-paper hover:bg-transparent hover:text-signal"
                      >
                        <FileUp className="mr-1.5 h-3.5 w-3.5" />
                        Simular Carga de Comprobante .eml
                      </button>
                    )}
                    {simulatedState === "verificado" && (
                      <button
                        onClick={handleResetSimulation}
                        className="btn-instrumento inline-flex items-center justify-center rounded border border-grid-line bg-paper px-3 py-2 text-xs font-medium text-ink-muted hover:text-ink"
                      >
                        <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                        Reiniciar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: PRINCIPIOS & CIERRE */}
          {currentSlide === 7 && (
            <div className="lectura space-y-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
                <HeartHandshake className="h-4 w-4" />
                <span>07 / Principios & Cierre</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Principios Innegociables de Constancia
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="font-semibold text-signal font-mono">1. El sistema no toca el dinero</div>
                  <div className="text-ink-muted">Certifica un hecho indiscutible, nunca mueve ni custodia fondos.</div>
                </div>
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="font-semibold text-signal font-mono">2. La mejor acción es la que no existe</div>
                  <div className="text-ink-muted">Nadie debe acordarse de generar la prueba o denunciar. Pagar o no pagar produce la evidencia.</div>
                </div>
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="font-semibold text-signal font-mono">3. Cero jerga cripto, siempre</div>
                  <div className="text-ink-muted">Diseñado para personas reales que nunca usaron una wallet ni tienen por qué aprender qué es.</div>
                </div>
                <div className="bg-panel border border-grid-line p-4 rounded space-y-1">
                  <div className="font-semibold text-signal font-mono">4. El fallo técnico nunca culpa</div>
                  <div className="text-ink-muted">Cualquier error de red o firma jamás se interpreta ni muestra como incumplimiento.</div>
                </div>
              </div>

              <div className="bg-panel border border-signal/40 p-6 rounded text-center space-y-4">
                <h3 className="text-2xl font-bold tracking-tight text-ink">
                  Constancia · ethLima 2026
                </h3>
                <p className="text-sm text-ink-muted max-w-lg mx-auto">
                  La prueba criptográfica que protege a los hijos y devuelve la tranquilidad a las madres desde el primer día.
                </p>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/nueva"
                    className="btn-instrumento inline-flex items-center justify-center rounded border border-signal bg-signal px-6 py-2.5 text-sm font-medium text-paper hover:bg-transparent hover:text-signal"
                  >
                    <span>Registrar Acuerdo en Demo</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href="/"
                    className="btn-instrumento inline-flex items-center justify-center rounded border border-grid-line bg-paper px-6 py-2.5 text-sm font-medium text-ink hover:border-ink"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Footer Controls */}
      <footer className="sticky bottom-0 z-30 flex items-center justify-between border-t border-grid-line bg-paper/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex h-9 items-center gap-1 rounded border border-grid-line bg-panel px-3 text-xs font-mono text-ink transition-colors hover:bg-paper disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className="flex h-9 items-center gap-1 rounded border border-signal/40 bg-signal/15 px-3 text-xs font-mono text-signal font-semibold transition-colors hover:bg-signal/25 disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="text-xs font-mono text-ink-muted">
          Diapositiva <span className="text-signal font-bold">{currentSlide + 1}</span> de{" "}
          <span>{SLIDES.length}</span> — <span className="hidden sm:inline">{SLIDES[currentSlide].title}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-ink-muted">
          <span>Usa ⬅️ ➡️ o Espacio para navegar</span>
        </div>
      </footer>
    </div>
  );
}
