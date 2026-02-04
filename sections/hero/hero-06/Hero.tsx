import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const HeroCollage: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctas,
  media,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 1);
  const images = clampArray(media?.images, 5);

  return (
    <section 
      id={id}
      className={cn("relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden", className)}
    >
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              "absolute overflow-hidden shadow-xl",
              index === 0 ? "top-20 left-8 w-80 h-96 -rotate-2 z-10" :
              index === 1 ? "top-12 right-16 w-64 h-80 rotate-3 z-20" :
              index === 2 ? "bottom-32 left-1/2 -translate-x-1/2 w-56 h-72 rotate-1 z-15" :
              index === 3 ? "bottom-20 right-8 w-72 h-96 -rotate-1 z-12 grayscale" :
              "top-48 left-96 w-48 h-64 rotate-12 z-8"
            )}
          >
            <img src={img.src} alt={img.alt || ""} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-40 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="text-center">
          <h1 className="text-6xl md:text-9xl lg:text-[12rem] font-serif tracking-tighter leading-none text-black dark:text-white mix-blend-multiply dark:mix-blend-normal">
            {title}
          </h1>
          
          {subtitle && (
            <div className="mt-8 mb-12">
              <p className="inline-block bg-white dark:bg-gray-800 px-6 py-3 text-lg tracking-[0.3em] text-black dark:text-white uppercase border border-black dark:border-gray-600 shadow-sm">
                {subtitle}
              </p>
              <div className="w-12 h-px bg-black dark:bg-white mx-auto mt-4"></div>
            </div>
          )}

          {safeCtas[0] && (
            <div className="mt-16">
              <a
                href={safeCtas[0].href || `#${safeCtas[0].targetId}`}
                className="group inline-block text-lg tracking-wider uppercase text-black dark:text-white bg-white dark:bg-gray-800 px-4 py-2 border border-black dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="relative">
                  {safeCtas[0].label}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black dark:bg-white transform origin-left transition-transform duration-300 group-hover:scale-x-110"></span>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
