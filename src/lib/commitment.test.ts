import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularCommitment } from "./commitment.ts";

const SALT = `0x${"07".repeat(32)}`;

/**
 * Vector compartido con el test `coincide_con_la_implementacion_de_typescript` del contrato
 * (contract/src/lib.rs). Si este valor cambia, hay que cambiarlo en los dos lados a la vez y
 * redesplegar: las obligaciones ya registradas quedan con el commitment viejo.
 */
test("el commitment coincide con el vector del contrato Stylus", () => {
  assert.equal(
    calcularCommitment("8200", SALT),
    "0xab552b8afc31fb2b1dd941b089a73e572e7415d38d0da6f035d862a51f9a73ba",
  );
});

test("cuentas distintas dan commitments distintos", () => {
  assert.notEqual(
    calcularCommitment("8200", SALT),
    calcularCommitment("8201", SALT),
  );
});

/**
 * Sin salt los 10,000 valores posibles se tabulan al instante. Dos acuerdos hacia la misma
 * cuenta tampoco deben verse iguales on-chain.
 */
test("el salt separa dos acuerdos hacia la misma cuenta", () => {
  assert.notEqual(
    calcularCommitment("8200", SALT),
    calcularCommitment("8200", `0x${"09".repeat(32)}`),
  );
});
