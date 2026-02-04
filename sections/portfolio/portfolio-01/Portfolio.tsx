import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const PortfolioCarousel: React.FC<PortfolioProps> = ({
  title,
  subtitle,
  badges,
  items,
  autoplay = true,
  autoplaySpeed = 4000,
  showDots = true,
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoplaySpeed * 2);
  };

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
      <section id={id} className={cn("w-full py-20 bg-gray-900 dark:bg-gray-950", className)}>
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          Нет доступных проектов
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id} 
      className={cn("w-full py-20 bg-gray-900 dark:bg-gray-950", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
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
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
            {safeItems.map((item, index) => (
              <div
                key={item.id || index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <div className="relative h-full rounded-2xl overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-20">
                    <div className="max-w-3xl">
                      {item.category && (
                        <span className="text-sm font-semibold text-blue-400 dark:text-blue-300 uppercase tracking-wider mb-3 block">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-lg md:text-xl text-gray-300 dark:text-gray-400 mb-6">
                          {item.description}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {item.tags.slice(0, 5).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {showArrows && safeItems.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {showDots && safeItems.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
              <ul className="flex justify-center gap-2">
                {safeItems.map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "w-3 h-3 rounded-full transition-colors",
                        index === currentIndex
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/75"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
