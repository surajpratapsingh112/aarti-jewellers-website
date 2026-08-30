import { Pool } from "pg";

// Vercel's Neon (or any Postgres) integration usually sets DATABASE_URL or
// POSTGRES_URL automatically once you add the storage from the Vercel
// dashboard - this supports either name so you don't have to rename anything.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pool;
function getPool() {
  if (!connectionString) {
    throw new Error(
      "No database connection string found. Add a Postgres/Neon storage to this project in Vercel " +
        "(Storage tab) - it sets DATABASE_URL or POSTGRES_URL automatically."
    );
  }
  if (!pool) {
    pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

let tableReady = false;
export async function ensureTable() {
  if (tableReady) return;
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      review_text TEXT NOT NULL,
      rating INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      approve_token TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      featured BOOLEAN NOT NULL DEFAULT false,
      featured_at TIMESTAMPTZ
    );
  `);
  // Safe to run every time - adds the columns only if an older table exists without them.
  await p.query(`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;`);
  await p.query(`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS featured_at TIMESTAMPTZ;`);
  tableReady = true;
}

export async function query(text, params) {
  const p = getPool();
  return p.query(text, params);
}
