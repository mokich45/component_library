import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const FaqAccordion: React.FC<FaqProps> = ({
  title,
  subtitle,
  badges,
  items,
  className,
  id,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const safeItems = clampArray(items, 10);

  return (
    <section 
      id={id} 
      className={cn("py-20 px-4 bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {safeItems.length > 0 ? (
          <div className="space-y-3">
            {safeItems.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-md dark:hover:shadow-lg"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium pr-4 text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "flex-shrink-0 size-5 text-gray-500 dark:text-gray-400 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                      {faq.answer}
                    </div>
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
      </div>
    </section>
  );
};
