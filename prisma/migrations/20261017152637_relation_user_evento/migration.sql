/*
  Warnings:

  - Added the required column `creatorId` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- 1. Agregar la columna permitiendo valores NULL temporalmente
ALTER TABLE "Evento"
ADD COLUMN "creatorId" INTEGER;

-- 2. Asignar un creador a los eventos existentes
UPDATE "Evento"
SET "creatorId" = 2
WHERE "creatorId" IS NULL;

-- 3. Hacer que el campo sea obligatorio
ALTER TABLE "Evento"
ALTER COLUMN "creatorId" SET NOT NULL;

-- 4. Crear la relación con User
ALTER TABLE "Evento"
ADD CONSTRAINT "Evento_creatorId_fkey"
FOREIGN KEY ("creatorId")
REFERENCES "User"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;