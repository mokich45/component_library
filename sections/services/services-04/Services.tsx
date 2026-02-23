import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServicesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const fallbackServices = [
  { id: 'service-1', number: '01', title: 'Service One', summary: 'Core launch package' },
  { id: 'service-2', number: '02', title: 'Service Two', summary: 'Growth package' },
  { id: 'service-3', number: '03', title: 'Service Three', summary: 'Support package' },
];

export const ServicesMinimal: React.FC<ServicesProps> = ({
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
      className={cn("py-20 px-6 bg-black dark:bg-gray-900 text-white", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 dark:text-gray-500 text-xl max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 dark:bg-gray-700">
          {safeItems.map((service, index) => {
            const primaryCta = service.ctas?.[0];
            const href = primaryCta?.href || (primaryCta?.targetId ? `#${primaryCta.targetId}` : undefined);
            const linkText = primaryCta?.label || "Learn More";

            return (
              <div
                key={service.id || index}
                className="group bg-black dark:bg-gray-900 p-8 hover:bg-gray-900 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {service.number && (
                  <div className="text-gray-600 dark:text-gray-500 text-sm mb-8">
                    {service.number}
                  </div>
                )}
                
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {(service.description || service.summary) && (
                  <p className="text-gray-400 dark:text-gray-500 mb-8 leading-relaxed">
                    {service.description || service.summary}
                  </p>
                )}
                
                {primaryCta && (
                  <div>
                    {href ? (
                      <a
                        href={href}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-300"
                      >
                        {linkText}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </a>
                    ) : (
                      <button className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-300">
                        {linkText}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </button>
                    )}
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
