/**
 * Renders src/assets/og-image.svg to public/images/og-image.png (1200×630)
 * and places the official logo (public/logo/2.png) on the ivory disc.
 * Social platforms do not accept SVG Open Graph images, so a PNG is committed.
 * Run with `npm run og-image` after editing the SVG or replacing the logo.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'src', 'assets', 'og-image.svg');
const logo = path.join(root, 'public', 'logo', '2.png');
const output = path.join(root, 'public', 'images', 'og-image.png');

const LOGO_SIZE = 80;
const logoBuffer = await sharp(logo).resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

await sharp(input, { density: 144 })
  .resize(1200, 630)
  .composite([{ input: logoBuffer, left: 141 - LOGO_SIZE / 2, top: 141 - LOGO_SIZE / 2 }])
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(`Wrote ${path.relative(root, output)}`);
