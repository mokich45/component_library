import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Sparkles,
  Rocket,
  Target,
  Globe,
  Lightbulb,
  HeartHandshake,
  Zap,
  Shield,
  Users,
  Check
} from 'lucide-react';
import { ServicesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Rocket, Target, Globe, Lightbulb, HeartHandshake, Zap, Shield, Users, Check
};

const fallbackServices = [
  { id: 'service-1', title: 'Service One', summary: 'Core service for launch', description: 'We provide a structured delivery with clear milestones.' },
  { id: 'service-2', title: 'Service Two', summary: 'Growth support', description: 'Optimization and iteration based on real-world feedback.' },
  { id: 'service-3', title: 'Service Three', summary: 'Ongoing maintenance', description: 'Continuous updates and support for stable operations.' },
];

export const ServicesAccordion: React.FC<ServicesProps> = ({
  title,
  subtitle,
  items,
  className,
  id,
}) => {
  const safeItems = clampArray(items && items.length > 0 ? items : fallbackServices, 6);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id={id} 
      className={cn("py-20 px-6 bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {safeItems.map((service, index) => {
            const Icon = service.iconName ? iconMap[service.iconName] : null;
            const isOpen = openIndex === index;

            return (
              <div
                key={service.id || index}
                className={cn(
                  "border rounded-xl px-6 transition-all duration-300",
                  isOpen
                    ? "border-indigo-500 dark:border-indigo-400 shadow-lg"
                    : "border-gray-200 dark:border-gray-700"
                )}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full hover:no-underline py-6 flex items-center gap-4 text-left"
                >
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {service.title}
                    </h3>
                    {service.summary && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {service.summary}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 flex-shrink-0",
                      isOpen && "transform rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="pb-6 pl-16 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {service.description && (
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Key Deliverables:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      {service.timeline && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Typical Timeline:{' '}
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {service.timeline}
                          </span>
                        </div>
                      )}
                      {service.ctas && service.ctas.length > 0 && (
                        <div className="flex gap-2">
                          {service.ctas.map((cta, ctaIndex) => {
                            const href = cta.href || (cta.targetId ? `#${cta.targetId}` : undefined);
                            const baseClasses = "px-5 py-2 rounded-lg transition-colors duration-300 text-sm font-medium";
                            const variantClasses = cta.variant === 'secondary'
                              ? "bg-transparent border border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/30"
                              : "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700";

                            return href ? (
                              <a
                                key={ctaIndex}
                                href={href}
                                className={cn(baseClasses, variantClasses)}
                              >
                                {cta.label}
                              </a>
                            ) : (
                              <button
                                key={ctaIndex}
                                className={cn(baseClasses, variantClasses)}
                              >
                                {cta.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
