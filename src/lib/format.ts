export function formatearMonto(centavos: number | bigint): string {
  const c = typeof centavos === "bigint" ? centavos : BigInt(Math.round(centavos));
  const negativo = c < 0n;
  const abs = negativo ? -c : c;
  const soles = abs / 100n;
  const resto = (abs % 100n).toString().padStart(2, "0");
  return `${negativo ? "-" : ""}S/ ${soles}.${resto}`;
}

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function nombreMes(mes: number): string {
  return MESES[mes - 1] ?? String(mes);
}
