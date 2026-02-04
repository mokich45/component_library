import React, { useState } from 'react';
import { FaqProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const FaqCards: React.FC<FaqProps> = ({
  title,
  subtitle,
  badges,
  items,
  ctas,
  className,
  id,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const safeItems = clampArray(items, 8);
  const primaryCta = ctas?.[0];
  const secondaryCta = ctas?.[1];

  return (
    <section 
      id={id} 
      className={cn("py-16 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900", className)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-full text-sm mb-4 font-medium">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {subtitle}
            </p>
          )}
        </div>
        
        {safeItems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {safeItems.map((item, index) => {
              const isHighlighted = item.highlight || false;
              const isHovered = hoveredIndex === index;
              const number = item.number || String(index + 1).padStart(2, '0');

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative group",
                    isHighlighted && "md:col-span-2"
                  )}
                >
                  <div
                    className={cn(
                      "h-full rounded-2xl p-8 transition-all duration-300",
                      isHighlighted
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white"
                        : isHovered
                          ? "bg-white dark:bg-gray-800 shadow-xl border-2 border-rose-200 dark:border-rose-800"
                          : "bg-white dark:bg-gray-800 shadow-sm border-2 border-gray-100 dark:border-gray-700"
                    )}
                  >
                    {/* Большой номер */}
                    <div
                      className={cn(
                        "text-7xl mb-4 transition-all duration-300 font-bold",
                        isHighlighted
                          ? "text-white/30"
                          : "text-gray-100 dark:text-gray-700"
                      )}
                    >
                      {number}
                    </div>

                    {/* Вопрос */}
                    <h3
                      className={cn(
                        "text-2xl mb-4 font-semibold",
                        isHighlighted
                          ? "text-white"
                          : "text-gray-900 dark:text-white"
                      )}
                    >
                      {item.question}
                    </h3>

                    {/* Ответ */}
                    <p
                      className={cn(
                        "leading-relaxed text-lg",
                        isHighlighted
                          ? "text-white/90"
                          : "text-gray-600 dark:text-gray-400"
                      )}
                    >
                      {item.answer}
                    </p>

                    {/* Декоративный элемент */}
                    {!isHighlighted && (
                      <div
                        className={cn(
                          "absolute top-8 right-8 size-12 rounded-full transition-all duration-300",
                          isHovered
                            ? "bg-rose-100 dark:bg-rose-900/30 scale-100"
                            : "bg-gray-50 dark:bg-gray-700 scale-0"
                        )}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Нет доступных вопросов
          </div>
        )}

        {/* CTA секция */}
        {(primaryCta || secondaryCta) && (
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Нужна дополнительная информация?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {primaryCta && (
                <a
                  href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
                  className={cn(
                    "inline-block px-8 py-4 rounded-xl font-medium transition-colors shadow-lg",
                    primaryCta.variant === "secondary"
                      ? "bg-white dark:bg-gray-800 text-rose-500 dark:text-rose-400 border-2 border-rose-500 dark:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      : "bg-rose-500 dark:bg-rose-600 text-white hover:bg-rose-600 dark:hover:bg-rose-700 shadow-rose-500/30 dark:shadow-rose-600/30"
                  )}
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href || (secondaryCta.targetId ? `#${secondaryCta.targetId}` : '#')}
                  className="inline-block px-8 py-4 bg-white dark:bg-gray-800 text-rose-500 dark:text-rose-400 border-2 border-rose-500 dark:border-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors font-medium"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
