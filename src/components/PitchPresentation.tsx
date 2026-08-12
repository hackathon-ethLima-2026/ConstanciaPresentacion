"use client";

import React, { useState, useEffect, useRef } from "react";
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

const Header = () => (
  <header className="fixed top-0 w-full bg-slate-50/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        <Scale className="text-indigo-600 w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-xl text-slate-900 tracking-tight">Constancia</span>
      </div>
      <div className="text-sm font-bold text-indigo-700 bg-indigo-100/50 border border-indigo-200 px-4 py-1.5 rounded-full flex items-center gap-2">
        <Rocket className="w-4 h-4" />
        ethLima 2026
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-slate-100 text-center relative overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>

    <div className="max-w-5xl mx-auto relative z-10">
      <FadeInSection>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-8 shadow-sm border border-indigo-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Invertimos la carga de la prueba</span>
        </div>
      </FadeInSection>
      
      <FadeInSection delay={150}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          La constancia de pago <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            que se genera sola.
          </span>
        </h1>
      </FadeInSection>

      <FadeInSection delay={300}>
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Transformamos el correo automático del banco en una <strong>prueba legal inmutable</strong> de la pensión de alimentos. Sin integrarnos al banco, sin instalar nada.
        </p>
      </FadeInSection>
      
      <FadeInSection delay={450}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-600/30 flex items-center gap-3 w-full sm:w-auto justify-center text-lg cursor-pointer"
            aria-label="Ver la magnitud del problema"
          >
            Conocer el impacto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </FadeInSection>
    </div>
    
    <div className="absolute bottom-10 animate-bounce text-slate-400 cursor-pointer" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
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
      <div className="bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-xl border border-slate-700">
        <p className="font-bold text-slate-300 mb-1">Año {label}</p>
        <p className="text-indigo-400 text-xl font-bold">{payload[0].value.toLocaleString()} inscritos</p>
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
    <section id="stats" className="py-24 px-6 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-indigo-400 font-bold mb-4 tracking-widest uppercase text-sm">
              <TrendingUp className="w-4 h-4" />
              El Colapso del Sistema Actual
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">El REDAM está desbordado</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Las cifras oficiales del Registro de Deudores Alimentarios Morosos del Poder Judicial demuestran que el modelo de "denuncia manual" fracasó.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection delay={200}>
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
              <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
                Datos actualizados 2026
              </div>
              <h3 className="font-bold text-xl mb-6 text-slate-200">Crecimiento de Deudores Inscritos (Perú)</h3>
              <div className="h-72 w-full">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={redamData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#334155'}} />
                      <Bar dataKey="deudores" radius={[6, 6, 0, 0]}>
                        {redamData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === redamData.length - 1 ? '#6366f1' : '#475569'} />
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
                Crecimiento del <span className="text-indigo-400 font-bold">+4200%</span> entre 2021 y 2026.
              </div>
            </div>
          </FadeInSection>

          <div className="space-y-6">
            <FadeInSection delay={300}>
              <div className="flex items-start gap-4 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="bg-rose-500/20 p-3 rounded-xl">
                  <Landmark className="w-8 h-8 text-rose-400" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white mb-1">S/ 57.1 Millones</div>
                  <div className="text-slate-400 text-sm leading-relaxed">
                    En pensiones adeudadas formalmente reconocidas a nivel nacional. La cifra real no judicializada es incalculable.
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="flex items-start gap-4 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="bg-amber-500/20 p-3 rounded-xl">
                  <Ban className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white mb-1">Solo 60 excluidos</div>
                  <div className="text-slate-400 text-sm leading-relaxed">
                    De los más de 18,200 ciudadanos con deudas activas registrados históricamente a 2026, una ínfima minoría logra ser excluida por regularizar. El sistema es lento para castigar y lento para absolver.
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={500}>
              <div className="flex items-start gap-4 bg-indigo-900/40 p-6 rounded-2xl border border-indigo-700/50">
                <div className="bg-indigo-500/20 p-3 rounded-xl">
                  <Clock className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1">La carga procesal</div>
                  <div className="text-indigo-200/80 text-sm leading-relaxed">
                    Llegar al REDAM exige acumular 3 cuotas impagas y presentar escritos con abogados. <strong>La carga de probar que no hubo pago recae sobre quien menos recursos tiene.</strong>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Global Stats Banner */}
        <FadeInSection delay={600}>
          <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-rose-400 font-bold mb-3 tracking-widest uppercase text-xs">
                  <Globe className="w-4 h-4" />
                  Un fracaso sistémico global
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  La burocracia rompe el sistema en todo el mundo
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  El problema de probar y cobrar no se limita a Perú. Los sistemas judiciales a nivel global exigen procesos manuales, costosos y lentos que terminan castigando a quien menos recursos tiene.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 shadow-inner">
                  <div className="text-2xl lg:text-3xl font-extrabold text-white mb-2">$117 Billones</div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    Deuda histórica acumulada por pensiones impagas en Estados Unidos.
                  </div>
                </div>
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 shadow-inner">
                  <div className="text-2xl lg:text-3xl font-extrabold text-white mb-2">66%</div>
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
  <section id="problem" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">La burocracia de la evidencia</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hoy, demostrar judicialmente que te pagaron (o no te pagaron) cuesta más tiempo y dinero que la pensión misma.
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-3 gap-8">
        <FadeInSection delay={100}>
          <div className="bg-rose-50 hover:bg-rose-100/80 transition-colors p-8 rounded-3xl border border-rose-100 h-full">
            <AlertCircle className="w-10 h-10 text-rose-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">La víctima es investigadora</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Quien sufre el impago debe guardar recibos de papel, imprimir estados de cuenta y probar frente a un juez que el dinero nunca llegó. Un proceso agotador.
            </p>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={200}>
          <div className="bg-orange-50 hover:bg-orange-100/80 transition-colors p-8 rounded-3xl border border-orange-100 h-full">
            <Smartphone className="w-10 h-10 text-orange-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fricción Tecnológica</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Las "soluciones" actuales exigen que ambas partes (a menudo en conflicto) instalen nuevas apps, creen billeteras o cambien sus hábitos bancarios de toda la vida.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors p-8 rounded-3xl border border-slate-200 h-full">
            <ShieldCheck className="w-10 h-10 text-slate-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Evidencia Repudiable</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Una captura de pantalla de WhatsApp de un voucher se puede photoshopear en 2 minutos. Los juzgados pierden meses validando oficios con los bancos tradicionales.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section className="py-24 px-6 bg-indigo-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
    <div className="max-w-6xl mx-auto relative z-10">
      <FadeInSection>
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Cómo funciona Constancia</h2>
          <p className="text-indigo-200 text-lg md:text-xl max-w-3xl leading-relaxed">
            Cero fricción. La mejor acción es la que no existe: <strong>pagar como siempre ya produce la evidencia de forma automática.</strong>
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-4 gap-8 relative mt-12">
        {/* Línea conectora visible solo en desktop */}
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-1 bg-indigo-800 z-0 rounded-full"></div>

        {[
          {
            icon: FileText,
            phase: "Fase 0 (Única vez)",
            title: "El Acuerdo",
            desc: "Ambas partes registran los términos vía enlace mágico web. No se requiere crear cuenta ni descargar apps.",
            color: "bg-indigo-800"
          },
          {
            icon: Smartphone,
            phase: "Mensualmente",
            title: "El Pago Habitual",
            desc: "El pagador transfiere desde su app del BCP como siempre lo hace. No cambia su rutina, no aprende nada nuevo.",
            color: "bg-indigo-800"
          },
          {
            icon: Mail,
            phase: "Automático",
            title: "El Banco Avisa",
            desc: "El banco envía su clásico correo de constancia al realizar la transferencia. Ese correo contiene una firma de seguridad oculta.",
            color: "bg-indigo-800"
          },
          {
            icon: CheckCircle2,
            phase: "Evidencia",
            title: "Certificación Legal",
            desc: "Constancia lee la firma del banco y genera una prueba matemática irrefutable. Listo para el juzgado.",
            color: "bg-indigo-600 ring-4 ring-indigo-400/30"
          }
        ].map((step, i) => (
          <FadeInSection delay={i * 150} key={i}>
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center border-4 border-indigo-900 mb-6 shadow-2xl transition-transform hover:-translate-y-2 duration-300`}>
                <step.icon className={`w-10 h-10 ${i === 3 ? 'text-white' : 'text-indigo-300'}`} />
              </div>
              <div className="text-indigo-300 font-bold mb-2 uppercase tracking-wide text-xs font-mono">{step.phase}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-indigo-200/80 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const ValuePropSection = () => (
  <section className="py-24 px-6 bg-slate-50">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm mb-6">
              <Scale className="w-4 h-4" />
              <span>Innovación Técnica & Legal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              El banco ya es nuestro notario (y no lo sabe)
            </h2>
          </FadeInSection>
          
          <FadeInSection delay={150}>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Ningún otro sistema puede decir esto: <strong>reutilizamos la firma de seguridad criptográfica (DKIM) que los bancos ya insertan obligatoriamente en sus correos</strong> para protegerse del phishing.
              </p>
              <p>
                Al verificar esta firma pública, Constancia certifica que el pago existió, por el monto exacto, sin pedir credenciales, sin integrarse a la API del banco y sin custodiar un solo centavo.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="bg-white p-6 border-l-4 border-indigo-600 rounded-r-2xl shadow-md mt-8">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-xl">
                <Clock className="w-5 h-5 text-indigo-600" /> El silencio es evidencia
              </h4>
              <p className="text-base text-slate-600 leading-relaxed">
                Si la prueba matemática no existe llegada la fecha límite, el estado cambia automáticamente a "Vencido". <strong>Quien cumple deja un rastro sin proponérselo; quien no cumple genera el silencio que sirve como prueba para el juzgado.</strong>
              </p>
            </div>
          </FadeInSection>
        </div>

        <div className="flex-1 w-full relative">
          <FadeInSection delay={200}>
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Certificado Válido
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Scale className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Constancia Legal Generada</div>
                    <div className="text-slate-900 font-bold">Acuerdo #4092-A</div>
                  </div>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500 text-sm">Validación DKIM (BCP)</span>
                    <span className="text-emerald-600 font-bold text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Exitosa</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500 text-sm">Verificación de Monto</span>
                    <span className="text-emerald-600 font-bold text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> S/ 850.00 Exacto</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500 text-sm">Fecha Límite (Día 5)</span>
                    <span className="text-emerald-600 font-bold text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Cumplida</span>
                  </div>
                </div>

                <div className="bg-indigo-50 text-indigo-700 text-sm p-4 rounded-xl border border-indigo-100 font-medium text-center">
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
            <div key={i} className="bg-white p-6 rounded-2xl border-t-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2 font-mono">{stat.metric}</div>
              <h4 className="font-bold text-slate-900 mb-2">{stat.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

const DemoSection = () => (
  <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
    {/* Gradient Overlay for visual depth */}
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
    
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-center lg:text-left">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm mb-6 border border-indigo-500/30">
              <Smartphone className="w-4 h-4" />
              <span>Demo en Vivo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
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
                <li key={i} className="flex items-center gap-3 text-indigo-200">
                  <div className="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-indigo-300" />
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
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
              
              {/* Notch */}
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
              
              {/* Buttons / Details */}
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              
              {/* Screen Area */}
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-slate-900 absolute top-0 left-0 flex flex-col justify-between p-4 font-sans text-xs">
                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-indigo-400" />
                      <span className="font-bold text-white">Constancia</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      Activo
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-2">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Pensión Alimenticia</div>
                    <div className="text-lg font-bold text-white">S/ 650.00 / mes</div>
                    <div className="text-slate-400 text-[11px]">Vencimiento: Día 05</div>
                  </div>

                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 space-y-1.5 font-mono text-[11px]">
                    <div className="text-indigo-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pago Verificado BCP</span>
                    </div>
                    <div className="text-slate-400">Firma DKIM RSA-2048</div>
                    <div className="text-slate-500 text-[9px] truncate">Tx: 0x8f9a2b...c3e1</div>
                  </div>
                </div>

                <div className="pb-4 text-center">
                  <div className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">
                    Ver Certificado On-Chain
                  </div>
                </div>
              </div>
            </div>
            
            {/* Soft glow behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/30 blur-3xl -z-10 rounded-full"></div>
          </FadeInSection>
        </div>

      </div>
    </div>
  </section>
);

const TechStackSection = () => (
  <section className="py-24 px-6 bg-slate-900 text-white">
    <div className="max-w-6xl mx-auto">
      <FadeInSection>
        <div className="mb-12 border-b border-slate-700 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-100 mb-2">
              <Code className="text-indigo-400 w-8 h-8" /> Debajo del capó
            </h2>
            <p className="text-slate-400 text-lg">Arquitectura construida para ethLima 2026. Web2 UX, Web3 Security.</p>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg text-sm font-mono text-indigo-300 border border-slate-700">
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
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors h-full group">
              <div className="text-indigo-400 font-mono text-xs font-bold mb-3 tracking-wider uppercase">{tech.tag}</div>
              <h3 className="font-bold text-xl mb-3 text-white group-hover:text-indigo-300 transition-colors">{tech.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tech.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const RoadmapSection = () => (
  <section className="py-24 px-6 bg-white border-t border-slate-200">
    <div className="max-w-6xl mx-auto">
      <FadeInSection>
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-sm mb-4 border border-slate-200">
            <Terminal className="w-4 h-4" />
            <span>Dev Status Report</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Camino a la Demo</h2>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            El contrato Stylus (Rust) de verificación DKIM y el framework (Next.js + Postgres) <strong>están listos y testeados al 100%</strong>. Este es el plan de acción exacto de lo único que bloquea una demo funcional de punta a punta.
          </p>
        </div>
      </FadeInSection>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Blockers */}
        <div className="space-y-4">
          <FadeInSection delay={100}>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-rose-500" />
              Bloqueos Críticos (Para la Demo)
            </h3>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="bg-rose-50 hover:bg-rose-100/50 transition-colors border-l-4 border-rose-500 p-6 rounded-r-2xl shadow-sm">
              <div className="flex gap-4">
                <div className="bg-white shadow-sm p-3 rounded-xl h-fit text-rose-600 shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">1. Desplegar el Contrato Stylus</h4>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                    <code className="bg-white/80 font-bold px-1.5 py-0.5 rounded text-rose-800">cargo-stylus</code> requiere Linux/macOS. Se debe generar la wallet relayer, fondear en Arbitrum Sepolia y ejecutar el deploy.
                  </p>
                  <div className="text-xs font-mono text-slate-500 bg-white p-3 rounded-lg border border-rose-100">
                    Actualizar .env: RELAYER_PRIVATE_KEY y NEXT_PUBLIC_CONSTANCIA_CONTRACT_ADDRESS
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="bg-amber-50 hover:bg-amber-100/50 transition-colors border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
              <div className="flex gap-4">
                <div className="bg-white shadow-sm p-3 rounded-xl h-fit text-amber-600 shrink-0">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">2. Credenciales SMTP</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Crear cuenta de Gmail del proyecto y generar un <em>App Password</em> para habilitar los flujos reales de recuperación de enlaces perdidos.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="bg-blue-50 hover:bg-blue-100/50 transition-colors border-l-4 border-blue-500 p-6 rounded-r-2xl shadow-sm">
              <div className="flex gap-4">
                <div className="bg-white shadow-sm p-3 rounded-xl h-fit text-blue-600 shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">3. Revisión de UI (QA Visual)</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Todo se construyó "a ciegas" mediante código. Falta levantar <code className="bg-white/80 font-bold px-1.5 py-0.5 rounded text-blue-800">npm run dev</code> en un navegador real, verificar responsive y ajustar estilos.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Backlog */}
        <div>
          <FadeInSection delay={150}>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-indigo-500" />
              Backlog (Post-Demo)
            </h3>
          </FadeInSection>
          
          <div className="grid gap-4">
            {[
              { title: "Conexión OAuth con Gmail", desc: "Automatizar la subida de comprobantes sin obligar al usuario a descargar archivos .eml a mano. (Ticket 013)" },
              { title: "Soporte para Otros Bancos / Yape", desc: "El MVP actual extrae exclusivamente los campos y llaves del formato BCP." },
              { title: "Vista de Historial Anual", desc: "Implementar la tabla shadcn para visualizar todos los períodos históricos del acuerdo, no solo el mes actual." },
              { title: "Redactar DESIGN.md", desc: "Documentar el sistema de diseño recién después de aprobar la revisión QA visual." }
            ].map((item, i) => (
              <FadeInSection delay={200 + (i * 100)} key={i}>
                <div className="border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors p-5 rounded-2xl flex items-start gap-4">
                  <div className="bg-white p-1 rounded-full border border-slate-200 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <FadeInSection delay={600}>
            <div className="mt-8 p-6 bg-slate-100 rounded-2xl border border-slate-200">
              <p className="text-sm text-slate-700 font-bold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4"/> Documentación de referencia en repo:
              </p>
              <ul className="text-sm text-slate-600 space-y-2 list-none font-mono">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div><code className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">wayfinder/map.md</code> (Decisiones técnicas y tickets)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div><code className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">PRODUCT.md</code> (Restricciones innegociables)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div><code className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">contract/DEPLOY.md</code> (Guía paso a paso)</li>
              </ul>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  </section>
);

export function ConstanciaPitch() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 scroll-smooth">
      <Header />
      
      <main>
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <SolutionSection />
        <ValuePropSection />
        <DemoSection />
        <TechStackSection />
        <RoadmapSection />
      </main>

      <footer className="bg-black text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600/20 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <div className="font-bold text-white text-lg tracking-tight">Constancia</div>
              <div className="text-slate-500">Hackathon ethLima 2026</div>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="font-medium text-slate-300 mb-1">Evidencia automática para pensión de alimentos.</div>
            <div className="text-slate-500">Cero fricción. Cero cripto jerga. 100% Impacto.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { ConstanciaPitch as PitchPresentation };
export default ConstanciaPitch;
