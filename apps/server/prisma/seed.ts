import { PrismaClient } from '@prisma/client';
import * as argon from "argon2"

const prisma = new PrismaClient();

async function main() {
  const hash = await argon.hash("12345678")
  await prisma.user.createMany({
    data: [
      {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario@example.com',
        hashPW: hash,
        ruolo: 'UTENTE',
        hashRT: "",
      },
      {
        nome: 'Luigi',
        cognome: 'Verdi',
        email: 'luigi@example.com',
        hashPW: hash,
        ruolo: 'MANAGER',
        hashRT: "",
      },
      {
        nome: 'Admin',
        cognome: 'Admin',
        email: 'admin@example.com',
        hashPW: hash,
        ruolo: 'ADMIN',
        hashRT: "",
      },
    ],
  });

  console.log('Seed completato!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });