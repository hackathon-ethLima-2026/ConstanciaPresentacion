import { Contract, JsonRpcProvider, Wallet } from "ethers";

// Selectores en camelCase: stylus-sdk convierte snake_case -> camelCase para el ABI on-chain
// (confirmado leyendo stylus-proc, "onchain method selectors default to camelCase").
const CONSTANCIA_ABI = [
  "function registrarObligacion(bytes32 destinatarioCommitment, uint256 montoEsperadoCentavos, uint8 diaVencimientoMes) returns (uint256)",
  "function enviarPruebaDePago(uint256 obligacionId, bytes emlCrudo, bytes32 salt)",
  "function finalizarPeriodo(uint256 obligacionId, uint16 anio, uint8 mes)",
  "function registrarCumplidoPorAcuerdo(uint256 obligacionId, uint16 anio, uint8 mes)",
  "function obtenerPeriodo(uint256 obligacionId, uint16 anio, uint8 mes) view returns (uint8 estado, uint256 montoVerificadoCentavos, uint64 timestampPago)",
  "function obtenerObligacion(uint256 obligacionId) view returns (bytes32 destinatarioCommitment, uint256 montoEsperadoCentavos, uint8 diaVencimientoMes, uint8 estado, uint64 creadaEn)",
  "error ObligacionNoExiste()",
  "error ObligacionCerrada()",
  "error DkimInvalido()",
  "error CamposNoLegibles()",
  "error CorreoYaUsado()",
  "error DestinatarioNoCoincide()",
] as const;

// Estados de Periodo — deben coincidir exactamente con contract/src/lib.rs
export const PERIODO_ESTADO = {
  PENDIENTE: 0,
  CUMPLIDO: 1,
  CUMPLIDO_CON_RETRASO: 2,
  VENCIDO: 3,
  PARCIAL: 4,
  CUMPLIDO_POR_ACUERDO: 5,
} as const;

export function contratoConfigurado(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CONSTANCIA_CONTRACT_ADDRESS &&
    process.env.RELAYER_PRIVATE_KEY,
  );
}

function getProvider(): JsonRpcProvider {
  const rpcUrl = process.env.NEXT_PUBLIC_CHAIN_RPC_URL;
  if (!rpcUrl) throw new Error("Falta NEXT_PUBLIC_CHAIN_RPC_URL");
  return new JsonRpcProvider(rpcUrl);
}

/** Contrato de solo lectura (sin firmar transacciones). */
export function getContratoLectura(): Contract {
  const address = process.env.NEXT_PUBLIC_CONSTANCIA_CONTRACT_ADDRESS;
  if (!address)
    throw new Error("Falta NEXT_PUBLIC_CONSTANCIA_CONTRACT_ADDRESS");
  return new Contract(address, CONSTANCIA_ABI, getProvider());
}

/**
 * Contrato conectado a la wallet de servicio (relayer) — la única que firma y paga el gas de
 * todo el sistema, ver wayfinder/tickets/007-decision-gas-signing-model.md. Nunca exponer
 * RELAYER_PRIVATE_KEY al cliente: esta función solo se debe llamar desde código de servidor
 * (route handlers de app/api), nunca desde un componente cliente.
 */
export function getContratoRelayer(): Contract {
  const address = process.env.NEXT_PUBLIC_CONSTANCIA_CONTRACT_ADDRESS;
  const privateKey = process.env.RELAYER_PRIVATE_KEY;
  if (!address)
    throw new Error("Falta NEXT_PUBLIC_CONSTANCIA_CONTRACT_ADDRESS");
  if (!privateKey) throw new Error("Falta RELAYER_PRIVATE_KEY");
  const wallet = new Wallet(privateKey, getProvider());
  return new Contract(address, CONSTANCIA_ABI, wallet);
}
