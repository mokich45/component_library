import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctas,
  media,  previewContext,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 1);
  const images = clampArray(media?.images, 5);

  return (
    <section id={id} className={cn('relative min-h-screen overflow-hidden bg-white px-4 pb-14 pt-28 sm:px-6 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              'absolute overflow-hidden rounded-xl shadow-xl',
              index === 0 ? 'left-8 top-28 h-72 w-56 -rotate-3' :
              index === 1 ? 'right-8 top-24 h-80 w-60 rotate-3' :
              index === 2 ? 'bottom-20 left-1/2 h-64 w-52 -translate-x-1/2 rotate-1' :
              index === 3 ? 'bottom-24 right-20 h-72 w-56 -rotate-2' :
              'left-24 top-1/2 h-56 w-44 -translate-y-1/2 rotate-6'
            )}
          >
            <img src={img.src} alt={img.alt || ''} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl">{title}</h1>

        {subtitle && <p className="mt-5 max-w-2xl bg-white/80 px-4 py-2 text-base uppercase tracking-[0.2em] text-slate-700 shadow-sm backdrop-blur sm:text-lg">{subtitle}</p>}

        {safeCtas[0] && (
          <a
            href={safeCtas[0].href || (safeCtas[0].targetId ? `#${safeCtas[0].targetId}` : '#')}
            className="mt-8 rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
          >
            {safeCtas[0].label}
          </a>
        )}

        {images.length > 0 && (
          <div className="mt-10 grid w-full grid-cols-2 gap-3 md:hidden">
            {images.slice(0, 4).map((img, index) => (
              <div key={index} className="h-36 overflow-hidden rounded-xl shadow-lg">
                <img src={img.src} alt={img.alt || ''} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { Hero as HeroCollage };
