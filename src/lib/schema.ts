import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  bigint,
  smallint,
  numeric,
  unique,
  primaryKey,
  integer,
  customType,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const obligaciones = pgTable("obligaciones", {
  id: uuid("id").primaryKey().defaultRandom(),
  contractObligacionId: numeric("contract_obligacion_id"),
  destinatarioNombre: text("destinatario_nombre").notNull(),
  destinatarioUltimos4: text("destinatario_ultimos4").notNull(),
  destinatarioSalt: bytea("destinatario_salt").notNull(),
  montoEsperadoCentavos: bigint("monto_esperado_centavos", {
    mode: "number",
  }).notNull(),
  diaVencimientoMes: smallint("dia_vencimiento_mes").notNull(),
  tokenReceptora: text("token_receptora").notNull().unique(),
  tokenPagador: text("token_pagador").notNull().unique(),
  tokenConfirmacion: text("token_confirmacion").unique(),
  emailReceptora: text("email_receptora"),
  emailPagador: text("email_pagador"),
  confirmadaPorAmbas: boolean("confirmada_por_ambas").notNull().default(false),
  creadaEn: timestamp("creada_en", { withTimezone: true })
    .notNull()
    .defaultNow(),
  confirmadaEn: timestamp("confirmada_en", { withTimezone: true }),
});

export const comprobantes = pgTable(
  "comprobantes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    obligacionId: uuid("obligacion_id")
      .notNull()
      .references(() => obligaciones.id),
    anio: smallint("anio").notNull(),
    mes: smallint("mes").notNull(),
    emailHash: text("email_hash").notNull(),
    txHash: text("tx_hash"),
    // De dónde salió el .eml: "gmail" (lectura automática del buzón) o "manual" (la persona
    // subió el archivo). Sin default y nullable a propósito: las filas anteriores a esta
    // columna no lo registraron, y un default las etiquetaría con una procedencia inventada.
    // La pantalla de constancia solo afirma "salió de tu Gmail" cuando aquí dice gmail.
    origen: text("origen"),
    estado: text("estado").notNull().default("pendiente"),
    creadoEn: timestamp("creado_en", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [unique().on(t.obligacionId, t.anio, t.mes)],
);

// Tablas de Auth.js (login con Google) — ver wayfinder/tickets/012-cuentas-vs-gmail-oauth.md
// (reabierta): cuenta opcional además del acceso por enlace, no lo reemplaza.
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })],
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);
