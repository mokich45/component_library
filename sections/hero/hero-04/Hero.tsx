import React from 'react';
import { HeroProps } from '../types';
import { cn } from '../../../shared/utils';
import { HeroHeader } from '../_shared/HeroHeader';

export const Hero: React.FC<HeroProps> = ({ title, media, nav, previewContext, className, id }) => {
  const [titleLeft = '', titleRight = ''] = title.split('|').map((s) => s.trim());
  const image = media?.image;

  return (
    <section id={id} className={cn('relative bg-[#f8f1e7] px-4 pb-14 pt-28 sm:px-6 sm:pt-32', className)}>
      <HeroHeader config={nav} previewContext={previewContext} />

      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center">
        <div className="w-full md:hidden">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-5xl font-bold leading-[0.9] text-[#2b1f16] sm:text-6xl">{titleLeft}</h1>
            {image && (
              <div className="h-[360px] w-[240px] overflow-hidden rounded-3xl shadow-2xl">
                <img src={image.src} alt={image.alt || ''} className="h-full w-full object-cover" />
              </div>
            )}
            <h1 className="text-5xl font-bold leading-[0.9] text-[#2b1f16] sm:text-6xl">{titleRight}</h1>
          </div>
        </div>

        <div className="hidden w-full items-center justify-center gap-8 md:flex">
          <div className="flex-1 text-right">
            <h1 className="text-7xl font-bold leading-[0.9] text-[#2b1f16] lg:text-8xl">{titleLeft}</h1>
          </div>

          {image && (
            <div className="h-[440px] w-[300px] overflow-hidden rounded-3xl shadow-2xl">
              <img src={image.src} alt={image.alt || ''} className="h-full w-full object-cover" />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-7xl font-bold leading-[0.9] text-[#2b1f16] lg:text-8xl">{titleRight}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero as HeroSplitText };
