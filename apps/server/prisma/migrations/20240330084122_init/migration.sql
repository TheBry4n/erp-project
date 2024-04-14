-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'CAPO', 'DIPENDENTE');

-- CreateTable
CREATE TABLE "Personale" (
    "idPersonale" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashPass" TEXT NOT NULL,
    "hashRt" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DIPENDENTE',
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "dataAssunzione" TIMESTAMP(3) NOT NULL,
    "dataNascita" TIMESTAMP(3) NOT NULL,
    "idResponsabile" TEXT,
    "idTurno" TEXT,

    CONSTRAINT "Personale_pkey" PRIMARY KEY ("idPersonale")
);

-- CreateTable
CREATE TABLE "Candidati" (
    "idCandidato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "dataNascita" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidati_pkey" PRIMARY KEY ("idCandidato")
);

-- CreateTable
CREATE TABLE "Turno" (
    "idTurno" TEXT NOT NULL,
    "nomeTurno" TEXT NOT NULL,
    "ore" INTEGER NOT NULL DEFAULT 8,
    "pagaOraria" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Turno_pkey" PRIMARY KEY ("idTurno")
);

-- CreateTable
CREATE TABLE "Negozio" (
    "idNegozio" TEXT NOT NULL,
    "indirizzo" TEXT NOT NULL,
    "idResponsabile" TEXT,

    CONSTRAINT "Negozio_pkey" PRIMARY KEY ("idNegozio")
);

-- CreateTable
CREATE TABLE "Scarpe" (
    "idScarpa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modello" TEXT NOT NULL,

    CONSTRAINT "Scarpe_pkey" PRIMARY KEY ("idScarpa")
);

-- CreateTable
CREATE TABLE "ScarpeNegozio" (
    "idNegozio" TEXT NOT NULL,
    "idScarpa" TEXT NOT NULL,

    CONSTRAINT "ScarpeNegozio_pkey" PRIMARY KEY ("idNegozio","idScarpa")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personale_email_key" ON "Personale"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidati_email_key" ON "Candidati"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Turno_nomeTurno_key" ON "Turno"("nomeTurno");

-- CreateIndex
CREATE UNIQUE INDEX "Negozio_indirizzo_key" ON "Negozio"("indirizzo");

-- CreateIndex
CREATE UNIQUE INDEX "Scarpe_marca_modello_key" ON "Scarpe"("marca", "modello");

-- AddForeignKey
ALTER TABLE "Personale" ADD CONSTRAINT "Personale_idResponsabile_fkey" FOREIGN KEY ("idResponsabile") REFERENCES "Personale"("idPersonale") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personale" ADD CONSTRAINT "Personale_idTurno_fkey" FOREIGN KEY ("idTurno") REFERENCES "Turno"("idTurno") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negozio" ADD CONSTRAINT "Negozio_idResponsabile_fkey" FOREIGN KEY ("idResponsabile") REFERENCES "Personale"("idPersonale") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScarpeNegozio" ADD CONSTRAINT "ScarpeNegozio_idNegozio_fkey" FOREIGN KEY ("idNegozio") REFERENCES "Negozio"("idNegozio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScarpeNegozio" ADD CONSTRAINT "ScarpeNegozio_idScarpa_fkey" FOREIGN KEY ("idScarpa") REFERENCES "Scarpe"("idScarpa") ON DELETE RESTRICT ON UPDATE CASCADE;
