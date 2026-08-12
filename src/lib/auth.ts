import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    Google({
      // gmail.readonly permite leer el correo del banco y bajarlo en crudo (format=RAW),
      // con la firma DKIM intacta, para que la verifique el CONTRATO. El servidor nunca
      // decide si hubo pago: solo elige qué correo intentar.
      // Es un scope restringido, pero en modo Testing funciona sin verificación ni CASA
      // (hasta 100 usuarios de prueba). Costo: el refresh_token caduca a los 7 días —
      // ver wayfinder/tickets/013-conexion-gmail-oauth.md.
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  session: { strategy: "database" },
  pages: { signIn: "/perfil" },
  callbacks: {
    // El adapter solo guarda el access/refresh_token la primera vez que se vincula la
    // cuenta de Google. En un reconecte (p.ej. porque el refresh_token de 7 días caducó
    // en modo Testing) Auth.js reutiliza la fila existente y NO la actualiza, así que
    // sin esto gmail.ts seguiría viendo el token viejo y pidiendo reconectar en bucle.
    async signIn({ account }) {
      if (account?.provider === "google") {
        await db
          .update(schema.accounts)
          .set({
            access_token: account.access_token,
            refresh_token: account.refresh_token ?? undefined,
            expires_at: account.expires_at,
            id_token: account.id_token,
            scope: account.scope,
            token_type: account.token_type,
          })
          .where(
            and(
              eq(schema.accounts.provider, "google"),
              eq(schema.accounts.providerAccountId, account.providerAccountId),
            ),
          );
      }
      return true;
    },
  },
});
