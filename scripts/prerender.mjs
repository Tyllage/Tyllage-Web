/**
 * Prerenders every public route to static HTML after `vite build`.
 *
 * Output layout (served by S3 + CloudFront, see infra/cloudfront-url-rewrite.js):
 *   dist/index.html            → /
 *   dist/about/index.html      → /about
 *   dist/404.html              → CloudFront custom error response for 404s
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { render, renderHead, routes } = await import(pathToFileURL(ssrEntry).href);

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

await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${count} pages.`);
