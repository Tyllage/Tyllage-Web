import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Makes `vite preview` serve prerendered pages the way CloudFront does in
 * production (see infra/cloudfront-url-rewrite.js): /about → /about/index.html,
 * and unknown routes → 404.html. Without this, preview falls back to the home
 * page's HTML for every route, which breaks hydration.
 */
function prerenderedPreview(): Plugin {
  return {
    name: 'tyllage-prerendered-preview',
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const [pathname, query = ''] = (req.url ?? '/').split('?');
        if (path.extname(pathname)) return next();

        const rel = pathname.replace(/\/+$/, '');
        const candidate = path.join(outDir, rel, 'index.html');
        if (existsSync(candidate)) {
          req.url = `${rel}/index.html${query ? `?${query}` : ''}`;
        } else {
          res.statusCode = 404;
          req.url = '/404.html';
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderedPreview()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: false,
  },
});
