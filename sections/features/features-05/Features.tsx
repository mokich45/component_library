import React from 'react';
import { Check } from 'lucide-react';
import { FeaturesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const FeaturesZigzag: React.FC<FeaturesProps> = ({
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
      className={cn("py-24 px-6 bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="space-y-32">
          {safeItems.map((item, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col gap-16 items-center",
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              )}
            >
              {item.image && (
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-2xl dark:opacity-10" />
                    <img
                      src={item.image.src}
                      alt={item.image.alt || item.title || ""}
                      className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1 w-full space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.benefits && item.benefits.length > 0 && (
                  <ul className="space-y-3">
                    {item.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
