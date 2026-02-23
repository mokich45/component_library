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
  const safeCtas = clampArray(ctas, 2);
  const image = media?.image;

  return (
    <section id={id} className={cn('relative bg-white px-6 pb-16 pt-28 text-center sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{title}</h1>

        {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">{subtitle}</p>}

        {safeCtas.length > 0 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {safeCtas.map((cta, index) => {
              const href = cta.href || (cta.targetId ? `#${cta.targetId}` : '#');
              const isSecondary = cta.variant === 'secondary';

              return (
                <a
                  key={index}
                  href={href}
                  className={cn(
                    'rounded-full px-6 py-3 text-sm font-semibold transition-colors',
                    isSecondary ? 'border border-slate-300 text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-700'
                  )}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        )}

        {image && (
          <div className="mt-12 overflow-hidden rounded-2xl shadow-2xl">
            <img src={image.src} alt={image.alt || ''} className="h-full max-h-[520px] w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};

export { Hero as HeroCentered };
