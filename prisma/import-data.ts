import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const FILE = path.join(process.cwd(), "prisma", "data", "db-export.json");

const TABLES: Record<string, string> = {
  user: '"User"',
  contacto: '"Contacto"',
  evento: '"Evento"',
  oportunidad: '"Oportunidad"',
  blogPost: '"BlogPost"',
  stat: '"Stat"',
  feature: '"Feature"',
  ods: '"Ods"',
  teamMember: '"TeamMember"',
};

type Rows = Record<string, unknown>[];

type Db = {
  deleteMany: () => Promise<unknown>;
  createMany: (args: { data: Rows }) => Promise<unknown>;
};

function table(db: unknown, name: string): Db {
  return (db as Record<string, Db>)[name];
}

async function fixSequence(tx: unknown, model: string) {
  const tableName = TABLES[model];

  await (
    tx as { $executeRawUnsafe: (query: string) => Promise<unknown> }
  ).$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), COALESCE((SELECT MAX("id") FROM ${tableName}), 1), (SELECT COUNT(*) > 0 FROM ${tableName}))`,
  );
}

async function main() {
  if (!existsSync(FILE)) {
    throw new Error(`No existe el archivo de datos: ${FILE}`);
  }

  const data = JSON.parse(readFileSync(FILE, "utf8")) as Record<string, Rows>;

  const missing = Object.keys(TABLES).filter((key) => !(key in data));
  if (missing.length > 0) {
    throw new Error(`El JSON no contiene los modelos: ${missing.join(", ")}`);
  }

  console.log("Importando desde", FILE);

  await prisma.$transaction(
    async (tx) => {
      for (const model of Object.keys(TABLES)) {
        await table(tx, model).deleteMany();
        console.log(`  ${model}: datos limpiados`);
      }

      for (const model of Object.keys(TABLES)) {
        const rows = data[model] ?? [];

        if (rows.length > 0) {
          await table(tx, model).createMany({ data: rows });
        }

        await fixSequence(tx, model);
        console.log(`  ${model}: ${rows.length} filas importadas`);
      }
    },
    { timeout: 60_000, maxWait: 10_000 },
  );

  console.log("Import completado");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
