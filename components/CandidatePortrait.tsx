import React from 'react';
import Image from 'next/image';

export type CandidatePortraitVariant = 'card' | 'detail';

export interface CandidatePortraitProps {
  photo?: string;
  name: string;
  variant?: CandidatePortraitVariant;
  className?: string;
  /**
   * Tailwind třídy na obalu kolem `next/image` (translate/scale/origin…) — jen raster.
   */
  portraitWebpTune?: string;
  /** object-position pro WebP (např. `object-[center_55%]`) */
  portraitObjectPosition?: string;
}

const SIZES_CARD = '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw';
const SIZES_DETAIL = '(max-width: 768px) 100vw, 392px';

const RASTER_IMG_BASE = 'object-cover';

/** Studiově šedá z WebP portrétů (průměr horního okraje ~#7c7c7c) — jen placeholder bez fotky */
const PORTRAIT_STUDIO_BG = 'bg-[#7c7c7c]';

const RASTER_HOVER_INTERACTION =
  'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:scale-[1.02]';

const rasterHoverClasses = (objectPosition: string) =>
  `${RASTER_IMG_BASE} ${objectPosition} ${RASTER_HOVER_INTERACTION}`;

/**
 * Portrét 4∶5 — sladěný s mřížkou kandidátů; WebP/JPEG přes next/image, SVG placeholdery přes <img>.
 */
export function CandidatePortrait({
  photo,
  name,
  variant = 'card',
  className = '',
  portraitWebpTune = '',
  portraitObjectPosition = 'object-center',
}: CandidatePortraitProps) {
  const sizes = variant === 'detail' ? SIZES_DETAIL : SIZES_CARD;
  const isSvg = Boolean(photo?.endsWith('.svg'));
  const rasterImg = `${RASTER_IMG_BASE} ${portraitObjectPosition}`;

  const frame =
    variant === 'detail'
      ? 'rounded-2xl shadow-sm ring-1 ring-slate-200/90'
      : 'rounded-xl shadow-sm ring-1 ring-slate-200/80';

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden ${photo ? '' : PORTRAIT_STUDIO_BG} ${frame} ${className}`}
    >
      {photo ? (
        isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className={`h-full w-full ${rasterHoverClasses(portraitObjectPosition)}`} />
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            {portraitWebpTune ? (
              <div
                className={[
                  'relative h-full w-full will-change-transform',
                  portraitWebpTune,
                  RASTER_HOVER_INTERACTION,
                ].join(' ')}
              >
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes={sizes}
                  className={rasterImg}
                  priority={variant === 'detail'}
                />
              </div>
            ) : (
              <Image
                src={photo}
                alt={name}
                fill
                sizes={sizes}
                className={rasterHoverClasses(portraitObjectPosition)}
                priority={variant === 'detail'}
              />
            )}
          </div>
        )
      ) : (
        <span className={`absolute inset-0 flex items-center justify-center ${PORTRAIT_STUDIO_BG} text-xs uppercase tracking-[0.2em] text-white/45`}>
          Foto 2026
        </span>
      )}
    </div>
  );
}
