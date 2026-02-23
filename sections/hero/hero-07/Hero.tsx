import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({
  badges,
  title,
  subtitle,
  note,
  ctas,  previewContext,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const badge = badges?.[0];

  return (
    <section id={id} className={cn('relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-16 pt-28 text-white sm:px-6 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl items-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-10">
          {badge && <div className="mb-4 text-sm uppercase tracking-[0.2em] text-slate-300">{badge.text}</div>}

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              {subtitle}
              {note && <span className="ml-2 text-cyan-300">{note}</span>}
            </p>
          )}

          {safeCtas.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {safeCtas.map((cta, index) => {
                const href = cta.href || (cta.targetId ? `#${cta.targetId}` : '#');
                const primary = cta.variant === 'primary' || index === 0;

                return (
                  <a
                    key={index}
                    href={href}
                    className={cn(
                      'rounded-full px-6 py-3 text-center text-sm font-medium transition-colors',
                      primary ? 'border border-cyan-300/40 bg-cyan-400/20 hover:bg-cyan-400/30' : 'border border-white/25 hover:bg-white/10'
                    )}
                  >
                    {cta.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero as HeroGlass };
