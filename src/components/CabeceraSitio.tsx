import Link from "next/link";

// Navegación global. Incluye enlace al Pitch interactivo de ethLima 2026.
export function CabeceraSitio() {
  return (
    <header className="border-b border-grid-line">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-ink transition-colors duration-[var(--dur-short)] hover:text-ink-muted"
        >
          Constancia
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/pitch"
            className="text-sm font-medium text-signal transition-colors duration-[var(--dur-short)] hover:text-ink"
          >
            Ver Pitch
          </Link>
          <Link
            href="/nueva"
            className="text-sm text-ink-muted transition-colors duration-[var(--dur-short)] hover:text-ink"
          >
            Registrar acuerdo
          </Link>
          <Link
            href="/perfil"
            className="text-sm text-ink-muted transition-colors duration-[var(--dur-short)] hover:text-ink"
          >
            Mi perfil
          </Link>
        </div>
      </nav>
    </header>
  );
}
