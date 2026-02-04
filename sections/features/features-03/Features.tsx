import React from 'react';
import { FeaturesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const FeaturesList: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  items,
  className,
  id,
}) => {
  const safeItems = clampArray(items, 6);

  return (
    <section 
      id={id} 
      className={cn("py-24 px-6 bg-gray-50 dark:bg-gray-800", className)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="space-y-24">
          {safeItems.map((item, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col gap-12 items-center",
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              )}
            >
              {item.image && (
                <div className="flex-1 w-full">
                  <img
                    src={item.image.src}
                    alt={item.image.alt || item.title || ""}
                    className="w-full h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>
              )}
              <div className="flex-1 w-full">
                {item.badge && (
                  <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-sm mb-4 font-medium">
                    {item.badge}
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
