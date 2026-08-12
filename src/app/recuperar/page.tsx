"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecuperarEnlace() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      await fetch("/api/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setEnviando(false);
      setEnviado(true);
    }
  }

  if (enviado) {
    return <RecuperarEnviadoView />;
  }

  return (
    <FormularioRecuperar
      email={email}
      setEmail={setEmail}
      enviando={enviando}
      onEnviar={enviar}
    />
  );
}

function RecuperarEnviadoView() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <p className="max-w-sm text-ink-muted leading-relaxed">
        Si ese correo tiene un acuerdo registrado, le va a llegar un enlace en unos minutos.
      </p>
      <Link href="/" className="mt-6 text-sm font-medium text-ink underline underline-offset-4">
        Volver al inicio
      </Link>
    </main>
  );
}

function FormularioRecuperar({
  email,
  setEmail,
  enviando,
  onEnviar,
}: {
  email: string;
  setEmail: (val: string) => void;
  enviando: boolean;
  onEnviar: (e: React.FormEvent) => void;
}) {
  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <form onSubmit={onEnviar} className="max-w-md w-full">
        <p className="tabular text-xs text-ink-muted tracking-wide">RECUPERAR ACCESO</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">¿Perdiste tu enlace?</h1>
        <p className="mt-2 text-ink-muted leading-relaxed">
          Escribe el correo que usaste al registrar el acuerdo y te reenviamos tu enlace.
        </p>

        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Correo
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

        <button
          type="submit"
          disabled={enviando}
          className="mt-8 w-full min-h-[44px] rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink transition-colors disabled:opacity-60"
        >
          {enviando ? "Enviando…" : "Enviar enlace"}
        </button>
      </form>
    </main>
  );
}

