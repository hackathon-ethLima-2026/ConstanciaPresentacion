"use client";

import { use, useState } from "react";
import Link from "next/link";
import { IconVerificado } from "@/components/EstadoIcon";

export default function SubirComprobante({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!archivo) return;
    setEnviando(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("archivo", archivo);
      const res = await fetch(`/api/obligaciones/${token}/comprobante`, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No pudimos registrar el comprobante");
      setListo(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos registrar el comprobante");
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return <ComprobanteListoView token={token} />;
  }

  return (
    <FormularioSubirComprobante
      token={token}
      archivo={archivo}
      setArchivo={setArchivo}
      enviando={enviando}
      error={error}
      onEnviar={enviar}
    />
  );
}

function ComprobanteListoView({ token }: { token: string }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded border border-grid-line"
        style={{ background: "color-mix(in srgb, var(--signal) 12%, var(--panel))" }}
      >
        <IconVerificado className="w-7 h-7 text-signal-ink" />
      </div>
      <h1 className="mt-4 text-xl font-semibold text-ink">Pago verificado</h1>
      <p className="mt-2 max-w-sm text-ink-muted leading-relaxed">
        Quedó registrado. Ya puedes ver el estado actualizado.
      </p>
      <Link
        href={`/o/${token}`}
        className="mt-6 min-h-[44px] flex items-center justify-center rounded border border-ink bg-ink px-6 text-base font-medium text-paper hover:bg-transparent hover:text-ink transition-colors"
      >
        Ver estado
      </Link>
    </main>
  );
}

function FormularioSubirComprobante({
  token,
  archivo,
  setArchivo,
  enviando,
  error,
  onEnviar,
}: {
  token: string;
  archivo: File | null;
  setArchivo: (f: File | null) => void;
  enviando: boolean;
  error: string | null;
  onEnviar: (e: React.FormEvent) => void;
}) {
  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <form onSubmit={onEnviar} className="max-w-md w-full">
        <EncabezadoSubida token={token} />
        <InstruccionesPasosSubida />
        <SelectorArchivoEml archivo={archivo} setArchivo={setArchivo} />

        {error && (
          <p role="alert" className="mt-4 text-sm text-danger bg-danger-bg px-3 py-2 rounded border border-danger/20 leading-relaxed">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!archivo || enviando}
          className="mt-8 w-full min-h-[44px] rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink transition-colors disabled:opacity-60"
        >
          {enviando ? "Verificando…" : "Verificar pago"}
        </button>
      </form>
    </main>
  );
}

function EncabezadoSubida({ token }: { token: string }) {
  return (
    <>
      {/* Retorno contextual: la cabecera global no puede saber a qué acuerdo
          pertenece esta carga, así que el enlace al acuerdo vive aquí. */}
      <Link
        href={`/o/${token}`}
        className="text-sm text-ink-muted transition-colors duration-[var(--dur-short)] hover:text-ink"
      >
        ← Volver al acuerdo
      </Link>
      <p className="tabular mt-6 text-xs text-ink-muted tracking-wide">
        CARGA DE COMPROBANTE
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">Subir comprobante</h1>
      <p className="mt-2 text-ink-muted leading-relaxed">
        Sube el correo original del banco, tal como lo descargaste — no una captura de
        pantalla.
      </p>
    </>
  );
}

function InstruccionesPasosSubida() {
  return (
    <ol className="tabular mt-6 space-y-2 text-sm text-ink-muted leading-relaxed">
      <li className="flex gap-3">
        <span className="text-ink">01</span>
        Abre el correo de confirmación del banco en Gmail, desde una computadora.
      </li>
      <li className="flex gap-3">
        <span className="text-ink">02</span>
        Toca el menú de tres puntos → &quot;Mostrar original&quot;.
      </li>
      <li className="flex gap-3">
        <span className="text-ink">03</span>
        Toca &quot;Descargar mensaje original&quot; — se guarda un archivo .eml.
      </li>
      <li className="flex gap-3">
        <span className="text-ink">04</span>
        Súbelo aquí abajo.
      </li>
    </ol>
  );
}

function SelectorArchivoEml({ archivo, setArchivo }: { archivo: File | null; setArchivo: (f: File | null) => void }) {
  return (
    <label
      htmlFor="archivo"
      className="mt-6 flex min-h-[96px] cursor-pointer flex-col items-center justify-center rounded border border-dashed border-grid-line px-4 py-6 text-center hover:border-ink transition-colors"
    >
      <span className="text-sm font-medium text-ink">
        {archivo ? archivo.name : "Toca para elegir el archivo .eml"}
      </span>
      <input
        id="archivo"
        type="file"
        accept=".eml,message/rfc822"
        className="sr-only"
        onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}


