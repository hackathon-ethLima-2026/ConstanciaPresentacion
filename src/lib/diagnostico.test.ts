import { test } from "node:test";
import assert from "node:assert/strict";
import { rechazoDominante, resumirRechazos } from "./diagnostico.ts";

/**
 * El caso que motivó todo esto: nueve transferencias a otra cuenta y un boletín del banco al
 * final. La versión anterior mostraba el motivo del último correo — "no pudimos leer sus
 * datos" — y mandaba a depurar la plantilla cuando el desajuste estaba en la cuenta.
 */
test("un solo DestinatarioNoCoincide le gana a nueve CamposNoLegibles", () => {
  const conteo = { DestinatarioNoCoincide: 1, CamposNoLegibles: 9 };
  assert.equal(rechazoDominante(conteo), "DestinatarioNoCoincide");

  const mensaje = resumirRechazos(conteo, 10, "8200");
  assert.match(mensaje, /8200/);
  assert.match(mensaje, /1 era una transferencia/);
});

test("cuenta las transferencias encontradas, no el total revisado", () => {
  const mensaje = resumirRechazos(
    { DestinatarioNoCoincide: 3, CamposNoLegibles: 7 },
    10,
    "8200",
  );
  assert.match(mensaje, /10 correos/);
  assert.match(mensaje, /3 eran transferencias/);
});

test("sin ninguna transferencia, explica que no son constancias", () => {
  const mensaje = resumirRechazos({ CamposNoLegibles: 4 }, 4, "8200");
  assert.match(mensaje, /ninguno es una constancia de transferencia/);
  assert.doesNotMatch(mensaje, /8200/);
});

test("un comprobante ya registrado se explica primero que nada", () => {
  const conteo = {
    CorreoYaUsado: 1,
    DestinatarioNoCoincide: 2,
    CamposNoLegibles: 5,
  };
  assert.equal(rechazoDominante(conteo), "CorreoYaUsado");
  assert.match(resumirRechazos(conteo, 8, "8200"), /ya estaba registrado/);
});

test("singular y plural no se mezclan", () => {
  assert.match(
    resumirRechazos({ CamposNoLegibles: 1 }, 1, "8200"),
    /1 correo del BCP/,
  );
  assert.match(
    resumirRechazos({ CamposNoLegibles: 2 }, 2, "8200"),
    /2 correos del BCP/,
  );
});

/** Sin rechazos conocidos no se inventa una causa: mensaje neutro, pero con el conteo real. */
test("un conteo vacío no rompe el resumen", () => {
  assert.equal(rechazoDominante({}), null);
  assert.match(resumirRechazos({}, 3, "8200"), /3 correos del BCP/);
});
