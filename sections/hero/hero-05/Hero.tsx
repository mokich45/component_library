import React from 'react';
import { ArrowRight, Award, Star, TrendingUp } from 'lucide-react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Star, TrendingUp, ArrowRight,
};

export const HeroWithStats: React.FC<HeroProps> = ({
  badges,
  title,
  subtitle,
  ctas,
  stats,
  media,
  note, // Используем для titleHighlight если нужно
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const safeStats = clampArray(stats, 3);
  const image = media?.image;
  const badge = badges?.[0];

  return (
    <section 
      id={id}
      className={cn("pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-100/30 to-white dark:from-gray-800/30 dark:to-gray-900", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Award className="w-4 h-4 text-indigo-700 dark:text-indigo-300" />
                <span className="text-sm text-indigo-700 dark:text-indigo-300">{badge.text}</span>
              </div>
            )}
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-gray-900 dark:text-white">
                {title}
                {note && <span className="text-indigo-600 dark:text-indigo-400"> {note}</span>}
              </h1>
              {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">{subtitle}</p>}
            </div>

            {safeCtas.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                {safeCtas.map((cta, index) => {
                  const baseClasses = "inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-semibold shadow-sm transition-all duration-200";
                  const variantClasses = cta.variant === 'secondary' 
                    ? "bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 group";
                  
                  const href = cta.href || (cta.targetId ? `#${cta.targetId}` : undefined);

                  return href ? (
                    <a key={index} href={href} className={cn(baseClasses, variantClasses)}>
                      {cta.label}
                      {index === 0 && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                    </a>
                  ) : (
                    <button key={index} className={cn(baseClasses, variantClasses)}>
                      {cta.label}
                      {index === 0 && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  );
                })}
              </div>
            )}

            {safeStats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                {safeStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl text-indigo-600 dark:text-indigo-400">{stat.value}</span>
                      {index === safeStats.length - 1 && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {image && (
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img src={image.src} alt={image.alt || ""} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
