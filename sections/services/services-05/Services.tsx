import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ServicesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

interface ServiceCategory {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  ctas?: ServiceItem['ctas'];
}

interface ServicesTabsProps extends ServicesProps {
  categories: ServiceCategory[];
}

export const ServicesTabs: React.FC<ServicesProps> = ({
  title,
  subtitle,
  categories,
  className,
  id,
}) => {
  const fallbackCategories = [
    {
      id: 'core',
      label: 'Core',
      title: 'Core Service',
      subtitle: 'Foundation package',
      description: 'Baseline implementation to launch your section flow.',
      features: ['Structure setup', 'Content wiring', 'Responsive layout'],
    },
    {
      id: 'growth',
      label: 'Growth',
      title: 'Growth Service',
      subtitle: 'Optimization package',
      description: 'Improvements focused on UX, conversion and scaling.',
      features: ['CTA optimization', 'Messaging refresh', 'Performance tuning'],
    },
    {
      id: 'support',
      label: 'Support',
      title: 'Support Service',
      subtitle: 'Maintenance package',
      description: 'Support after launch with predictable iterations.',
      features: ['Issue triage', 'Weekly updates', 'Stability checks'],
    },
  ];
  
  const safeCategories = clampArray(categories && categories.length > 0 ? categories : fallbackCategories, 4);
  const [activeTab, setActiveTab] = useState(safeCategories[0]?.id || '');

  const activeCategory = safeCategories.find(cat => cat.id === activeTab) || safeCategories[0];

  if (!activeCategory) return null;

  return (
    <section 
      id={id} 
      className={cn("py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900", className)}
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

        <div className="w-full">
          {/* Tabs List */}
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm h-auto">
            {safeCategories.map((category) => {
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={cn(
                    "py-3 px-4 rounded-lg transition-colors duration-300 text-sm font-medium",
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {activeCategory.title}
                </h3>
                {activeCategory.subtitle && (
                  <p className="text-indigo-600 dark:text-indigo-400 mb-6 font-medium">
                    {activeCategory.subtitle}
                  </p>
                )}
                {activeCategory.description && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    {activeCategory.description}
                  </p>
                )}
                {activeCategory.ctas && activeCategory.ctas.length > 0 && (
                  <div className="flex gap-3">
                    {activeCategory.ctas.map((cta, index) => {
                      const href = cta.href || (cta.targetId ? `#${cta.targetId}` : undefined);
                      const baseClasses = "px-6 py-3 rounded-lg transition-colors duration-300 font-medium";
                      const variantClasses = cta.variant === 'secondary'
                        ? "bg-transparent border border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/30"
                        : "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700";

                      return href ? (
                        <a
                          key={index}
                          href={href}
                          className={cn(baseClasses, variantClasses)}
                        >
                          {cta.label}
                        </a>
                      ) : (
                        <button
                          key={index}
                          className={cn(baseClasses, variantClasses)}
                        >
                          {cta.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {activeCategory.features && activeCategory.features.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
                    What's Included:
                  </h4>
                  <div className="space-y-4">
                    {activeCategory.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
