-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'UTENTE', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashPW" TEXT NOT NULL,
    "hashRT" TEXT NOT NULL,
    "ruolo" "Role" NOT NULL DEFAULT 'UTENTE',
    "creazioneAccount" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAccount" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Indirizzo" (
    "indirizzoId" TEXT NOT NULL,
    "via" TEXT NOT NULL,
    "civico" TEXT NOT NULL,
    "citta" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updateIndirizzo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Indirizzo_pkey" PRIMARY KEY ("indirizzoId")
);

-- CreateTable
CREATE TABLE "Candidati" (
    "CandidatoId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Candidati_pkey" PRIMARY KEY ("CandidatoId")
);

-- CreateTable
CREATE TABLE "Scarpe" (
    "scarpaId" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modello" TEXT NOT NULL,
    "prezzoUnitario" DOUBLE PRECISION NOT NULL,
    "updateScarpa" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scarpe_pkey" PRIMARY KEY ("scarpaId")
);

-- CreateTable
CREATE TABLE "Ordine" (
    "ordineId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "indirizzoId" TEXT NOT NULL,
    "prezzoTotale" DOUBLE PRECISION NOT NULL,
    "dataConsegna" TIMESTAMP(3) NOT NULL,
    "consegnato" BOOLEAN NOT NULL DEFAULT false,
    "dataOrdine" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ordine_pkey" PRIMARY KEY ("ordineId")
);

-- CreateTable
CREATE TABLE "_scarpaOrdine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidati_email_key" ON "Candidati"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Scarpe_marca_modello_key" ON "Scarpe"("marca", "modello");

-- CreateIndex
CREATE UNIQUE INDEX "_scarpaOrdine_AB_unique" ON "_scarpaOrdine"("A", "B");

-- CreateIndex
CREATE INDEX "_scarpaOrdine_B_index" ON "_scarpaOrdine"("B");

-- AddForeignKey
ALTER TABLE "Indirizzo" ADD CONSTRAINT "Indirizzo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordine" ADD CONSTRAINT "Ordine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordine" ADD CONSTRAINT "Ordine_indirizzoId_fkey" FOREIGN KEY ("indirizzoId") REFERENCES "Indirizzo"("indirizzoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_scarpaOrdine" ADD CONSTRAINT "_scarpaOrdine_A_fkey" FOREIGN KEY ("A") REFERENCES "Ordine"("ordineId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_scarpaOrdine" ADD CONSTRAINT "_scarpaOrdine_B_fkey" FOREIGN KEY ("B") REFERENCES "Scarpe"("scarpaId") ON DELETE CASCADE ON UPDATE CASCADE;
