import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Circle, Play } from 'lucide-react';
import { PortfolioProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const PortfolioCarouselInteractive: React.FC<PortfolioProps> = ({
  title,
  subtitle,
  badges,
  items,
  autoplay = true,
  autoplaySpeed = 5000,
  showDots = true,
  className,
  id,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const safeItems = clampArray(items, 10);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = safeItems.length - 1;
      if (nextIndex >= safeItems.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play
  useEffect(() => {
    if (!autoplay || safeItems.length <= 1) return;
    
    const timer = setInterval(() => {
      if (!isDragging) {
        paginate(1);
      }
    }, autoplaySpeed);
    
    return () => clearInterval(timer);
  }, [autoplay, autoplaySpeed, currentIndex, isDragging, safeItems.length]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeThreshold = 100;
    if (Math.abs(dragOffset) > swipeThreshold) {
      if (dragOffset > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }
    setDragOffset(0);
  };

  if (safeItems.length === 0) {
    return (
      <section 
        id={id} 
        className={cn("min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-6 relative overflow-hidden", className)}
      >
        <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
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
      className={cn("min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-6 relative overflow-hidden", className)}
    >
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-purple-500 dark:from-rose-600 dark:to-purple-600 text-white px-4 py-2 rounded-full mb-4">
              <Play className="size-4" />
              <span className="text-sm font-medium">{badges[0].text}</span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-neutral-300 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          <div
            ref={carouselRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            className="absolute w-full max-w-5xl cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="relative h-[500px] md:h-[600px]">
                {currentItem.image ? (
                  <img
                    src={currentItem.image.src}
                    alt={currentItem.image.alt || currentItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image</span>
                  </div>
                )}
                {currentItem.gradientColor && (
                  <div className={cn("absolute inset-0 bg-gradient-to-t opacity-40", currentItem.gradientColor)} />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm mb-4 w-fit">
                  {currentIndex + 1} / {safeItems.length}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {currentItem.title}
                </h3>
                {(currentItem.subtitle || currentItem.description) && (
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
                    {currentItem.subtitle || currentItem.description}
                  </p>
                )}
                {primaryCta && (
                  <a
                    href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
                    className={cn(
                      "inline-block bg-white text-black dark:bg-gray-800 dark:text-white px-8 py-4 rounded-full text-lg font-medium transition-transform hover:scale-105 active:scale-95",
                      primaryCta.variant === "secondary" && "bg-transparent border-2 border-white text-white hover:bg-white/10"
                    )}
                  >
                    {primaryCta.label}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {safeItems.length > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute left-4 z-20 bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/20 dark:hover:bg-white/30 transition-all hover:scale-110 active:scale-90"
                aria-label="Previous"
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                onClick={() => paginate(1)}
                className="absolute right-4 z-20 bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/20 dark:hover:bg-white/30 transition-all hover:scale-110 active:scale-90"
                aria-label="Next"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {showDots && safeItems.length > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {safeItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="relative transition-all hover:scale-125 active:scale-90"
                aria-label={`Go to slide ${index + 1}`}
              >
                <Circle
                  className={cn(
                    "size-3 transition-all duration-300",
                    index === currentIndex
                      ? "fill-white text-white"
                      : "fill-white/30 text-white/30"
                  )}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full border-2 border-white scale-150" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {safeItems.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {safeItems.map((item, index) => (
              <button
                key={item.id || index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "relative overflow-hidden rounded-xl transition-all duration-300",
                  index === currentIndex
                    ? "ring-4 ring-white dark:ring-gray-300 shadow-xl scale-105"
                    : "opacity-50 hover:opacity-100 hover:scale-105 active:scale-95"
                )}
              >
                {item.image ? (
                  <img
                    src={item.image.src}
                    alt={item.image.alt || item.title}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <div className="w-full h-24 bg-gray-800 dark:bg-gray-700" />
                )}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-white/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
