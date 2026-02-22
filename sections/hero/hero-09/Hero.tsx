import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctas, media, nav, className, id }) => {
  const safeCtas = clampArray(ctas, 1);
  const background = media?.images?.[0] || media?.image;

  return (
    <section id={id} className={cn('relative min-h-screen overflow-hidden px-6 pb-16 pt-28 sm:pt-32', className)}>
      <HeroHeader config={nav} />

      {background && (
        <div className="absolute inset-0">
          <img src={background.src} alt={background.alt || ''} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center text-center">
        <div className="w-full rounded-3xl border border-white/25 bg-white/30 p-8 shadow-2xl backdrop-blur-lg md:p-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base text-slate-700 sm:text-lg">{subtitle}</p>}

          {safeCtas[0] && (
            <a
              href={safeCtas[0].href || (safeCtas[0].targetId ? `#${safeCtas[0].targetId}` : '#')}
              className="mt-8 inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {safeCtas[0].label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
