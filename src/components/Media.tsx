import type { ReactNode } from 'react';
import type { MediaSlot, Photo } from '../data/media';
import type { SceneVariant } from './Scene';
import { Scene } from './Scene';

interface MediaProps {
  /** A slot from src/data/media.ts, or a scene name for a purely decorative visual. */
  slot: MediaSlot | SceneVariant;
  className?: string;
  /** Load eagerly (for above-the-fold images such as the hero). */
  priority?: boolean;
  /** Enables a gentle zoom when the surrounding card is hovered. */
  zoom?: boolean;
  children?: ReactNode;
}

/** Shows an approved photograph when one is configured, otherwise an illustrated scene. */
export function Media({ slot, className = '', priority = false, zoom = false, children }: MediaProps) {
  const { scene, photo }: { scene: SceneVariant; photo: Photo | null } =
    typeof slot === 'string' ? { scene: slot, photo: null } : slot;

  return (
    <div className={`media${zoom ? ' media--zoom' : ''} ${className}`}>
      {photo ? (
        <img
          className="media__img"
          src={photo.src}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <Scene variant={scene} className="media__img" priority={priority} />
      )}
      {photo?.credit && <span className="media__credit">{photo.credit}</span>}
      {children}
    </div>
  );
}
