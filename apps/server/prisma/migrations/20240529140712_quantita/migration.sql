/*
  Warnings:

  - Added the required column `quantita` to the `Scarpe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scarpe" ADD COLUMN     "quantita" INTEGER NOT NULL;
