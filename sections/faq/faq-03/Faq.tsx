import React, { useState } from 'react';
import { Clock, CreditCard, MapPin, Shield, Users, Phone, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { FaqProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, CreditCard, MapPin, Shield, Users, Phone, Mail, MessageSquare, HelpCircle
};

const fallbackFaqItems = [
  { question: 'How long does setup take?', answer: 'Initial setup usually takes a few business days depending on scope.' },
  { question: 'Can we customize the content?', answer: 'Yes, all blocks are designed to accept custom copy and structure.' },
  { question: 'Is mobile layout included?', answer: 'Yes, each section is built to work on desktop and mobile by default.' },
];

export const FaqGrid: React.FC<FaqProps> = ({
  title,
  subtitle,
  badges,
  items,
  className,
  id,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const safeItems = clampArray(items && items.length > 0 ? items : fallbackFaqItems, 9);

  return (
    <section 
      id={id} 
      className={cn("py-16 px-4 bg-slate-900 dark:bg-gray-950 text-white", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-300 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        {safeItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const Icon = item.iconName ? iconMap[item.iconName] : HelpCircle;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative bg-slate-800 dark:bg-gray-900 rounded-2xl p-6 transition-all duration-300 cursor-pointer border border-transparent dark:border-gray-800",
                    isHovered
                      ? "transform -translate-y-2 shadow-2xl shadow-blue-500/20"
                      : "shadow-lg"
                  )}
                >
                  <div
                    className={cn(
                      "inline-flex items-center justify-center size-12 rounded-xl mb-4 transition-colors duration-300",
                      isHovered
                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                        : "bg-slate-700 dark:bg-gray-800 text-blue-400 dark:text-blue-500"
                    )}
                  >
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">{item.question}</h3>
                  <p className="text-slate-300 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>

                  {isHovered && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 dark:border-blue-400 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 dark:text-gray-500">
            Нет доступной информации
          </div>
        )}
      </div>
    </section>
  );
};
