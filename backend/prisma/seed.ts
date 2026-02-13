import 'dotenv/config';
import prisma from '../src/lib/prisma';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import sharp from 'sharp'; // for reading image dimensions

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
  const assetsDir = path.join(__dirname, '../src/assets');

  const files = fs.readdirSync(assetsDir).filter(f =>
    /\.(png|jpg|jpeg)$/i.test(f)
  );

  for (const filename of files) {
    const filepath = path.join(assetsDir, filename);

    // Read dimensions using sharp
    const { width, height } = await sharp(filepath).metadata();

    const image = await prisma.image.upsert({
      where: { name: filename },
      update: {},
      create: {
        name: filename,
        width: width ?? 0,
        height: height ?? 0,
        url: `/assets/${filename}`,
      },
    });

    console.log(`Seeded image: ${filename} (id=${image.id})`);
  }
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
