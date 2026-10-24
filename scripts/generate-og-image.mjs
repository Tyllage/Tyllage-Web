/**
 * Renders src/assets/og-image.svg to public/images/og-image.png (1200×630).
 * Social platforms do not accept SVG Open Graph images, so a PNG is committed.
 * Run with `npm run og-image` after editing the SVG.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'src', 'assets', 'og-image.svg');
const output = path.join(root, 'public', 'images', 'og-image.png');

await sharp(input, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(output);
console.log(`Wrote ${path.relative(root, output)}`);
