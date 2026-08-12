import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __constanciaPool: Pool | undefined;
}

function getPool(): Pool {
  if (!global.__constanciaPool) {
    global.__constanciaPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
    });
  }
  return global.__constanciaPool;
}

export const db = drizzle(getPool(), { schema });
