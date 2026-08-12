"use client";

import { useState } from "react";
import Link from "next/link";
import { IconVerificado } from "@/components/EstadoIcon";

type Resultado = { enlacePropio: string; enlaceConfirmacion: string };

// El ring nunca se anima (debe aparecer instantáneo al enfocar) — solo el borde transiciona.
const INPUT_CLASE =
  "w-full min-h-[44px] rounded border border-grid-line bg-panel px-3 py-2 text-base text-ink " +
  "transition-colors duration-[var(--dur-short)] " +
  "focus:outline-none focus:border-ink focus:ring-2 focus:ring-signal/40";

function useNuevaObligacionForm() {
  const [rol, setRol] = useState<"receptora" | "pagador">("receptora");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [ultimos4, setUltimos4] = useState("");
  const [monto, setMonto] = useState("");
  const [dia, setDia] = useState("5");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const montoCentavos = Math.round(
        parseFloat(monto.replace(",", ".")) * 100,
      );
      const res = await fetch("/api/obligaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rol,
          email,
          destinatarioNombre: nombre,
          destinatarioUltimos4: ultimos4,
          montoEsperadoCentavos: montoCentavos,
          diaVencimientoMes: Number(dia),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error ?? "No pudimos registrar el acuerdo. Intenta de nuevo.",
        );
        return;
      }
      setResultado(data);
    } catch {
      setError("No pudimos conectar con el servidor. Revisa tu conexión.");
    } finally {
      setEnviando(false);
    }
  }

  return {
    rol,
    setRol,
    email,
    setEmail,
    nombre,
    setNombre,
    ultimos4,
    setUltimos4,
    monto,
    setMonto,
    dia,
    setDia,
    enviando,
    error,
    resultado,
    enviar,
  };
}

export default function NuevaObligacion() {
  const formState = useNuevaObligacionForm();

  if (formState.resultado) {
    return <ResultadoRegistroView resultado={formState.resultado} />;
  }

  return <FormularioNuevaObligacion state={formState} />;
}

function ResultadoRegistroView({ resultado }: { resultado: Resultado }) {
  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <div className="max-w-md w-full">
        <Progreso paso={2} />
        <h1 className="mt-3 text-2xl font-semibold text-ink">
          Faltan dos pasos
        </h1>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Guarda tu propio enlace y envíale el otro a la otra persona para que
          confirme el acuerdo.
        </p>

        <div className="mt-6 divide-y divide-grid-line rounded border border-grid-line overflow-hidden">
          <EnlaceCard
            titulo="Tu enlace (guárdalo)"
            ruta={resultado.enlacePropio}
          />
          <EnlaceCard
            titulo="Enlace para la otra persona"
            ruta={resultado.enlaceConfirmacion}
          />
        </div>

        <p className="mt-6 text-sm text-ink-muted leading-relaxed">
          El acuerdo queda activo recién cuando la otra persona confirma. Hasta
          entonces, nadie puede subir un comprobante.
        </p>

        {/* Salida obligatoria: esta pantalla era un callejón sin salida justo en el
            momento de mayor valor — el acuerdo ya existe y no había forma de llegar
            a él sin copiar la URL a mano. */}
        <Link
          href={resultado.enlacePropio}
          className="btn-instrumento mt-8 flex min-h-[44px] items-center justify-center rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink"
        >
          Ver mi acuerdo
        </Link>
      </div>
    </main>
  );
}

function FormularioNuevaObligacion({
  state,
}: {
  state: ReturnType<typeof useNuevaObligacionForm>;
}) {
  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <form onSubmit={state.enviar} className="max-w-md w-full">
        <Progreso paso={1} />
        <h1 className="mt-3 text-2xl font-semibold text-ink">
          Registrar un acuerdo
        </h1>
        <p className="mt-2 text-ink-muted leading-relaxed">
          Esto se hace una sola vez. Después, el registro se escribe solo cada
          vez que llega el pago.
        </p>

        <SeccionSeleccionRol rol={state.rol} setRol={state.setRol} />
        <CamposPrincipales
          email={state.email}
          setEmail={state.setEmail}
          nombre={state.nombre}
          setNombre={state.setNombre}
        />
        <CamposDetallesObligacion
          ultimos4={state.ultimos4}
          setUltimos4={state.setUltimos4}
          monto={state.monto}
          setMonto={state.setMonto}
          dia={state.dia}
          setDia={state.setDia}
        />

        {state.error && (
          <p
            role="alert"
            className="mt-4 text-sm text-danger bg-danger-bg px-3 py-2 rounded border border-danger/20"
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={state.enviando}
          className="btn-instrumento mt-8 w-full min-h-[44px] rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink disabled:opacity-60"
        >
          {state.enviando ? "Registrando…" : "Continuar"}
        </button>
      </form>
    </main>
  );
}

function SeccionSeleccionRol({
  rol,
  setRol,
}: {
  rol: "receptora" | "pagador";
  setRol: (r: "receptora" | "pagador") => void;
}) {
  return (
    <fieldset className="mt-8">
      <legend className="text-sm font-medium text-ink">¿Cuál es tu rol?</legend>
      <div className="mt-2 grid grid-cols-2 gap-px bg-grid-line rounded border border-grid-line overflow-hidden">
        <RolBoton
          etiqueta="Recibo la pensión"
          activo={rol === "receptora"}
          onClick={() => setRol("receptora")}
        />
        <RolBoton
          etiqueta="Pago la pensión"
          activo={rol === "pagador"}
          onClick={() => setRol("pagador")}
        />
      </div>
    </fieldset>
  );
}

function CamposPrincipales({
  email,
  setEmail,
  nombre,
  setNombre,
}: {
  email: string;
  setEmail: (v: string) => void;
  nombre: string;
  setNombre: (v: string) => void;
}) {
  return (
    <>
      <Campo
        label="Tu correo (para poder recuperar el enlace si lo pierdes)"
        htmlFor="email"
      >
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className={INPUT_CLASE}
        />
      </Campo>
      <Campo
        label="Nombre del destinatario tal como figura en el banco"
        htmlFor="nombre"
      >
        <input
          id="nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: María Pérez"
          className={INPUT_CLASE}
        />
      </Campo>
    </>
  );
}

function CamposDetallesObligacion({
  ultimos4,
  setUltimos4,
  monto,
  setMonto,
  dia,
  setDia,
}: {
  ultimos4: string;
  setUltimos4: (v: string) => void;
  monto: string;
  setMonto: (v: string) => void;
  dia: string;
  setDia: (v: string) => void;
}) {
  return (
    <>
      <Campo
        label="Últimos 4 dígitos de la cuenta que recibe"
        htmlFor="ultimos4"
      >
        <input
          id="ultimos4"
          required
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          value={ultimos4}
          onChange={(e) =>
            setUltimos4(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          placeholder="0000"
          className={`tabular ${INPUT_CLASE}`}
        />
      </Campo>
      <Campo label="Monto mensual (soles)" htmlFor="monto">
        <input
          id="monto"
          required
          inputMode="decimal"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="500.00"
          className={`tabular ${INPUT_CLASE}`}
        />
      </Campo>
      <Campo label="Día de vencimiento (1 al 31)" htmlFor="dia">
        <input
          id="dia"
          required
          type="number"
          min={1}
          max={31}
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          className={`tabular ${INPUT_CLASE}`}
        />
      </Campo>
    </>
  );
}

// Indicador de progreso real (dos puntos, no una etiqueta tipográfica encima del heading —
// ese patrón está prohibido por el craft-floor). Punto lleno = paso alcanzado.
function Progreso({ paso }: { paso: 1 | 2 }) {
  return (
    <div
      className="flex items-center gap-2 text-xs text-ink-muted"
      role="img"
      aria-label={`Paso ${paso} de 2: ${paso === 1 ? "registrar" : "confirmar"}`}
    >
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        Registrar
      </span>
      <span className="w-6 h-px bg-grid-line" aria-hidden="true" />
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span
          className={`w-1.5 h-1.5 rounded-full ${paso === 2 ? "bg-ink" : "border border-grid-line"}`}
        />
        Confirmar
      </span>
    </div>
  );
}

function Campo({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-ink mb-1.5"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function RolBoton({
  etiqueta,
  activo,
  onClick,
}: {
  etiqueta: string;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`min-h-[44px] px-4 py-2 text-sm font-medium transition-colors ${
        activo ? "bg-ink text-paper" : "bg-panel text-ink hover:bg-paper"
      }`}
    >
      {etiqueta}
    </button>
  );
}

function EnlaceCard({ titulo, ruta }: { titulo: string; ruta: string }) {
  const [copiado, setCopiado] = useState(false);
  const url =
    typeof window !== "undefined" ? `${window.location.origin}${ruta}` : ruta;

  return (
    <div className="bg-panel p-4">
      <p className="text-sm font-medium text-ink">{titulo}</p>
      <p className="tabular mt-1 break-all text-sm text-ink-muted">{url}</p>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2000);
        }}
        className="btn-instrumento mt-3 inline-flex items-center gap-1.5 min-h-[44px] rounded border border-grid-line px-4 text-sm font-medium text-ink hover:bg-paper"
      >
        {copiado && <IconVerificado className="w-4 h-4 text-signal" />}
        {copiado ? "Copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
