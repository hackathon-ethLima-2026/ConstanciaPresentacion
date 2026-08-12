# Constancia — Certificación Criptográfica de Pensiones de Alimentos

> **Proyecto para ethLima 2026** | Track: **Arbitrum Stylus**

---

## 📌 0. El Problema y la Propuesta de Valor

### El Problema real
**El 5 de cada mes debía llegar la pensión. Es 19 y no llegó.**

La pensión que no llega no desaparece: **la termina pagando la madre** con horas extra, un segundo trabajo o ajustando las necesidades básicas del hogar. Y cuando llega el momento del reclamo:

> — *“No me pasaste la pensión de este mes.”*  
> — *“Sí te pasé.”*

Ahí empieza el verdadero problema: **no es que falte el dinero, es que no hay forma barata de saber quién dice la verdad.**

Probar un hecho negativo (que el dinero *no* fue transferido) exige un proceso legal completo con abogados, escritos y audiencias que **cuesta más que la pensión reclamada**. Por eso el 99% de las madres no denuncia, y el cumplimiento de los padres que sí pagan tampoco queda acreditado formalmente.

---

### La Solución: Constancia
**Constancia convierte el correo electrónico de confirmación que un banco ya envía automáticamente en una prueba criptográfica inmutable e indiscutible.**

```
1. SE REGISTRA EL ACUERDO   Una sola vez, ambas partes definen monto, día de pago y cuenta.
                             Se conecta el correo electrónico sin requerir wallet ni clave cripto.

2. SE PAGA COMO SIEMPRE      Vía BCP, Yape o transferencia bancaria habitual. Cero cambios de hábito.
                             El banco envía su correo de confirmación con firma digital DKIM.

3. SE PRUEBA AUTOMÁTICAMENTE El sistema recibe el comprobante (.eml), verifica la firma criptográfica 
                             DKIM del banco en Arbitrum Stylus y valida el pago on-chain.
                             Si el plazo vence sin registro, el incumplimiento queda asentado SOLO.
```

> **El Remate:**  
> *"El banco no se integró con nosotros ni sabe que existimos. Firma sus correos para protegerse de la suplantación, y nosotros reutilizamos esa firma criptográfica."*

---

## 🚀 1. Innovación Técnica y Arquitectura

### Smart Contract en Rust sobre Arbitrum Stylus (`contract/`)
- **Verificación DKIM On-Chain:** El contrato inteligente escrito en Rust aprovecha los precompilados de Stylus (`MODEXP` + `SHA256`) para validar la firma RSA/SHA-256 de las cabeceras del correo emitido por el banco.
- **Privacidad mediante Commitment con Salt:** Para evitar la adivinación por fuerza bruta de los números de cuenta bancarios (4 dígitos), el contrato almacena únicamente un *commitment* hash combinado con un *salt* secreto.
- **Inversión de la carga de la prueba:** Estado computable on-chain: *Verificado*, *Pendiente* o *Vencido sin registro*.

### Aplicación Web & Relayer (`web/`)
- **Next.js 15 (App Router, TypeScript) + Tailwind CSS v4:** Interfaz mobile-first, ultraligera, optimizada para conexiones 3G y dispositivos de gama baja.
- **Cero Jerga Web3:** Interfaz 100% libre de términos como *wallet*, *gas*, *hash* o *contrato*. Autenticación mediante enlaces mágicos (Magic Links) y Google OAuth.
- **Modelo de Gas mediante Relayer:** Una wallet de servicio (Relayer Node.js / ethers.js) asume y firma las transacciones on-chain. Los usuarios jamás pagan gas ni manejan claves privadas.
- **Base de Datos (Neon Postgres + Drizzle ORM):** Almacenamiento seguro fuera de cadena para los salts y metadatos en claro de los acuerdos.

---

## 📂 2. Estructura del Repositorio

```
ConstanciaPresentacion/
├── README.md               # Presentación del proyecto y guía principal
└── constancia/             # Código fuente completo de la aplicación
    ├── contract/           # Smart contract en Rust para Arbitrum Stylus
    │   ├── src/            # Lógica de verificación DKIM y estados
    │   ├── Cargo.toml      # Configuración del paquete Rust
    │   └── DEPLOY.md       # Guía de despliegue en Arbitrum Sepolia
    ├── web/                # Aplicación Web Next.js + Drizzle ORM + UI
    │   ├── src/            # Rutas, componentes y relayer
    │   └── package.json    # Dependencias de Node.js
    ├── wayfinder/          # Historial de decisiones técnicas y tickets
    ├── PRODUCT.md          # Especificaciones de producto y personas UX
    ├── PLAN.md             # Estado del proyecto y roadmap
    └── constancia-lean-ux.md # Documento base de producto y Lean UX
```

---

## 🛠️ 3. Ejecución Local y Despliegue

### Requisitos Previos
- **Node.js** v18+ y `pnpm` o `npm`
- **Rust** y `cargo-stylus` (para compilar/desplegar el contrato en Linux/macOS/WSL)

### 1. Ejecutar el Frontend (`web/`)
```bash
cd constancia/web
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 2. Desplegar el Contrato Stylus (`contract/`)
Ver las instrucciones detalladas en [`constancia/contract/DEPLOY.md`](constancia/contract/DEPLOY.md):
```bash
cd constancia/contract
cargo stylus check
cargo stylus deploy --private-key <TU_CLAVE_PRIVADA_RELAYER>
```

---

## 🏆 4. Hackathon ethLima 2026

Desarrollado para el **Track Arbitrum Stylus** en la **ethLima 2026**.

- **Repositorio de Presentación:** [hackathon-ethLima-2026/ConstanciaPresentacion](https://github.com/hackathon-ethLima-2026/ConstanciaPresentacion)
- **Repositorio de Código:** [hackathon-ethLima-2026/constancia](https://github.com/hackathon-ethLima-2026/constancia)
