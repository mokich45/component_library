import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctas, media, note, nav, previewContext, className, id }) => {
  const primaryCta = clampArray(ctas, 1)[0];
  const image = media?.image;

  return (
    <section id={id} className={cn('relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      {image && (
        <div className="absolute inset-0">
          <img src={image.src} alt={image.alt || ''} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl text-center text-white">
        <h1 className="text-5xl font-semibold md:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">{subtitle}</p>}
        {primaryCta && (
          <a
            href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            {primaryCta.label}
          </a>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/80">
        <span className="text-xs uppercase tracking-[0.2em]">{note || 'Explore'}</span>
        <ChevronDown className="mt-1 h-5 w-5" />
      </div>
    </section>
  );
};
