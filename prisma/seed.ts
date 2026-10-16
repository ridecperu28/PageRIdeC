import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);


  // ── Usuarios ──
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@ridec.com",
    },
    update: {
      password: adminPassword,
      role: Role.ADMIN,
    },
    create: {
      name: "Administrador",
      email: "admin@ridec.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.upsert({
    where: {
      email: "user@ridec.com",
    },
    update: {
      password: userPassword,
      role: Role.USER,
    },
    create: {
      name: "Usuario",
      email: "user@ridec.com",
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log("Seed completado exitosamente");
  console.log("Admin creado:", admin.email);
  console.log("User creado:", user.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
