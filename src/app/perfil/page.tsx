import { or, eq } from "drizzle-orm";
import { auth, signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { obligaciones } from "@/lib/schema";
import { formatearMonto } from "@/lib/format";
import { acuerdosParaEmail } from "@/lib/perfil";
import Link from "next/link";

export default async function Perfil() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <p className="max-w-sm text-center text-ink-muted leading-relaxed">
          Inicia sesión con Google para ver tu perfil y los acuerdos asociados a
          tu correo.
        </p>
        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="btn-instrumento flex min-h-[44px] items-center justify-center rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink"
          >
            Continuar con Google
          </button>
        </form>
      </main>
    );
  }

  const email = session.user.email!;
  const filas = await db
    .select()
    .from(obligaciones)
    .where(
      or(
        eq(obligaciones.emailReceptora, email),
        eq(obligaciones.emailPagador, email),
      ),
    );
  const acuerdos = acuerdosParaEmail(email, filas);

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      <div className="max-w-lg w-full">
        <p className="tabular text-xs text-ink-muted tracking-wide">PERFIL</p>
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink">
            {session.user.name ?? email}
          </h1>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-sm text-ink-muted hover:text-ink underline underline-offset-4 transition-colors duration-[var(--dur-short)]"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
        <p className="mt-1 text-sm text-ink-muted">{email}</p>

        <h2 className="mt-8 text-sm font-medium text-ink">Tus acuerdos</h2>
        {acuerdos.length === 0 ? (
          <PerfilVacio />
        ) : (
          <ListaAcuerdos acuerdos={acuerdos} />
        )}
      </div>
    </main>
  );
}

// Un estado vacío sin acción es una pared. Ofrecemos la única salida útil, más la
// vía para quien sí tiene acuerdos pero los registró con otro correo.
function PerfilVacio() {
  return (
    <div className="mt-2">
      <p className="text-sm text-ink-muted leading-relaxed">
        No hay ningún acuerdo registrado con este correo todavía.
      </p>
      <Link
        href="/nueva"
        className="btn-instrumento mt-4 inline-flex min-h-[44px] items-center justify-center rounded border border-ink bg-ink px-6 py-3 text-base font-medium text-paper hover:bg-transparent hover:text-ink"
      >
        Registrar un acuerdo
      </Link>
      <p className="mt-4 text-sm text-ink-muted leading-relaxed">
        ¿Lo registraste con otro correo?{" "}
        <Link
          href="/recuperar"
          className="font-medium text-ink underline underline-offset-4"
        >
          Pide tu enlace
        </Link>
      </p>
    </div>
  );
}

function ListaAcuerdos({
  acuerdos,
}: {
  acuerdos: ReturnType<typeof acuerdosParaEmail>;
}) {
  return (
    <ul className="lista-entrada mt-3 divide-y divide-grid-line rounded border border-grid-line bg-panel overflow-hidden">
      {acuerdos.map((a) => (
        <li key={a.id} className="fila-acuerdo">
          <Link
            href={`/o/${a.token}`}
            className="flex items-center justify-between gap-4 pl-5 pr-4 py-3"
          >
            <span className="text-sm text-ink">
              {a.destinatarioNombre}
              <span className="ml-2 text-xs text-ink-muted">({a.rol})</span>
            </span>
            <span className="tabular text-sm font-medium text-ink">
              {formatearMonto(a.montoEsperadoCentavos)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
