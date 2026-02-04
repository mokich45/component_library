import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { PortfolioProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const PortfolioMasonry: React.FC<PortfolioProps> = ({
  title,
  subtitle,
  badges,
  items,
  className,
  id,
}) => {
  const safeItems = clampArray(items, 12);

  if (safeItems.length === 0) {
    return (
      <section 
        id={id} 
        className={cn("py-20 px-4 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900", className)}
      >
        <div className="max-w-7xl mx-auto text-center text-gray-500 dark:text-gray-400">
          Нет доступных проектов
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id} 
      className={cn("py-20 px-4 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-pink-600 uppercase bg-pink-100 rounded-full dark:bg-pink-900/30 dark:text-pink-400">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Masonry Grid using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {safeItems.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 break-inside-avoid mb-5"
            >
              {item.image ? (
                <img
                  src={item.image.src}
                  alt={item.image.alt || item.title}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {item.category && (
                    <span className="inline-block px-3 py-1 bg-pink-500 dark:bg-pink-600 rounded-full text-sm mb-2 font-medium">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  {(item.likes !== undefined || item.comments !== undefined) && (
                    <div className="flex gap-4 items-center">
                      {item.likes !== undefined && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-5 h-5" />
                          <span>{item.likes}</span>
                        </div>
                      )}
                      {item.comments !== undefined && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-5 h-5" />
                          <span>{item.comments}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-200 dark:text-gray-300 mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
