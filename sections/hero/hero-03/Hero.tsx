import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HeroProps } from '../types';
import { cn } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  media,
  ctas,
  note,  previewContext,
  className,
  id,
}) => {
  const primaryCta = ctas?.[0];
  const image = media?.image;

  return (
    <section id={id} className={cn('relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      {image && (
        <div className="absolute inset-0">
          <img src={image.src} alt={image.alt || ''} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/20 bg-white/20 px-6 py-10 text-center shadow-2xl backdrop-blur-md sm:px-10">
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>

        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 sm:text-lg">{subtitle}</p>}

        {primaryCta && (
          <div className="mt-8">
            <a
              href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
              className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 transition-colors hover:bg-slate-100"
            >
              {primaryCta.label}
            </a>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/85">
        <span className="text-xs uppercase tracking-[0.2em]">{note || 'Scroll'}</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export { Hero as HeroMedia };
