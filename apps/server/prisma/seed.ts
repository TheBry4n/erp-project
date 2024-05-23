import { PrismaClient } from '@prisma/client';
import * as argon from "argon2"
import { readFileSync } from 'fs';
import * as path from "path"

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


  const imagesPath = [
    "/images/immagine1.jpg",
    "/images/immagine2.jpg",
    "/images/immagine3.png",
    "/images/immagine4.png",
    "/images/immagine5.png",
    "/images/immagine6.png",
  ]

  //console.log(imagesPath.map(img => path.join(__dirname, img)))
  const imagesBytes = imagesPath.map(img => readFileSync(path.join(__dirname, img)))

  await prisma.scarpe.createMany({
    data: [
      {
        marca: 'Nike',
        modello: 'Air Max 2024',
        prezzoUnitario: 120.50,
        immagine: imagesBytes[0],
        descrizione: 'Scarpe sportive comode e alla moda.',
      },
      {
        marca: 'Nike',
        modello: 'Air Max 2020',
        prezzoUnitario: 150,
        immagine: imagesBytes[1],
        descrizione: 'Scarpe sportive comode e alla moda.',
      },
      {
        marca: 'Nike',
        modello: 'Jordan max',
        prezzoUnitario: 160.45,
        immagine: imagesBytes[3],
        descrizione: 'Scarpe sportive comode e alla moda.',
      },
      {
        marca: 'Nike',
        modello: 'Air white 2022',
        prezzoUnitario: 120.50,
        immagine: imagesBytes[4],
        descrizione: 'Scarpe sportive comode e alla moda.',
      },
      {
        marca: 'Nike',
        modello: 'Air Max 2023',
        prezzoUnitario: 120.50,
        immagine: imagesBytes[5],
        descrizione: 'Scarpe sportive comode e alla moda.',
      }
    ]
  })

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