/**
 * La constancia: por qué se puede creer que el pago ocurrió.
 *
 * Antes esta pantalla decía "Verificado" y el monto, y nada más. Eso le pide a la persona que
 * confíe en NOSOTROS, que es justo lo que el producto existe para no tener que hacer: el
 * problema original es que la palabra de una parte no le basta a la otra. Un adjetivo en verde
 * no cambia eso — solo mueve la confianza de una persona a una página web.
 *
 * Así que la pantalla muestra la cadena de evidencia, en el orden en que ocurrió:
 *
 *   1. el correo salió del banco, no de un formulario
 *   2. la firma del banco se recalculó y coincidió
 *   3. el resultado quedó anotado en un registro que no controlamos
 *
 * El eslabón 3 es el que cierra: sin ese enlace todo lo anterior sigue siendo afirmación
 * nuestra. Con él, quien duda no tiene que creernos — abre el enlace.
 *
 * REGLA DE HONESTIDAD: cada línea afirma solo lo que consta. La procedencia Gmail se nombra
 * únicamente si el comprobante se leyó del buzón (`origen === "gmail"`); si la persona subió el
 * archivo a mano, se dice eso. Inflar la evidencia aquí destruiría el único activo de la
 * pantalla.
 *
 * Sin jerga cripto (PRODUCT.md): "registro público", nunca blockchain/tx/hash/Arbitrum.
 */
import { formatearMonto } from "@/lib/format";
import { abreviarHash, urlDeRegistro } from "@/lib/explorador";
import { IconVerificado } from "@/components/EstadoIcon";
import {
  IconEnlaceExterno,
  IconGmail,
  IconRegistro,
  IconSello,
} from "@/components/IconosProcedencia";

type Props = {
  etiqueta: string;
  montoVerificadoCentavos: string;
  montoEsperadoCentavos: number;
  diaVencimientoMes: number;
  destinatarioUltimos4?: string;
  timestampPago?: string;
  txHash?: string | null;
  origen?: string | null;
  /** El pago llegó después del día acordado: se dice, sin que tape que sí está verificado. */
  conRetraso?: boolean;
  /** Se pagó menos de lo acordado. */
  parcial?: boolean;
};

export function ConstanciaVerificada({
  etiqueta,
  montoVerificadoCentavos,
  montoEsperadoCentavos,
  diaVencimientoMes,
  destinatarioUltimos4,
  timestampPago,
  txHash,
  origen,
  conRetraso,
  parcial,
}: Props) {
  const url = txHash ? urlDeRegistro(txHash) : null;

  return (
    <section className="mt-6" aria-label="Constancia del pago">
      <Veredicto
        etiqueta={etiqueta}
        montoVerificadoCentavos={montoVerificadoCentavos}
        parcial={parcial}
      />

      {(conRetraso || parcial) && (
        <Matiz
          conRetraso={conRetraso}
          parcial={parcial}
          diaVencimientoMes={diaVencimientoMes}
          montoEsperadoCentavos={montoEsperadoCentavos}
        />
      )}

      <p className="tabular mt-8 text-xs tracking-wide text-ink-muted">
        CÓMO SE COMPROBÓ
      </p>
      <ol className="lista-entrada mt-3 divide-y divide-grid-line overflow-hidden rounded border border-grid-line bg-panel">
        <Eslabon
          marca={
            origen === "gmail" ? (
              <IconGmail />
            ) : (
              <IconSello className="text-ink-muted" />
            )
          }
          titulo={
            origen === "gmail"
              ? "Se leyó el correo del BCP en tu Gmail"
              : "Se usó el correo original del BCP"
          }
          detalle={
            origen === "gmail"
              ? "Tal como el banco lo envió. No se abrió, ni se editó, ni se reenvió."
              : "El archivo original descargado del correo, sin modificar."
          }
        />
        <Eslabon
          marca={<IconSello className="text-signal-ink" />}
          titulo="La firma del banco coincidió"
          detalle={
            destinatarioUltimos4
              ? `El programa recalculó la firma digital que el BCP puso en ese correo y volvió a dar el mismo resultado. De ahí salió el monto y la cuenta terminada en ${destinatarioUltimos4} — no de un formulario.`
              : "El programa recalculó la firma digital que el BCP puso en ese correo y volvió a dar el mismo resultado. De ahí salió el monto — no de un formulario."
          }
        />
        <Eslabon
          marca={<IconRegistro className="text-signal-ink" />}
          titulo="Quedó anotado en un registro público"
          detalle="Fuera de este sitio, en un registro que no controlamos y que nadie puede editar después — tampoco nosotros."
          pie={
            url && txHash ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="tabular mt-2 inline-flex items-center gap-1.5 text-xs text-signal-ink underline underline-offset-4 transition-colors duration-[var(--dur-short)] hover:text-ink"
              >
                {abreviarHash(txHash)}
                <IconEnlaceExterno />
              </a>
            ) : txHash ? (
              <p className="tabular mt-2 text-xs break-all text-ink-muted">
                {txHash}
              </p>
            ) : null
          }
        />
      </ol>

      {timestampPago && timestampPago !== "0" && (
        <p className="tabular mt-3 text-xs text-ink-muted">
          Anotado el {fechaLegible(timestampPago)}
        </p>
      )}
    </section>
  );
}

/** El veredicto y la cifra. La cifra manda: es el dato que salió del banco. */
function Veredicto({
  etiqueta,
  montoVerificadoCentavos,
  parcial,
}: {
  etiqueta: string;
  montoVerificadoCentavos: string;
  parcial?: boolean;
}) {
  // El acento de señal se reserva para lo verificado en todo el producto. Un pago parcial
  // está verificado pero incompleto, así que conserva la marca y pierde el acento.
  const tinta = parcial ? "var(--amber)" : "var(--signal-ink)";

  return (
    <div
      className="flex flex-col items-center rounded border border-grid-line px-5 py-8 text-center"
      style={{
        background: parcial
          ? "var(--amber-bg)"
          : "color-mix(in srgb, var(--signal) 12%, var(--panel))",
      }}
    >
      <IconVerificado className="h-8 w-8" style={{ color: tinta }} />
      <p className="mt-3 text-lg font-semibold" style={{ color: tinta }}>
        {etiqueta}
      </p>
      <p
        className="tabular mt-4 text-3xl font-semibold"
        style={{ color: tinta }}
      >
        {formatearMonto(Number(montoVerificadoCentavos))}
      </p>
      <p className="mt-1 text-xs text-ink-muted">leído del correo del banco</p>
    </div>
  );
}

/**
 * El matiz va DEBAJO del veredicto y no encima: que haya llegado tarde o incompleto no pone en
 * duda que el pago existe, que es lo que esta pantalla tiene que dejar firme primero.
 */
function Matiz({
  conRetraso,
  parcial,
  diaVencimientoMes,
  montoEsperadoCentavos,
}: {
  conRetraso?: boolean;
  parcial?: boolean;
  diaVencimientoMes: number;
  montoEsperadoCentavos: number;
}) {
  return (
    <p className="mt-3 rounded border border-amber/20 bg-amber-bg px-3 py-2 text-sm leading-relaxed text-amber">
      {parcial
        ? `Es menos de lo acordado: faltan por cubrir hasta ${formatearMonto(montoEsperadoCentavos)}.`
        : `El pago se hizo después del día ${diaVencimientoMes}, el plazo acordado.`}
      {conRetraso && parcial
        ? ` Además llegó después del día ${diaVencimientoMes}.`
        : ""}
    </p>
  );
}

function Eslabon({
  marca,
  titulo,
  detalle,
  pie,
}: {
  marca: React.ReactNode;
  titulo: string;
  detalle: string;
  pie?: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 px-4 py-4">
      <span className="mt-0.5 shrink-0">{marca}</span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{titulo}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{detalle}</p>
        {pie}
      </div>
    </li>
  );
}

/** El sello de tiempo del registro público: cuándo quedó anotado, no cuándo se hizo el pago. */
function fechaLegible(timestampSegundos: string): string {
  const fecha = new Date(Number(timestampSegundos) * 1000);
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(fecha);
}
