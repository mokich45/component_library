import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServicesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const fallbackServices = [
  { id: 'service-1', title: 'Service One', summary: 'Core launch package' },
  { id: 'service-2', title: 'Service Two', summary: 'Growth package' },
  { id: 'service-3', title: 'Service Three', summary: 'Support package' },
];

export const ServicesHorizontal: React.FC<ServicesProps> = ({
  title,
  subtitle,
  items,
  className,
  id,
}) => {
  const safeItems = clampArray(items && items.length > 0 ? items : fallbackServices, 6);

  return (
    <section 
      id={id} 
      className={cn("py-20 px-6 bg-gray-50 dark:bg-gray-800", className)}
    >
      <div className="max-w-7xl mx-auto">
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
        
        <div className="space-y-8">
          {safeItems.map((service, index) => {
            const primaryCta = service.ctas?.[0];
            const href = primaryCta?.href || (primaryCta?.targetId ? `#${primaryCta.targetId}` : undefined);

            return (
              <div
                key={service.id || index}
                className={cn(
                  "group flex flex-col gap-8 items-center bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500",
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                )}
              >
                {service.image && (
                  <div className="w-full lg:w-1/2 h-80 overflow-hidden">
                    <img
                      src={service.image.src}
                      alt={service.image.alt || service.title || ""}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                
                <div className="w-full lg:w-1/2 p-8 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  {(service.description || service.summary) && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {service.description || service.summary}
                    </p>
                  )}
                  
                  {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {primaryCta && (
                    <div>
                      {href ? (
                        <a
                          href={href}
                          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 group-hover:gap-4 transition-all duration-300 font-medium"
                        >
                          {primaryCta.label}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 group-hover:gap-4 transition-all duration-300 font-medium">
                          {primaryCta.label}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
