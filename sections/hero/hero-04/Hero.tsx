import React from 'react';
import { HeroProps } from '../types';
import { cn } from '../../../shared/utils';

export const HeroSplitText: React.FC<HeroProps> = ({
  title, // Используем формат "Left Part | Right Part"
  media,
  className,
  id,
}) => {
  const [titleLeft, titleRight] = title.split('|').map(s => s.trim());
  const image = media?.image;

  return (
    <main 
      id={id}
      className={cn("relative z-10 px-4 md:px-8 py-8 md:py-16 max-w-7xl mx-auto", className)}
    >
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center text-center space-y-6">
        <h1 className="text-gray-900 dark:text-white leading-[0.9] font-serif text-4xl sm:text-5xl font-bold whitespace-pre-line">
          {titleLeft}
        </h1>
        
        {image && (
          <div className="w-[240px] h-[360px] overflow-hidden rounded-3xl shadow-2xl">
            <img src={image.src} alt={image.alt || ""} className="w-full h-full object-cover" />
          </div>
        )}
        
        <h1 className="text-gray-900 dark:text-white leading-[0.9] font-serif text-4xl sm:text-5xl font-bold whitespace-pre-line">
          {titleRight}
        </h1>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center gap-8">
        <div className="flex-1 flex flex-col items-end">
          <h1 className="text-gray-900 dark:text-white text-right leading-[0.9] font-serif text-5xl lg:text-7xl xl:text-8xl font-bold whitespace-pre-line">
            {titleLeft}
          </h1>
        </div>

        {image && (
          <div className="flex-shrink-0">
            <div className="w-[280px] h-[420px] overflow-hidden rounded-3xl shadow-2xl">
              <img src={image.src} alt={image.alt || ""} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-gray-900 dark:text-white leading-[0.9] font-serif text-5xl lg:text-7xl xl:text-8xl font-bold whitespace-pre-line">
            {titleRight}
          </h1>
        </div>
      </div>
    </main>
  );
};
