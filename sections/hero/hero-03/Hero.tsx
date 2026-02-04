import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HeroProps } from '../types';
import { cn } from '../../../shared/utils';

export const HeroMedia: React.FC<HeroProps> = ({
  title,
  subtitle,
  media,
  ctas,
  note, // Используем для текста индикатора скролла
  className,
  id,
}) => {
  const primaryCta = ctas?.[0];
  const image = media?.image;

  return (
    <section 
      id={id} 
      className={cn("relative h-screen w-full overflow-hidden flex items-center justify-center", className)}
    >
      {/* Background Image with Overlay */}
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-100/20 to-white/30 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Content Card */}
      <div className="relative z-10 px-6 text-center">
        <div className="bg-white/40 backdrop-blur-md rounded-[44px] px-8 py-12 md:px-16 md:py-16 shadow-xl max-w-4xl border border-white/20">
          <h1 className="text-gray-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 md:mb-8 leading-tight font-serif italic">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {primaryCta && (
            <div className="flex justify-center">
              {primaryCta.href || primaryCta.targetId ? (
                <a 
                  href={primaryCta.href || `#${primaryCta.targetId}`}
                  className="px-10 md:px-14 py-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:shadow-lg transition-all duration-300 text-sm tracking-widest font-semibold uppercase"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <button className="px-10 md:px-14 py-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:shadow-lg transition-all duration-300 text-sm tracking-widest font-semibold uppercase">
                  {primaryCta.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
        <span className="text-xs tracking-[0.2em] uppercase">{note || "Scroll"}</span>
        <ChevronDown size={20} className="md:w-6 md:h-6" />
      </div>
    </section>
  );
};
