import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({ badges, title, subtitle, ctas, stats, media, nav, previewContext, className, id }) => {
  const safeCtas = clampArray(ctas, 2);
  const safeStats = clampArray(stats, 3);
  const badge = badges?.[0];
  const image = media?.image;

  return (
    <section id={id} className={cn('relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      {image && (
        <div className="absolute inset-0">
          <img src={image.src} alt={image.alt || ''} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center text-white md:text-left">
        {badge && (
          <span className="inline-flex rounded-full bg-orange-500/90 px-4 py-2 text-xs uppercase tracking-wider">
            {badge.text}
          </span>
        )}

        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/85">{subtitle}</p>}

        {safeCtas.length > 0 && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            {safeCtas.map((cta, index) => {
              const href = cta.href || (cta.targetId ? `#${cta.targetId}` : '#');
              const secondary = cta.variant === 'secondary';

              return (
                <a
                  key={index}
                  href={href}
                  className={cn(
                    'rounded-lg px-6 py-3 text-sm font-semibold transition-colors',
                    secondary ? 'border border-white/35 bg-white/10 hover:bg-white/20' : 'bg-orange-500 text-white hover:bg-orange-600'
                  )}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        )}

        {safeStats.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {safeStats.map((stat, index) => (
              <div key={index} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="mt-1 text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center text-white/75 md:flex">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
};
