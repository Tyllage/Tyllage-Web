/**
 * Generates web-sized derivatives of the official logo (public/logo/2.png).
 * The original file is never modified. Run with `npm run brand-assets`
 * after replacing the logo.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public', 'logo', '2.png');
const out = (name) => path.join(root, 'public', 'logo', name);

const jobs = [
  // Header / footer mark (rendered at 40–48px; 2× and 3× for high-DPI screens).
  ...[96, 144].map((size) => ({ size, file: `tyllage-logo-${size}.webp`, format: 'webp' })),
  { size: 144, file: 'tyllage-logo-144.png', format: 'png' },
  // Favicons and home-screen icon.
  { size: 32, file: 'favicon-32.png', format: 'png' },
  { size: 48, file: 'favicon-48.png', format: 'png' },
  { size: 180, file: 'apple-touch-icon.png', format: 'png', background: '#F7F8F3', padding: 14 },
  { size: 512, file: 'tyllage-logo-512.png', format: 'png' },
];

for (const { size, file, format, background, padding = 0 } of jobs) {
  const inner = size - padding * 2;
  let img = sharp(source).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (background) {
    img = sharp({ create: { width: size, height: size, channels: 4, background } }).composite([
      { input: await img.png().toBuffer(), top: padding, left: padding },
    ]);
  }
  await (format === 'webp' ? img.webp({ quality: 90 }) : img.png({ compressionLevel: 9 })).toFile(out(file));
  console.log(`Wrote public/logo/${file}`);
}
