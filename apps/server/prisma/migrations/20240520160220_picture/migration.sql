/*
  Warnings:

  - Added the required column `descrizione` to the `Scarpe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `immagine` to the `Scarpe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scarpe" ADD COLUMN     "descrizione" TEXT NOT NULL,
ADD COLUMN     "immagine" BYTEA NOT NULL;
