import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctas, media, nav, className, id }) => {
  const safeCtas = clampArray(ctas, 1);
  const image = media?.image;

  return (
    <section id={id} className={cn('relative bg-white px-4 pb-16 pt-28 sm:px-6 sm:pt-32', className)}>
      <HeroHeader config={nav} />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-6 max-w-xl text-lg text-slate-600">{subtitle}</p>}

          {safeCtas[0] && (
            <a
              href={safeCtas[0].href || (safeCtas[0].targetId ? `#${safeCtas[0].targetId}` : '#')}
              className="mt-8 inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {safeCtas[0].label}
            </a>
          )}
        </div>

        {image && (
          <div className="h-[360px] overflow-hidden rounded-3xl shadow-2xl sm:h-[520px]">
            <img src={image.src} alt={image.alt || ''} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};
