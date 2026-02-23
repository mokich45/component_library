import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctas,
  media,
  stats,  previewContext,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const safeStats = clampArray(stats, 3);
  const image = media?.image;

  return (
    <section id={id} className={cn('relative overflow-hidden bg-slate-50 px-6 pb-16 pt-28 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>}

          {safeCtas.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {safeCtas.map((cta, index) => {
                const href = cta.href || (cta.targetId ? `#${cta.targetId}` : '#');
                const isSecondary = cta.variant === 'secondary';

                return (
                  <a
                    key={index}
                    href={href}
                    className={cn(
                      'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors',
                      isSecondary ? 'border border-slate-300 text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-700'
                    )}
                  >
                    {cta.label}
                  </a>
                );
              })}
            </div>
          )}

          {safeStats.length > 0 && (
            <dl className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {safeStats.map((stat, index) => (
                <div key={index} className="rounded-xl border border-slate-200 bg-white p-4">
                  <dd className="text-2xl font-semibold text-slate-900">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-slate-600">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        {image && (
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img src={image.src} alt={image.alt || ''} className="h-full min-h-[280px] w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};

export { Hero as HeroSplit };
