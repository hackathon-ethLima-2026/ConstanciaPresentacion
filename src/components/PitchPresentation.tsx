"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Scale, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  AlertCircle,
  Code,
  Landmark,
  ChevronDown,
  Rocket,
  Key,
  Eye,
  ListTodo,
  Terminal,
  TrendingUp,
  Clock,
  Download,
  Ban,
  Globe
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import { ASMRStaticBackground } from "@/components/ui/asmr-background";

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const handlePrintPDF = () => {
  if (typeof window !== "undefined") {
    window.print();
  }
};

const Header = () => (
  <header className="fixed top-0 w-full bg-[#0a0a0c]/85 backdrop-blur-md border-b border-slate-800/80 z-50 transition-all duration-300 no-print">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        <Scale className="text-[#06b6d4] w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-xl text-white tracking-tight">Constancia</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrintPDF}
          className="text-xs font-mono font-bold text-slate-300 hover:text-white bg-[#111827] hover:bg-[#182236] border border-slate-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
          title="Descargar o Guardar como PDF"
        >
          <Download className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>Descargar PDF</span>
        </button>
        <div className="text-sm font-bold text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/30 px-4 py-1.5 rounded-full flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          ethLima 2026
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-24 bg-transparent text-center relative overflow-hidden">
    {/* Spatial lighting effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06b6d4]/15 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-5xl mx-auto relative z-10">
      <FadeInSection>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] font-medium text-sm mb-8 shadow-sm border border-[#06b6d4]/30 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Invertimos la carga de la prueba</span>
        </div>
      </FadeInSection>
      
      <FadeInSection delay={150}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          La constancia de pago <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-cyan-300 to-indigo-400">
            que se genera sola.
          </span>
        </h1>
      </FadeInSection>

      <FadeInSection delay={300}>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Transformamos el correo automático del banco en una <strong className="text-white">prueba legal inmutable</strong> de la pensión de alimentos. Sin integrarnos al banco, sin instalar nada.
        </p>
      </FadeInSection>
      
      <FadeInSection delay={450}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-[#06b6d4] hover:bg-[#00d8e6] text-[#0a0a0c] font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-3 w-full sm:w-auto justify-center text-lg cursor-pointer"
            aria-label="Ver la magnitud del problema"
          >
            <span>Conocer el impacto</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={handlePrintPDF}
            className="bg-[#111827] hover:bg-[#182236] text-white border border-slate-700 font-bold px-7 py-4 rounded-xl transition-all flex items-center gap-2.5 w-full sm:w-auto justify-center text-lg cursor-pointer shadow-lg"
          >
            <Download className="w-5 h-5 text-[#06b6d4]" />
            <span>Descargar en PDF</span>
          </button>
        </div>
      </FadeInSection>

      {/* Annexed Image Preview (image.png) */}
      <FadeInSection delay={550}>
        <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] border border-slate-800 bg-[#0d121c] p-2">
          <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0c] rounded-t-xl border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]"></span>
              <span className="text-white font-semibold">Demostración Real de la App · Constancia</span>
            </div>
            <span className="text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-0.5 rounded border border-[#06b6d4]/30">
              Verificado On-Chain
            </span>
          </div>
          <div className="relative overflow-hidden rounded-b-xl">
            <img
              src="/image.png"
              alt="Constancia App Real Interface Preview"
              className="w-full h-auto block transform hover:scale-[1.01] transition-transform duration-500 rounded-b-xl"
            />
          </div>
        </div>
      </FadeInSection>
    </div>

    <div className="w-full max-w-4xl opacity-90 mt-16 z-10">
      <p className="text-slate-400 text-xs mb-4 uppercase tracking-widest font-mono">
        Cada acuerdo confirmado queda respaldado así:
      </p>
      <div className="grid grid-cols-3 border border-slate-800 rounded-xl overflow-hidden bg-[#111827]/90 shadow-2xl backdrop-blur-md">
        <div className="p-4 border-r border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-mono">Banco</span>
          <span className="font-mono text-white text-lg font-bold">BCP</span>
        </div>
        <div className="p-4 border-r border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-mono">Verificación</span>
          <span className="font-mono text-white text-lg font-bold">Firma del banco</span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-mono">Registro</span>
          <span className="font-mono text-[#06b6d4] text-lg font-bold">Permanente</span>
        </div>
      </div>
    </div>
    
    <div className="mt-12 mb-6 animate-bounce text-slate-500 cursor-pointer" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
      <ChevronDown className="w-8 h-8" />
    </div>
  </section>
);

const redamData = [
  { year: '2021', deudores: 421 },
  { year: '2022', deudores: 994 },
  { year: '2023', deudores: 3115 },
  { year: '2024', deudores: 7495 },
  { year: '2025', deudores: 8000 },
  { year: '2026', deudores: 18223 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a]/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-xl border border-slate-700">
        <p className="font-bold text-slate-300 mb-1">Año {label}</p>
        <p className="text-[#06b6d4] text-xl font-bold font-mono">{payload[0].value.toLocaleString()} inscritos</p>
      </div>
    );
  }
  return null;
};

const StatsSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="stats" className="py-24 px-6 bg-[#080c14]/90 text-white border-y border-slate-800/80 relative overflow-hidden backdrop-blur-sm">
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#06b6d4] font-bold mb-4 tracking-widest uppercase text-sm font-mono">
              <TrendingUp className="w-4 h-4" />
              El Colapso del Sistema Actual
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">El REDAM está desbordado</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Las cifras oficiales del Registro de Deudores Alimentarios Morosos del Poder Judicial demuestran que el modelo de "denuncia manual" fracasó.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection delay={200}>
            <div className="bg-[#111827]/90 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative backdrop-blur-md">
              <div className="absolute top-4 right-4 bg-[#06b6d4]/15 text-[#06b6d4] text-xs font-mono font-bold px-3 py-1 rounded-full border border-[#06b6d4]/30">
                Datos actualizados 2026
              </div>
              <h3 className="font-bold text-xl mb-6 text-slate-200">Crecimiento de Deudores Inscritos (Perú)</h3>
              <div className="h-72 w-full">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={redamData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b'}} />
                      <Bar dataKey="deudores" radius={[6, 6, 0, 0]}>
                        {redamData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === redamData.length - 1 ? '#06b6d4' : '#334155'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 font-mono text-sm">
                    Cargando estadísticas...
                  </div>
                )}
              </div>
              <div className="mt-4 text-center text-sm text-slate-400 font-medium">
                Crecimiento del <span className="text-[#06b6d4] font-bold font-mono">+4200%</span> entre 2021 y 2026.
              </div>
            </div>
          </FadeInSection>

          <div className="space-y-6">
            <FadeInSection delay={300}>
              <div className="flex items-start gap-4 bg-[#111827]/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
                <div className="bg-rose-500/20 p-3 rounded-xl border border-rose-500/30">
                  <Landmark className="w-8 h-8 text-rose-400" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white mb-1 font-mono">S/ 57.1 Millones</div>
                  <div className="text-slate-300 text-sm leading-relaxed">
                    En pensiones adeudadas formalmente reconocidas a nivel nacional. La cifra real no judicializada es incalculable.
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="flex items-start gap-4 bg-[#111827]/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
                <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/30">
                  <Ban className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white mb-1 font-mono">Solo 60 excluidos</div>
                  <div className="text-slate-300 text-sm leading-relaxed">
                    De los más de 18,200 ciudadanos con deudas activas registrados históricamente a 2026, una ínfima minoría logra ser excluida por regularizar. El sistema es lento para castigar y lento para absolver.
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={500}>
              <div className="flex items-start gap-4 bg-[#111827]/90 p-6 rounded-2xl border border-[#06b6d4]/40 backdrop-blur-md">
                <div className="bg-[#06b6d4]/20 p-3 rounded-xl border border-[#06b6d4]/30">
                  <Clock className="w-8 h-8 text-[#06b6d4]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1">La carga procesal</div>
                  <div className="text-slate-300 text-sm leading-relaxed">
                    Llegar al REDAM exige acumular 3 cuotas impagas y presentar escritos con abogados. <strong className="text-white">La carga de probar que no hubo pago recae sobre quien menos recursos tiene.</strong>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Global Stats Banner */}
        <FadeInSection delay={600}>
          <div className="mt-12 bg-[#111827]/90 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-rose-400 font-bold mb-3 tracking-widest uppercase text-xs font-mono">
                  <Globe className="w-4 h-4" />
                  Un fracaso sistémico global
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  La burocracia rompe el sistema en todo el mundo
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  El problema de probar y cobrar no se limita a Perú. Los sistemas judiciales a nivel global exigen procesos manuales, costosos y lentos que terminan castigando a quien menos recursos tiene.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                <div className="bg-[#182030] p-6 rounded-2xl border border-slate-800">
                  <div className="text-2xl lg:text-3xl font-extrabold text-white mb-2 font-mono">$117 Billones</div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    Deuda histórica acumulada por pensiones impagas en Estados Unidos.
                  </div>
                </div>
                <div className="bg-[#182030] p-6 rounded-2xl border border-slate-800">
                  <div className="text-2xl lg:text-3xl font-extrabold text-white mb-2 font-mono">66%</div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    De hogares monoparentales en Argentina no recibe la pensión a tiempo (UNICEF).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const ProblemSection = () => (
  <section id="problem" className="py-24 px-6 bg-[#0a0a0c]/95 border-b border-slate-800/80 relative">
    <div className="max-w-6xl mx-auto relative z-10">
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">La burocracia de la evidencia</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hoy, demostrar judicialmente que te pagaron (o no te pagaron) cuesta más tiempo y dinero que la pensión misma.
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-3 gap-8">
        <FadeInSection delay={100}>
          <div className="bg-[#121722] hover:bg-[#181e2c] transition-all p-8 rounded-3xl border border-rose-900/40 h-full backdrop-blur-md">
            <AlertCircle className="w-10 h-10 text-rose-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">La víctima es investigadora</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              Quien sufre el impago debe guardar recibos de papel, imprimir estados de cuenta y probar frente a un juez que el dinero nunca llegó. Un proceso agotador.
            </p>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={200}>
          <div className="bg-[#121722] hover:bg-[#181e2c] transition-all p-8 rounded-3xl border border-amber-900/40 h-full backdrop-blur-md">
            <Smartphone className="w-10 h-10 text-amber-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Fricción Tecnológica</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              Las "soluciones" actuales exigen que ambas partes (a menudo en conflicto) instalen nuevas apps, creen billeteras o cambien sus hábitos bancarios de toda la vida.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="bg-[#121722] hover:bg-[#181e2c] transition-all p-8 rounded-3xl border border-slate-800 h-full backdrop-blur-md">
            <ShieldCheck className="w-10 h-10 text-[#06b6d4] mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Evidencia Repudiable</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              Una captura de pantalla de WhatsApp de un voucher se puede photoshopear en 2 minutos. Los juzgados pierden meses validando oficios con los bancos tradicionales.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section className="py-24 px-6 bg-[#070a10]/95 text-white border-b border-slate-800/80 relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <FadeInSection>
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Cómo funciona Constancia</h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl leading-relaxed">
            Cero fricción. La mejor acción es la que no existe: <strong className="text-[#06b6d4]">pagar como siempre ya produce la evidencia de forma automática.</strong>
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-4 gap-8 relative mt-12">
        {/* Connected line in desktop */}
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-1 bg-[#1e293b] z-0 rounded-full"></div>

        {[
          {
            icon: FileText,
            phase: "Fase 0 (Única vez)",
            title: "El Acuerdo",
            desc: "Ambas partes registran los términos vía enlace mágico web. No se requiere crear cuenta ni descargar apps.",
            color: "bg-[#111827]"
          },
          {
            icon: Smartphone,
            phase: "Mensualmente",
            title: "El Pago Habitual",
            desc: "El pagador transfiere desde su app del BCP como siempre lo hace. No cambia su rutina, no aprende nada nuevo.",
            color: "bg-[#111827]"
          },
          {
            icon: Mail,
            phase: "Automático",
            title: "El Banco Avisa",
            desc: "El banco envía su clásico correo de constancia al realizar la transferencia. Ese correo contiene una firma de seguridad oculta.",
            color: "bg-[#111827]"
          },
          {
            icon: CheckCircle2,
            phase: "Evidencia",
            title: "Certificación Legal",
            desc: "Constancia lee la firma del banco y genera una prueba matemática irrefutable. Listo para el juzgado.",
            color: "bg-[#111827] ring-4 ring-[#06b6d4]/40"
          }
        ].map((step, i) => (
          <FadeInSection delay={i * 150} key={i}>
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center border-4 border-slate-800 mb-6 shadow-2xl transition-transform hover:-translate-y-2 duration-300`}>
                <step.icon className={`w-10 h-10 ${i === 3 ? 'text-[#06b6d4]' : 'text-slate-300'}`} />
              </div>
              <div className="text-[#06b6d4] font-bold mb-2 uppercase tracking-wide text-xs font-mono">{step.phase}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const ValuePropSection = () => (
  <section className="py-24 px-6 bg-[#0a0a0c]/95 border-b border-slate-800/80 relative">
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] font-bold text-sm mb-6 border border-[#06b6d4]/30 font-mono">
              <Scale className="w-4 h-4" />
              <span>Innovación Técnica & Legal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              El banco ya es nuestro notario (y no lo sabe)
            </h2>
          </FadeInSection>
          
          <FadeInSection delay={150}>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Ningún otro sistema puede decir esto: <strong className="text-white">reutilizamos la firma de seguridad criptográfica (DKIM) que los bancos ya insertan obligatoriamente en sus correos</strong> para protegerse del phishing.
              </p>
              <p>
                Al verificar esta firma pública, Constancia certifica que el pago existió, por el monto exacto, sin pedir credenciales, sin integrarse a la API del banco y sin custodiar un solo centavo.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="bg-[#111827] p-6 border-l-4 border-[#06b6d4] rounded-r-2xl border border-slate-800 shadow-xl mt-8">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-xl">
                <Clock className="w-5 h-5 text-[#06b6d4]" /> El silencio es evidencia
              </h4>
              <p className="text-base text-slate-300 leading-relaxed">
                Si la prueba matemática no existe llegada la fecha límite, el estado cambia automáticamente a "Vencido". <strong className="text-white">Quien cumple deja un rastro sin proponérselo; quien no cumple genera el silencio que sirve como prueba para el juzgado.</strong>
              </p>
            </div>
          </FadeInSection>
        </div>

        <div className="flex-1 w-full relative">
          <FadeInSection delay={200}>
            <div className="bg-[#111827] p-8 rounded-3xl shadow-2xl border border-slate-800 relative transform rotate-1 hover:rotate-0 transition-transform duration-500 text-white">
              <div className="absolute -top-4 -right-4 bg-[#06b6d4] text-[#0a0a0c] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4" /> Certificado Válido
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <div className="w-12 h-12 bg-[#06b6d4]/15 rounded-full flex items-center justify-center border border-[#06b6d4]/30">
                    <Scale className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 font-medium">Constancia Legal Generada</div>
                    <div className="text-white font-bold font-mono">Acuerdo #4092-A</div>
                  </div>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center bg-[#182030] p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-xs">Validación DKIM (BCP)</span>
                    <span className="text-[#06b6d4] font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Exitosa</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#182030] p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-xs">Verificación de Monto</span>
                    <span className="text-[#06b6d4] font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> S/ 850.00 Exacto</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#182030] p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-xs">Fecha Límite (Día 5)</span>
                    <span className="text-[#06b6d4] font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Cumplida</span>
                  </div>
                </div>

                <div className="bg-[#06b6d4]/10 text-[#06b6d4] text-xs p-4 rounded-xl border border-[#06b6d4]/30 font-medium text-center font-mono">
                  Prueba criptográfica asegurada en Arbitrum Stylus. Lista para descargar en PDF.
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Impact Numbers */}
      <FadeInSection delay={400}>
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { metric: "100%", title: "Automatización", desc: "La creación de evidencia legal ocurre sin intervención manual." },
            { metric: "0", title: "Cuentas Cripto", desc: "Ni la madre ni el padre necesitan saber qué es una wallet." },
            { metric: "S/ 0", title: "Costo Judicial", desc: "Probar el pago o el impago deja de costar más que la pensión." }
          ].map((stat, i) => (
            <div key={i} className="bg-[#111827] p-6 rounded-2xl border-t-4 border-[#06b6d4] border border-slate-800 shadow-xl">
              <div className="text-4xl font-extrabold text-[#06b6d4] mb-2 font-mono">{stat.metric}</div>
              <h4 className="font-bold text-white mb-2">{stat.title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

const DemoSection = () => (
  <section className="py-24 px-6 bg-[#080c14] text-white relative overflow-hidden border-b border-slate-800/80">
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-center lg:text-left">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] font-bold text-sm mb-6 border border-[#06b6d4]/30 font-mono">
              <Smartphone className="w-4 h-4" />
              <span>Demo en Vivo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Diseñado para la vida real.
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              El producto está pensado <strong className="text-white">Mobile-first</strong>, asumiendo un plan de datos limitado y cero conocimientos técnicos. Sin crear cuentas, sin descargar apps adicionales. El enlace mágico basta.
            </p>
            
            <ul className="space-y-4 text-left inline-block lg:w-full">
              {[
                "1. Registro del Acuerdo (única vez).",
                "2. Confirmación mágica vía web.",
                "3. Generación automática del certificado."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-[#111827] border border-slate-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#06b6d4]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </FadeInSection>
        </div>

        {/* Right Side: Device Mockup */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <FadeInSection delay={200}>
            {/* Phone Mockup Wrapper */}
            <div className="relative mx-auto border-slate-800 bg-[#0d121c] border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              
              {/* Notch */}
              <div className="w-[148px] h-[18px] bg-slate-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
              
              {/* Screen Area */}
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-[#0a0a0c] absolute top-0 left-0 flex flex-col justify-between p-4 font-sans text-xs">
                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#06b6d4]" />
                      <span className="font-bold text-white">Constancia</span>
                    </div>
                    <span className="text-[10px] bg-[#06b6d4]/20 text-[#06b6d4] px-2 py-0.5 rounded border border-[#06b6d4]/30 font-mono">
                      Activo
                    </span>
                  </div>

                  <div className="bg-[#111827] p-3 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Pensión Alimenticia</div>
                    <div className="text-lg font-bold text-white">S/ 650.00 / mes</div>
                    <div className="text-slate-400 text-[11px]">Vencimiento: Día 05</div>
                  </div>

                  <div className="bg-[#111827] p-3 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                    <div className="text-[#06b6d4] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pago Verificado BCP</span>
                    </div>
                    <div className="text-slate-300">Firma DKIM RSA-2048</div>
                    <div className="text-slate-500 text-[9px] truncate">Tx: 0x8f9a2b...c3e1</div>
                  </div>
                </div>

                <div className="pb-4 text-center">
                  <div className="w-full py-2 bg-[#06b6d4] text-[#0a0a0c] rounded-lg text-xs font-bold font-mono">
                    Ver Certificado On-Chain
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

      </div>
    </div>
  </section>
);

const TechStackSection = () => (
  <section className="py-24 px-6 bg-[#0a0a0c] text-white">
    <div className="max-w-6xl mx-auto">
      <FadeInSection>
        <div className="mb-12 border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3 text-white mb-2 tracking-tight">
              <Code className="text-[#06b6d4] w-8 h-8" /> Debajo del capó
            </h2>
            <p className="text-slate-300 text-lg">Arquitectura construida para ethLima 2026. Web2 UX, Web3 Security.</p>
          </div>
          <div className="bg-[#111827] px-4 py-2 rounded-lg text-sm font-mono text-[#06b6d4] border border-slate-800">
            git branch: main / status: passing
          </div>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { tag: "Backend & Datos", title: "Next.js + Postgres", desc: "App Router, TS, Drizzle ORM en Neon. Maneja UI y protege la privacidad de datos (salts)." },
          { tag: "Smart Contract", title: "Arbitrum Stylus", desc: "Contrato en Rust. Verifica firmas on-chain eficientemente mediante precompiles MODEXP." },
          { tag: "Criptografía", title: "DKIM Verification", desc: "Extracción de campos .eml y verificación estricta de la firma pública del banco emisor." },
          { tag: "UX sin fricción", title: "Gasless (Relayer)", desc: "El usuario final no paga gas ni firma transacciones. Una wallet de servicio subsidia el sistema." }
        ].map((tech, i) => (
          <FadeInSection delay={i * 100} key={i}>
            <div className="bg-[#111827]/90 p-6 rounded-2xl border border-slate-800 hover:border-[#06b6d4]/50 transition-colors h-full group">
              <div className="text-[#06b6d4] font-mono text-xs font-bold mb-3 tracking-wider uppercase">{tech.tag}</div>
              <h3 className="font-bold text-xl mb-3 text-white group-hover:text-[#06b6d4] transition-colors">{tech.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{tech.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export function ConstanciaPitch() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] font-sans text-slate-100 selection:bg-[#06b6d4]/30 selection:text-[#06b6d4] scroll-smooth relative">
      {/* Background Canvas Particles Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <ASMRStaticBackground />
      </div>

      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <SolutionSection />
        <ValuePropSection />
        <DemoSection />
        <TechStackSection />
      </main>

      <footer className="bg-[#05070a] text-slate-400 py-12 text-sm border-t border-slate-800/80 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#06b6d4]/15 p-2 rounded-lg border border-[#06b6d4]/30">
              <Scale className="w-6 h-6 text-[#06b6d4]" />
            </div>
            <div>
              <div className="font-bold text-white text-lg tracking-tight">Constancia</div>
              <div className="text-slate-400 font-mono text-xs">Hackathon ethLima 2026</div>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="font-medium text-slate-200 mb-1">Evidencia automática para pensión de alimentos.</div>
            <div className="text-slate-400 text-xs">Cero fricción. Cero cripto jerga. 100% Impacto.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { ConstanciaPitch as PitchPresentation };
export default ConstanciaPitch;
