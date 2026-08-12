import { test } from "node:test";
import assert from "node:assert/strict";
import { acuerdosParaEmail } from "./perfil.ts";

test("incluye un acuerdo donde el email es la receptora, con rol y token de receptora", () => {
  const resultado = acuerdosParaEmail("ana@example.com", [
    {
      id: "1",
      destinatarioNombre: "Ana",
      montoEsperadoCentavos: 50000,
      emailReceptora: "ana@example.com",
      emailPagador: "luis@example.com",
      tokenReceptora: "tok-receptora",
      tokenPagador: "tok-pagador",
    },
  ]);

  assert.deepEqual(resultado, [
    {
      id: "1",
      destinatarioNombre: "Ana",
      montoEsperadoCentavos: 50000,
      rol: "Receptora",
      token: "tok-receptora",
    },
  ]);
});

test("incluye un acuerdo donde el email es el pagador, con rol y token de pagador", () => {
  const resultado = acuerdosParaEmail("luis@example.com", [
    {
      id: "1",
      destinatarioNombre: "Ana",
      montoEsperadoCentavos: 50000,
      emailReceptora: "ana@example.com",
      emailPagador: "luis@example.com",
      tokenReceptora: "tok-receptora",
      tokenPagador: "tok-pagador",
    },
  ]);

  assert.deepEqual(resultado, [
    {
      id: "1",
      destinatarioNombre: "Ana",
      montoEsperadoCentavos: 50000,
      rol: "Pagador",
      token: "tok-pagador",
    },
  ]);
});

test("excluye un acuerdo donde el email no coincide con receptora ni pagador", () => {
  const resultado = acuerdosParaEmail("otro@example.com", [
    {
      id: "1",
      destinatarioNombre: "Ana",
      montoEsperadoCentavos: 50000,
      emailReceptora: "ana@example.com",
      emailPagador: "luis@example.com",
      tokenReceptora: "tok-receptora",
      tokenPagador: "tok-pagador",
    },
  ]);

  assert.deepEqual(resultado, []);
});
