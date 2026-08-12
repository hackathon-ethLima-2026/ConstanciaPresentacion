"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatearMonto, nombreMes } from "@/lib/format";
import { esConRetraso, esParcial, infoEstado, tieneComprobanteVerificado } from "@/lib/estado";
import { ConstanciaVerificada } from "@/components/ConstanciaVerificada";
import { IconGmail, IconGoogle } from "@/components/IconosProcedencia";

type Estado = {
  rol: "receptora" | "pagador";
  confirmadaPorAmbas: boolean;
  montoEsperadoCentavos: number;
  diaVencimientoMes: number;
  destinatarioUltimos4?: string;
  anio?: number;
  mes?: number;
  periodo?: {
    estado: number;
    montoVerificadoCentavos: string;
    timestampPago?: string;
  } | null;
  txHash?: string | null;
  origenComprobante?: string | null;
  contratoDesplegado?: boolean;
};

/**
 * `no-store` importa: tras registrar un pago se vuelve a pedir el estado, y una respuesta
 * cacheada mostraría el período como si nada hubiera pasado.
 */
async function pedirEstado(token: string): Promise<Estado> {
  const res = await fetch(`/api/obligaciones/${token}`, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "No pudimos cargar este acuerdo");
  return data;
}

export default function VerEstado({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;
    pedirEstado(token)
      .then((data) => {
        if (vigente) setEstado(data);
      })
      .catch((e: Error) => {
        if (vigente) setError(e.message);
      });
    return () => {
      vigente = false;
    };
  }, [token]);

  // La pantalla vuelve a preguntar por el estado cuando se registra un pago, en vez de pedirle
  // a la persona que recargue. Ese "recarga la página" dejaba la pantalla afirmando lo
  // contrario de lo que acababa de pasar — lo peor que puede hacer una pantalla cuyo trabajo
  // es justamente dar confianza.
  const recargar = useCallback(() => {
    pedirEstado(token)
      .then(setEstado)
      .catch((e: Error) => setError(e.message));
  }, [token]);

  if (error) {
    // Un enlace roto o vencido es el caso más probable aquí, y la salida útil no es
    // "volver al inicio" (eso ya lo da la cabecera) sino pedir un enlace nuevo.
    return (
      <EstadoMensaje mensaje={error} esError>
        <Link
          href="/recuperar"
          className="mt-6 text-sm font-medium text-ink underline underline-offset-4"
        >
          Pedir un enlace nuevo por correo
        </Link>
      </EstadoMensaje>
    );
  }
  if (!estado) {
    return <EstadoMensaje mensaje="Cargando…" />;
  }
  if (!estado.confirmadaPorAmbas) {
    return (
      <EstadoMensaje mensaje="Todavía falta que la otra persona confirme este acuerdo. Cuando lo haga, vas a poder ver el estado acá mismo." />
    );
  }

  return <EstadoAcuerdoView estado={estado} token={token} onVerificado={recargar} />;
}

function EstadoMensaje({
  mensaje,
  esError,
  children,
}: {
  mensaje: string;
  esError?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <p
        className={`max-w-sm text-center ${esError ? "text-danger" : "text-ink-muted leading-relaxed"}`}
      >
        {mensaje}
      </p>
      {children}
    </main>
  );
}

function EstadoAcuerdoView({
  estado,
  token,
  onVerificado,
}: {
  estado: Estado;
  token: string;
  onVerificado: () => void;
}) {
  const periodo = estado.periodo;
  const verificado = periodo ? tieneComprobanteVerificado(periodo.estado) : false;

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <div className="lectura max-w-md w-full">
        <h1 className="text-2xl font-semibold text-ink">
          {estado.mes && estado.anio
            ? `${nombreMes(estado.mes)} de ${estado.anio}`
            : "Estado del acuerdo"}
        </h1>

        {!estado.contratoDesplegado ? (
          <p className="mt-4 text-sm text-amber bg-amber-bg px-3 py-2 rounded border border-amber/20 leading-relaxed">
            El sistema todavía no tiene el registro conectado — esto es un demo previo al
            despliegue final.
          </p>
        ) : verificado && periodo ? (
          <ConstanciaVerificada
            etiqueta={infoEstado(periodo.estado).etiqueta}
            montoVerificadoCentavos={periodo.montoVerificadoCentavos}
            montoEsperadoCentavos={estado.montoEsperadoCentavos}
            diaVencimientoMes={estado.diaVencimientoMes}
            destinatarioUltimos4={estado.destinatarioUltimos4}
            timestampPago={periodo.timestampPago}
            txHash={estado.txHash}
            origen={estado.origenComprobante}
            conRetraso={esConRetraso(periodo.estado)}
            parcial={esParcial(periodo.estado)}
          />
        ) : periodo ? (
          <EstadoSinComprobante estado={periodo.estado} />
        ) : null}

        <dl className="mt-6 divide-y divide-grid-line rounded border border-grid-line bg-panel overflow-hidden">
          <Fila etiqueta="Monto acordado" valor={formatearMonto(estado.montoEsperadoCentavos)} />
          <Fila etiqueta="Día de vencimiento" valor={String(estado.diaVencimientoMes)} />
          {estado.destinatarioUltimos4 && (
            <Fila etiqueta="Cuenta de destino" valor={`**** ${estado.destinatarioUltimos4}`} />
          )}
        </dl>

        {/* Con el pago ya verificado, buscar de nuevo no aporta: el registro no se reescribe. */}
        {!verificado && <BuscarEnGmail token={token} onVerificado={onVerificado} />}
      </div>
    </main>
  );
}

/** Lectura del período cuando todavía no hay comprobante: la marca, sin evidencia que enseñar. */
function EstadoSinComprobante({ estado }: { estado: number }) {
  const info = infoEstado(estado);
  const Icono = info.Icono;
  return (
    <div
      className="mt-6 flex flex-col items-center rounded border border-grid-line px-5 py-8 text-center"
      style={{ background: info.bg }}
    >
      <Icono className="h-8 w-8" style={{ color: info.ink }} />
      <p className="mt-3 text-lg font-semibold" style={{ color: info.ink }}>
        {info.etiqueta}
      </p>
    </div>
  );
}

/**
 * Acción primaria del mes. Antes la única vía era exportar el .eml a mano (cuatro pasos,
 * en computadora); esto lo reduce a un toque. La subida manual queda como respaldo para
 * quien no conectó Gmail o recibió el correo en otra cuenta.
 */
function BuscarEnGmail({ token, onVerificado }: { token: string; onVerificado: () => void }) {
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Un 401 no es un error de la persona sino un permiso que falta: se responde con la acción
  // que lo resuelve, no con un texto rojo que la deja sin salida.
  const [faltaConectarGoogle, setFaltaConectarGoogle] = useState(false);

  async function buscar() {
    setBuscando(true);
    setError(null);
    setFaltaConectarGoogle(false);
    try {
      const res = await fetch(`/api/obligaciones/${token}/comprobante/gmail`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.status === 401) {
        setFaltaConectarGoogle(true);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "No pudimos buscar el correo");
      onVerificado();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos buscar el correo");
    } finally {
      setBuscando(false);
    }
  }

  if (faltaConectarGoogle) {
    return <ConectarGoogle />;
  }

  return (
    <>
      <button
        type="button"
        onClick={buscar}
        disabled={buscando}
        className="btn-instrumento mt-8 flex w-full min-h-[44px] items-center justify-center gap-2.5 rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink disabled:opacity-60"
      >
        <IconGmail className="h-5 w-5 shrink-0" />
        {buscando ? "Buscando en tu Gmail…" : "Buscar mi pago en Gmail"}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-4 text-sm text-danger bg-danger-bg px-3 py-2 rounded border border-danger/20 leading-relaxed"
        >
          {error}
        </p>
      )}

      <Link
        href={`/o/${token}/comprobante`}
        className="mt-4 block text-center text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
      >
        O sube el archivo a mano
      </Link>
    </>
  );
}

/**
 * El permiso de lectura del buzón se pide desde /perfil (Auth.js lo tiene como pantalla de
 * ingreso). Se explica qué se va a leer antes de mandar ahí: pedir acceso al correo sin decir
 * para qué es exactamente lo que hace desconfiar.
 */
function ConectarGoogle() {
  return (
    <div className="mt-8 rounded border border-grid-line bg-panel px-4 py-5">
      <p className="text-sm font-medium text-ink">Conecta tu Gmail para buscar el correo</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Solo se leen los correos que vienen del BCP, para tomar el que confirma este pago.
        Nada más de tu buzón se lee ni se guarda.
      </p>
      <Link
        href="/perfil"
        className="btn-instrumento mt-4 flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded border border-grid-line bg-ink px-6 text-base font-medium text-paper hover:bg-transparent hover:text-ink"
      >
        <IconGoogle className="h-5 w-5 shrink-0" />
        Continuar con Google
      </Link>
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
