import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FaqProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const fallbackFaqItems = [
  { question: 'How long does setup take?', answer: 'Initial setup usually takes a few business days depending on scope.' },
  { question: 'Can we customize the content?', answer: 'Yes, all blocks are designed to accept custom copy and structure.' },
  { question: 'Is mobile layout included?', answer: 'Yes, each section is built to work on desktop and mobile by default.' },
];

export const FaqPlus: React.FC<FaqProps> = ({
  title,
  subtitle,
  badges,
  items,
  ctas,
  className,
  id,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const safeItems = clampArray(items && items.length > 0 ? items : fallbackFaqItems, 10);
  const primaryCta = ctas?.[0];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id={id} 
      className={cn("py-16 px-4 bg-gray-50 dark:bg-gray-900", className)}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm mb-4 font-medium">
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-transparent dark:border-gray-700">
            {safeItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <span className="pr-4 flex-1 font-medium text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                    <div
                      className={cn(
                        "size-6 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-200",
                        isOpen
                          ? "bg-green-500 dark:bg-green-600 text-white rotate-45"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                      )}
                    >
                      <Plus className="size-4" />
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-0">
                      <div className="pl-0 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  )}
                  
                  {index < safeItems.length - 1 && (
                    <div className="mx-6 border-t border-gray-100 dark:border-gray-700" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center text-gray-500 dark:text-gray-400">
            Нет доступных вопросов
          </div>
        )}
        
        {primaryCta && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Остались вопросы?
            </p>
            {primaryCta && (
              <a
                href={primaryCta.href || (primaryCta.targetId ? `#${primaryCta.targetId}` : '#')}
                className={cn(
                  "inline-block px-6 py-3 rounded-lg font-medium transition-colors",
                  primaryCta.variant === "secondary"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                    : "bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700"
                )}
              >
                {primaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
