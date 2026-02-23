import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({
  badges,
  title,
  subtitle,
  ctas,
  stats,
  media,
  note,  previewContext,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const safeStats = clampArray(stats, 3);
  const image = media?.image;
  const badge = badges?.[0];

  return (
    <section id={id} className={cn('relative bg-gradient-to-b from-slate-100 to-white px-4 pb-16 pt-28 sm:px-6 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 space-y-7 lg:order-1">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm text-indigo-700">
              <Award className="h-4 w-4" />
              <span>{badge.text}</span>
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {title}
              {note && <span className="text-indigo-600"> {note}</span>}
            </h1>
            {subtitle && <p className="mt-4 max-w-xl text-lg text-slate-600">{subtitle}</p>}
          </div>

          {safeCtas.length > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {safeCtas.map((cta, index) => {
                const href = cta.href || (cta.targetId ? `#${cta.targetId}` : '#');
                const isSecondary = cta.variant === 'secondary';

                return (
                  <a
                    key={index}
                    href={href}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors',
                      isSecondary ? 'border border-slate-300 text-slate-900 hover:bg-slate-100' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    )}
                  >
                    {cta.label}
                    {index === 0 && <ArrowRight className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          )}

          {safeStats.length > 0 && (
            <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              {safeStats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-semibold text-indigo-600">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="order-1 overflow-hidden rounded-2xl shadow-2xl lg:order-2">
            <img src={image.src} alt={image.alt || ''} className="h-full min-h-[320px] w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};

export { Hero as HeroWithStats };
