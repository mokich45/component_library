import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const HeroSplit: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctas,
  media,
  stats,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const safeStats = clampArray(stats, 3);
  const image = media?.image;

  return (
    <section 
      id={id} 
      className={cn("relative py-20 px-6 bg-white dark:bg-gray-900 overflow-hidden", className)}
    >
      <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:gap-x-10">
        <div className="lg:flex-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}

          {safeCtas.length > 0 && (
            <div className="mt-10 flex items-center gap-x-6">
              {safeCtas.map((cta, index) => {
                const baseClasses = "rounded-md px-6 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors";
                const variantClasses = cta.variant === 'secondary' 
                  ? "text-gray-900 dark:text-white bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600";
                
                const href = cta.href || (cta.targetId ? `#${cta.targetId}` : undefined);

                return href ? (
                  <a key={index} href={href} className={cn(baseClasses, variantClasses)}>
                    {cta.label}
                  </a>
                ) : (
                  <button key={index} className={cn(baseClasses, variantClasses)}>
                    {cta.label}
                  </button>
                );
              })}
            </div>
          )}

          {safeStats.length > 0 && (
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {safeStats.map((stat, index) => (
                <div key={index} className="flex flex-col-reverse gap-y-1">
                  <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {image && (
          <div className="mt-16 lg:mt-0 lg:flex-1">
            <img
              src={image.src}
              alt={image.alt || ""}
              className="w-full rounded-xl shadow-2xl ring-1 ring-gray-900/10 object-cover aspect-[4/3]"
            />
          </div>
        )}
      </div>
    </section>
  );
};
