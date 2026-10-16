import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const MODELS = [
  "user",
  "contacto",
  "evento",
  "oportunidad",
  "blogPost",
  "stat",
  "feature",
  "ods",
  "teamMember",
] as const;

type Delegate = {
  findMany: (args: {
    orderBy: { id: "asc" };
  }) => Promise<Record<string, unknown>[]>;
};

function delegate(name: string): Delegate {
  return (prisma as unknown as Record<string, Delegate>)[name];
}

async function main() {
  const data: Record<string, Record<string, unknown>[]> = {};

  for (const model of MODELS) {
    data[model] = await delegate(model).findMany({ orderBy: { id: "asc" } });
  }

  const dir = path.join(process.cwd(), "prisma", "data");
  mkdirSync(dir, { recursive: true });

  const file = path.join(dir, "db-export.json");
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  console.log("Export completado →", file);
  for (const model of MODELS) {
    console.log(`  ${model}: ${data[model].length} filas`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
