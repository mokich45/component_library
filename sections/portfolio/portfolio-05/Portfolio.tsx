import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Award, Users, Star, TrendingUp } from 'lucide-react';
import { PortfolioProps, PortfolioStat } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Award, Users, Star, TrendingUp, ArrowRight
};

export const PortfolioSplit: React.FC<PortfolioProps> = ({
  title,
  subtitle,
  badges,
  items,
  stats,
  className,
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const safeItems = clampArray(items, 8);
  const safeStats = clampArray(stats, 6);

  // Разделяем элементы на левую и правую колонки
  const leftItems = safeItems.filter((_, index) => index % 2 === 0);
  const rightItems = safeItems.filter((_, index) => index % 2 === 1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Вычисляем прогресс скролла от 0 до 1
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        )
      );
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Параллакс значения
  const leftY = scrollProgress * -100;
  const rightY = scrollProgress * 100;

  if (safeItems.length === 0) {
    return (
      <section 
        id={id} 
        ref={containerRef}
        className={cn("min-h-screen bg-black dark:bg-gray-950 text-white py-20 px-6 overflow-hidden", className)}
      >
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Нет доступных проектов
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id} 
      ref={containerRef}
      className={cn("min-h-screen bg-black dark:bg-gray-950 text-white py-20 px-6 overflow-hidden", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full mb-4">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">{badges[0].text}</span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-neutral-400 dark:text-gray-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Левая колонка с параллаксом */}
          <div 
            className="space-y-8"
            style={{ transform: `translateY(${leftY}px)` }}
          >
            {leftItems.map((item, index) => {
              const primaryCta = item.ctas?.[0];
              return (
                <div
                  key={item.id || index}
                  className="relative group overflow-hidden rounded-3xl"
                >
                  <div className="relative h-[400px] md:h-[500px]">
                    {item.image ? (
                      <img
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {item.badge && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                    {primaryCta && (
                      <a
                        href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
                        className="inline-flex items-center gap-2 text-sm border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black dark:hover:bg-gray-800 dark:hover:text-white transition-colors duration-300"
                      >
                        {primaryCta.label}
                        <ArrowRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Правая колонка с параллаксом */}
          <div 
            className="space-y-8 lg:mt-20"
            style={{ transform: `translateY(${rightY}px)` }}
          >
            {rightItems.map((item, index) => {
              const primaryCta = item.ctas?.[0];
              return (
                <div
                  key={item.id || index}
                  className="relative group overflow-hidden rounded-3xl"
                >
                  <div className="relative h-[400px] md:h-[500px]">
                    {item.image ? (
                      <img
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {item.badge && (
                    <div className="absolute top-6 right-6">
                      <span className="bg-rose-500 dark:bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                    {primaryCta && (
                      <a
                        href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
                        className="inline-flex items-center gap-2 text-sm border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black dark:hover:bg-gray-800 dark:hover:text-white transition-colors duration-300"
                      >
                        {primaryCta.label}
                        <ArrowRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Статистика внизу */}
        {safeStats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {safeStats.map((stat, index) => {
              const Icon = stat.iconName ? iconMap[stat.iconName] : Award;
              return (
                <div
                  key={index}
                  className="text-center p-8 border border-white/10 dark:border-gray-700 rounded-2xl backdrop-blur-sm bg-white/5 dark:bg-gray-800/50"
                >
                  <Icon className="size-8 mx-auto mb-4 text-rose-400 dark:text-rose-500" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-neutral-400 dark:text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
