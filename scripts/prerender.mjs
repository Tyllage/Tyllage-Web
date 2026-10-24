/**
 * Prerenders every public route to static HTML after `vite build`.
 *
 * Output layout (served by S3 + CloudFront, see infra/cloudfront-url-rewrite.js):
 *   dist/index.html            → /
 *   dist/about/index.html      → /about
 *   dist/404.html              → CloudFront custom error response for 404s
 *   dist/sitemap.xml, robots.txt → generated for the configured domain
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { render, renderHead, renderScenes, routes, siteUrl } = await import(pathToFileURL(ssrEntry).href);

const HEAD_BLOCK = /<!--head:start-->[\s\S]*?<!--head:end-->/;
const APP_SLOT = '<!--app-html-->';

if (!HEAD_BLOCK.test(template) || !template.includes(APP_SLOT)) {
  throw new Error('dist/index.html is missing the <!--head:start/end--> block or <!--app-html--> slot.');
}

let count = 0;
for (const route of routes) {
  const appHtml = render(route.path);
  const html = template.replace(HEAD_BLOCK, renderHead(route)).replace(APP_SLOT, appHtml);

  const outFile =
    route.path === '/404'
      ? path.join(dist, '404.html')
      : path.join(dist, route.path === '/' ? '' : route.path.slice(1), 'index.html');

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html, 'utf8');
  count += 1;
  console.log(`  prerendered ${route.path.padEnd(12)} → ${path.relative(root, outFile)}`);
}

// Illustrated scenes become cacheable static images instead of inline page markup.
const scenesDir = path.join(dist, 'images', 'scenes');
await mkdir(scenesDir, { recursive: true });
for (const [name, svg] of Object.entries(renderScenes())) {
  await writeFile(path.join(scenesDir, `${name}.svg`), svg, 'utf8');
}
console.log(`  wrote ${Object.keys(renderScenes()).length} scene images to dist/images/scenes/`);

// robots.txt and sitemap.xml use the configured production domain (VITE_SITE_URL).
const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .filter((r) => !r.noindex)
  .map((r) => `  <url>\n    <loc>${siteUrl}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n');
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8',
);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
console.log(`  wrote sitemap.xml and robots.txt for ${siteUrl}`);

await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${count} pages.`);
