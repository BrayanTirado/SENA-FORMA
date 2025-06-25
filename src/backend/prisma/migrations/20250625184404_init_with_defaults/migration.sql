/*
  Warnings:

  - Made the column `titulo_profesional` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experiencia_anios` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "titulo_profesional" SET NOT NULL,
ALTER COLUMN "titulo_profesional" SET DEFAULT 'No aplica',
ALTER COLUMN "experiencia_anios" SET NOT NULL,
ALTER COLUMN "experiencia_anios" SET DEFAULT 0;
