"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { formatearMonto } from "@/lib/format";
import { IconVerificado } from "@/components/EstadoIcon";

type Detalle = {
  destinatarioNombre: string;
  destinatarioUltimos4: string;
  montoEsperadoCentavos: number;
  diaVencimientoMes: number;
  confirmadaPorAmbas: boolean;
};

function useConfirmarObligacion(token: string) {
  const [detalle, setDetalle] = useState<Detalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [confirmando, setConfirmando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`/api/obligaciones/confirmar/${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "No pudimos cargar este acuerdo");
        setDetalle(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [token]);

  async function confirmar() {
    setConfirmando(true);
    setError(null);
    try {
      const res = await fetch(`/api/obligaciones/confirmar/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No pudimos confirmar el acuerdo");
      setConfirmado(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos confirmar el acuerdo");
    } finally {
      setConfirmando(false);
    }
  }

  return { detalle, cargando, confirmando, error, confirmado, email, setEmail, confirmar };
}

export default function ConfirmarObligacion({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const state = useConfirmarObligacion(token);

  if (state.cargando) return <EstadoSimple mensaje="Cargando…" />;
  if (state.error && !state.detalle) return <EstadoSimple mensaje={state.error} esError />;
  if (!state.detalle) return null;
  if (state.confirmado || state.detalle.confirmadaPorAmbas) return <ConfirmadoView />;

  return (
    <FormularioConfirmar
      detalle={state.detalle}
      email={state.email}
      setEmail={state.setEmail}
      error={state.error}
      confirmando={state.confirmando}
      onConfirmar={state.confirmar}
    />
  );
}

function ConfirmadoView() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <IconVerificado className="w-8 h-8 text-signal" />
      <p className="mt-3 max-w-sm text-ink-muted leading-relaxed">
        Este acuerdo ya está confirmado y activo. A partir de ahora, cada pago se registra
        solo.
      </p>

      {/* Quien confirma no recibe su enlace de acceso: la API solo responde {ok:true}.
          Su única vía es pedirlo por correo, así que hay que decírselo aquí — antes
          esta pantalla no ofrecía ninguna salida. */}
      <p className="mt-6 max-w-sm text-sm text-ink-muted leading-relaxed">
        Para entrar a ver el estado del acuerdo, pide tu enlace con el mismo correo que
        acabas de usar.
      </p>
      <Link
        href="/recuperar"
        className="btn-instrumento mt-4 flex min-h-[44px] items-center justify-center rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink"
      >
        Recibir mi enlace por correo
      </Link>
    </main>
  );
}

function FormularioConfirmar({
  detalle,
  email,
  setEmail,
  error,
  confirmando,
  onConfirmar,
}: {
  detalle: Detalle;
  email: string;
  setEmail: (val: string) => void;
  error: string | null;
  confirmando: boolean;
  onConfirmar: () => void;
}) {
  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <div className="max-w-md w-full">
        <p className="tabular text-xs text-ink-muted tracking-wide">REGISTRO · PASO 2 DE 2</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">Revisa el acuerdo</h1>
        <p className="mt-2 text-ink-muted leading-relaxed">
          La otra persona registró estos datos. Confírmalos antes de activar el acuerdo.
        </p>

        <DetalleResumen detalle={detalle} />
        <CampoEmailConfirmar email={email} setEmail={setEmail} />

        {error && (
          <p role="alert" className="mt-4 text-sm text-danger bg-danger-bg px-3 py-2 rounded border border-danger/20">
            {error}
          </p>
        )}

        <button
          onClick={onConfirmar}
          disabled={confirmando || !email}
          className="mt-8 w-full min-h-[44px] rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink transition-colors disabled:opacity-60"
        >
          {confirmando ? "Confirmando…" : "Confirmar y activar el acuerdo"}
        </button>
      </div>
    </main>
  );
}

function DetalleResumen({ detalle }: { detalle: Detalle }) {
  return (
    <dl className="mt-6 divide-y divide-grid-line rounded border border-grid-line bg-panel overflow-hidden">
      <Fila etiqueta="Destinatario" valor={`${detalle.destinatarioNombre} (**** ${detalle.destinatarioUltimos4})`} />
      <Fila etiqueta="Monto mensual" valor={formatearMonto(detalle.montoEsperadoCentavos)} />
      <Fila etiqueta="Día de vencimiento" valor={String(detalle.diaVencimientoMes)} />
    </dl>
  );
}

function CampoEmailConfirmar({ email, setEmail }: { email: string; setEmail: (v: string) => void }) {
  return (
    <div className="mt-5">
      <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
        Tu correo (para poder recuperar el enlace si lo pierdes)
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        className="w-full min-h-[44px] rounded border border-grid-line bg-panel px-3 py-2 text-base text-ink focus:border-ink focus:outline-none"
      />
    </div>
  );
}


function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-sm text-ink-muted">{etiqueta}</dt>
      <dd className="tabular text-sm font-medium text-ink text-right">{valor}</dd>
    </div>
  );
}

function EstadoSimple({ mensaje, esError }: { mensaje: string; esError?: boolean }) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <p className={`max-w-sm text-center ${esError ? "text-danger" : "text-ink-muted"}`}>{mensaje}</p>
    </main>
  );
}

