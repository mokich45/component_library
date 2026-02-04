import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const PortfolioCarouselSplit: React.FC<PortfolioProps> = ({
  title,
  subtitle,
  badges,
  items,
  autoplay = true,
  autoplaySpeed = 5000,
  showArrows = true,
  className,
  id,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const safeItems = clampArray(items, 10);

  useEffect(() => {
    if (autoplay && !isPaused && safeItems.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % safeItems.length);
      }, autoplaySpeed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, isPaused, safeItems.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + safeItems.length) % safeItems.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoplaySpeed * 2);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % safeItems.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoplaySpeed * 2);
  };

  if (safeItems.length === 0) {
    return (
      <section id={id} className={cn("py-20 px-4 bg-black dark:bg-gray-950 text-white overflow-hidden", className)}>
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Нет доступных проектов
        </div>
      </section>
    );
  }

  const currentItem = safeItems[currentIndex];
  const primaryCta = currentItem.ctas?.[0];

  return (
    <section 
      id={id} 
      className={cn("py-20 px-4 bg-black dark:bg-gray-950 text-white overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase bg-gray-900/50 rounded-full">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="relative">
            {safeItems.map((item, index) => (
              <div
                key={item.id || index}
                className={cn(
                  "transition-opacity duration-500",
                  index === currentIndex ? "opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
                )}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center px-4">
                  {/* Left Side - Content */}
                  <div className="space-y-6">
                    {item.category && (
                      <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 block">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-4xl md:text-5xl font-bold">
                      {item.title}
                    </h3>
                    {(item.client || item.year) && (
                      <div className="space-y-3 text-gray-400 dark:text-gray-500">
                        {item.client && (
                          <div className="flex items-center gap-4">
                            <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-600">
                              Client
                            </span>
                            <span>{item.client}</span>
                          </div>
                        )}
                        {item.year && (
                          <div className="flex items-center gap-4">
                            <span className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-600">
                              Year
                            </span>
                            <span>{item.year}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {item.description && (
                      <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {primaryCta && (
                      <a
                        href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
                        className={cn(
                          "inline-block mt-8 px-8 py-3 rounded-full font-medium transition-colors",
                          primaryCta.variant === "secondary"
                            ? "bg-transparent border-2 border-white text-white hover:bg-white/10"
                            : "bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        )}
                      >
                        {primaryCta.label}
                      </a>
                    )}
                  </div>

                  {/* Right Side - Image */}
                  <div className="relative">
                    {item.image ? (
                      <img
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-[400px] md:h-[500px] bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {showArrows && safeItems.length > 1 && (
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border border-white/30 dark:border-gray-600 flex items-center justify-center hover:bg-white/10 dark:hover:bg-gray-800 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border border-white/30 dark:border-gray-600 flex items-center justify-center hover:bg-white/10 dark:hover:bg-gray-800 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
