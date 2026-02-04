import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const HeroCentered: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctas,
  media,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const image = media?.image;

  return (
    <section 
      id={id} 
      className={cn("relative py-20 px-6 text-center bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">
            {subtitle}
          </p>
        )}

        {safeCtas.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
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

        {image && (
          <div className="mt-16 w-full">
            <img
              src={image.src}
              alt={image.alt || ""}
              className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};
