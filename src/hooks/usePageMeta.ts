import { useEffect } from 'react';
import { canonicalUrl, OG_IMAGE, type PageMeta } from '../data/seo';
import { company } from '../data/company';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps the document head in sync during client-side navigation.
 * The initial values are written into each page's HTML at build time by
 * scripts/prerender.mjs, so crawlers see them without running JavaScript.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const url = canonicalUrl(meta.path);
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${company.siteUrl}${OG_IMAGE}`);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setCanonical(url);
  }, [meta]);
}
