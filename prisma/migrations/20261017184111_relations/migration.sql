/*
  Warnings:

  - Added the required column `creatorId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Oportunidad` table without a default value. This is not possible if the table is not empty.

*/
-- BlogPost: agregar la columna temporalmente nullable
ALTER TABLE "BlogPost"
ADD COLUMN "creatorId" INTEGER;

-- Oportunidad: agregar la columna temporalmente nullable
ALTER TABLE "Oportunidad"
ADD COLUMN "creatorId" INTEGER;

-- Asignar los registros existentes a un usuario real.
-- Reemplaza 4 por el ID de un usuario existente en tu tabla User.
UPDATE "BlogPost"
SET "creatorId" = 2
WHERE "creatorId" IS NULL;

UPDATE "Oportunidad"
SET "creatorId" = 2
WHERE "creatorId" IS NULL;

-- Hacer obligatoria la relación
ALTER TABLE "BlogPost"
ALTER COLUMN "creatorId" SET NOT NULL;

ALTER TABLE "Oportunidad"
ALTER COLUMN "creatorId" SET NOT NULL;

-- Crear las claves foráneas
ALTER TABLE "BlogPost"
ADD CONSTRAINT "BlogPost_creatorId_fkey"
FOREIGN KEY ("creatorId")
REFERENCES "User"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE "Oportunidad"
ADD CONSTRAINT "Oportunidad_creatorId_fkey"
FOREIGN KEY ("creatorId")
REFERENCES "User"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;