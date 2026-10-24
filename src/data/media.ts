import type { SceneVariant } from '../components/Scene';

/**
 * Image slots used across the site.
 *
 * Each slot shows an illustrated scene until a photograph is approved. To use
 * a photo, place an optimised file (WebP/AVIF, ~1600px wide, < 300 KB) in
 * public/images/ and set `photo` below.
 *
 * Only use photos that Tyllage owns or has licensed. Record the licence or
 * photographer in `credit`. Never present generic stock photos as MEOD Farm
 * or any other real facility; use MEOD photographs only with permission.
 */
export interface Photo {
  src: string;
  alt: string;
  /** Licence / photographer attribution, shown as a small caption. */
  credit?: string;
}

export interface MediaSlot {
  scene: SceneVariant;
  photo: Photo | null;
}

export const media = {
  hero: { scene: 'greenhouse', photo: null },
  purpose: { scene: 'rows', photo: null },
  founders: { scene: 'seedlings', photo: null },
  aboutStory: { scene: 'leaves', photo: null },
  whyAgriculture: { scene: 'crates', photo: null },
  projectMeod: { scene: 'greenhouse', photo: null },
  technology: { scene: 'leaves', photo: null },
  contact: { scene: 'rows', photo: null },
} satisfies Record<string, MediaSlot>;
