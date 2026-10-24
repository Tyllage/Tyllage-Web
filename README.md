# Tyllage — Corporate Website

The public corporate website for **Tyllage LLP**, a Singapore-registered AgriTech software venture.
*From Harvest to Demand.*

This site describes the company, its farm-intelligence platform, its project workstreams and how to
partner with Tyllage. It is **not** an e-commerce storefront, and it is completely separate from the
Tyllage farm-operations software.

- **Stack:** React 18, TypeScript, Vite, React Router, Lucide React, plain CSS
- **Rendering:** every route is prerendered to static HTML at build time, then hydrated
- **Hosting:** Amazon S3 + CloudFront (HTTPS, custom domain), deployed by GitHub Actions
- **Backend:** none. The contact form can be connected to an API later (see below).

---

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload (client-side rendering only). |
| `npm run lint` | ESLint, including React Hooks and `jsx-a11y` accessibility rules. |
| `npm run typecheck` | TypeScript project check. |
| `npm run build` | Typecheck → client build → SSR build → prerender all pages into `dist/`. |
| `npm run preview` | Serve `dist/` locally with the same clean-URL rules as CloudFront. |
| `npm run og-image` | Re-render `public/images/og-image.png` from `src/assets/og-image.svg`. |

---

## Editing content

All company facts live in data files, so most updates don't need component changes.

| File | Contains |
| --- | --- |
| `src/data/company.ts` | Legal and brand name, tagline, mission, vision, **social links**, contact details, founders. |
| `src/data/platform.ts` | Core and future capabilities, and the **development stage** of each. |
| `src/data/projects.ts` | Project cards (MEOD Farm, ComCrop) and their status. |
| `src/data/seo.ts` | Per-page titles and meta descriptions, plus the `Organization` JSON-LD. |
| `src/data/navigation.ts` | Main navigation items. |

### Things to fill in when they're confirmed

These are left empty on purpose. Anything set to `null` is simply not shown: no placeholder text,
no broken buttons.

- **Instagram:** in `src/data/company.ts`, set `social.instagram` to the official URL. It then appears
  in the footer, About and Contact pages and the "Follow Our Journey" section, and in `sameAs`
  structured data.
- **GitHub organisation (optional):** `social.github`.
- **Contact details:** `contact.email`, `contact.phone`, `contact.address`, `contact.uen`. Once an
  email is set, the Privacy Policy and Terms point to it instead of LinkedIn.
- **Founder profiles:** each founder has `bio`, `linkedin` and `photo` fields. Add a photo to
  `public/images/founders/` and reference it as `/images/founders/<name>.jpg`. Add biographies only
  once each founder has approved them.
- **Capability stages:** `stage` in `src/data/platform.ts` is one of `prototype`, `mvp` or `concept`.
  Check that each one is accurate, and update it as development progresses.
- **Sitemap:** `public/sitemap.xml` is a static file. Update `lastmod` (and add new URLs) when pages
  change.

### Content principles

The site intentionally contains **no** customer counts, metrics, awards, testimonials, partnership
claims, follower counts or embedded social feeds. Every product is labelled with its real stage.
Please keep it that way: credibility with farms, investors and government audiences depends on it.

### Photography

The site ships with SVG illustrations only, so there are no third-party image licences to manage.
To add photography, put optimised images (WebP or AVIF, under about 200 KB each) in `public/images/`,
use only photos you own or have licensed, and give every `<img>` a meaningful `alt` attribute plus
`width` and `height` attributes.

---

## Contact form and enquiry backend

`src/components/ContactForm.tsx` validates every field in the browser (required fields, email format,
length limits, consent) and shows an accessible error summary.

Submission goes through `src/services/enquiry.ts`:

- **No endpoint configured (default):** the form says clearly that online enquiries are not connected
  yet and that **nothing was sent**. It keeps the visitor's message and points them to LinkedIn. It
  never shows a fake success message.
- **Endpoint configured:** it `POST`s JSON to `VITE_CONTACT_ENDPOINT` and reports success only when
  the server returns a 2xx response.

To connect a backend (for example AWS API Gateway → Lambda → SES or DynamoDB):

1. Deploy an HTTPS endpoint that accepts the `EnquiryPayload` shape defined in `src/services/enquiry.ts`.
2. In the backend, re-validate every field server-side, reject requests where the honeypot field
   `website` is filled in, add rate limiting (API Gateway throttling or AWS WAF), and allow CORS from
   `https://tyllage.com` only.
3. Set the URL at build time. Copy `.env.example` to `.env.local` for local work, and add
   `VITE_CONTACT_ENDPOINT` as a GitHub **repository variable** for CI.

> `VITE_` variables are embedded in the public JavaScript bundle. Use them only for public URLs.
> Never put API keys, AWS credentials or other secrets in frontend environment variables.

---

## Project structure

```
├── .github/workflows/deploy.yml   CI (lint + build on PRs) and deploy (main → S3 + CloudFront)
├── infra/cloudfront-url-rewrite.js CloudFront Function: clean URLs + www → apex redirect
├── public/                         Copied as-is: favicon, robots.txt, sitemap.xml, images/
├── scripts/
│   ├── prerender.mjs               Renders each route to dist/<route>/index.html (+ 404.html)
│   └── generate-og-image.mjs       SVG → PNG Open Graph image
├── src/
│   ├── assets/                     Source artwork (og-image.svg)
│   ├── components/                 Navbar, Footer, Hero, SocialLinks, ContactForm, ProjectCard, …
│   ├── data/                       Company, platform, projects, SEO and navigation content
│   ├── hooks/                      usePageMeta (head tags), useReveal (scroll animations)
│   ├── pages/                      Home, About, Platform, Projects, Technology, Contact, Legal, NotFound
│   ├── services/enquiry.ts         Enquiry submission client
│   ├── App.tsx                     Routes
│   ├── entry-server.tsx            Build-time renderer and head-tag generation
│   ├── main.tsx                    Client entry (hydrates prerendered HTML)
│   └── index.css                   All custom CSS
├── index.html                      HTML template
└── vite.config.ts
```

---

## SEO and accessibility

- Each page has its own `<title>`, meta description, canonical URL, Open Graph and Twitter tags. These
  are **written into the static HTML** at build time, so crawlers and link previews see them without
  running JavaScript. `usePageMeta` keeps them in sync during client-side navigation.
- An `Organization` JSON-LD block is included on every page. `sameAs` lists only the social profiles
  that are configured (currently LinkedIn).
- `robots.txt` and `sitemap.xml` are in `public/`. The 404 page is marked `noindex`.
- Semantic landmarks, a skip link, visible focus styles, keyboard-operable navigation (Escape closes
  the mobile menu), labelled form controls with `aria-invalid` and `aria-describedby`, and
  screen-reader notes on links that open in a new tab.
- `prefers-reduced-motion` disables scroll animations and transitions. Content is fully visible
  without JavaScript.

---

## Deployment: AWS S3 + CloudFront

The build output in `dist/` is a set of static files:

```
dist/index.html            → https://tyllage.com/
dist/about/index.html      → https://tyllage.com/about
dist/404.html              → served for unknown URLs
dist/assets/*              → fingerprinted JS/CSS (safe to cache for a year)
```

### One-time AWS setup

1. **S3 bucket** (e.g. `tyllage-website`): Block Public Access **on**, static website hosting **off**.
   CloudFront reads from it privately.
2. **ACM certificate** in **us-east-1** for `tyllage.com` and `www.tyllage.com` (DNS validation).
3. **CloudFront Function:** create one from `infra/cloudfront-url-rewrite.js` (runtime
   `cloudfront-js-2.0`) and publish it. It rewrites `/about` → `/about/index.html` and redirects
   `www` to the apex domain.
4. **CloudFront distribution:**
   - Origin: the S3 bucket's REST endpoint, with **Origin Access Control (OAC)**. Apply the bucket
     policy CloudFront generates.
   - Viewer protocol policy: *Redirect HTTP to HTTPS*. Allowed methods: GET, HEAD.
   - Cache policy: *CachingOptimized*. Compression: on.
   - Function association: the function from step 3 on **Viewer request**.
   - Default root object: `index.html`.
   - Alternate domain names: `tyllage.com`, `www.tyllage.com`, with the ACM certificate.
   - Custom error responses: **403 → `/404.html` (response code 404)** and **404 → `/404.html`
     (response code 404)**. Without `s3:ListBucket`, S3 returns 403 for missing objects.
   - Recommended: attach the managed *SecurityHeadersPolicy* response headers policy (HSTS,
     `X-Content-Type-Options`, frame options, referrer policy).
5. **DNS:** point `tyllage.com` and `www.tyllage.com` at the distribution (Route 53 alias A/AAAA
   records, or CNAME/ALIAS at your DNS provider).

### GitHub Actions (OIDC, no stored AWS keys)

1. In IAM, add GitHub's OIDC identity provider (`token.actions.githubusercontent.com`).
2. Create a role that trusts it, restricted to this repository's `main` branch, for example:
   `"token.actions.githubusercontent.com:sub": "repo:<owner>/<repo>:ref:refs/heads/main"`
   (or `…:environment:production`).
3. Give the role least-privilege permissions: `s3:ListBucket` on the bucket,
   `s3:PutObject` and `s3:DeleteObject` on `bucket/*`, and `cloudfront:CreateInvalidation` on the
   distribution.
4. In the GitHub repository settings, add:
   - **Secret:** `AWS_DEPLOY_ROLE_ARN`
   - **Variables:** `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, and optionally
     `VITE_CONTACT_ENDPOINT`
   - An environment called `production` (optionally with required reviewers).

`.github/workflows/deploy.yml` then:

- On **pull requests:** installs, lints, typechecks and builds.
- On **push to `main`:** does the same, uploads `assets/` with `Cache-Control: immutable` (1 year)
  and everything else with `max-age=0, must-revalidate`, then invalidates CloudFront.

### Manual deploy (if needed)

```bash
npm run build
aws s3 sync dist/assets s3://<bucket>/assets --delete --cache-control "public, max-age=31536000, immutable"
aws s3 sync dist s3://<bucket> --delete --exclude "assets/*" --cache-control "public, max-age=0, must-revalidate"
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

---

## Architecture note

This corporate website and the Tyllage farm platform are deliberately separate. The website has no
database, no server-side code and no access to farm platform data. The farm platform (planned:
React + TypeScript, Node.js + Express, PostgreSQL, AWS, OpenAI API, WhatsApp Business Platform) is
built, deployed and secured independently.

---

Copyright © Tyllage LLP. All rights reserved.
