import React from 'react';
import {
  Palette,
  Code,
  Zap,
  Users,
  Shield,
  Smartphone,
  Sparkles,
  Rocket,
  Target,
  Globe,
  Lightbulb,
  HeartHandshake,
  Check
} from 'lucide-react';
import { ServicesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Code, Zap, Users, Shield, Smartphone, Sparkles, Rocket, Target, Globe, Lightbulb, HeartHandshake, Check
};

export const ServicesGrid: React.FC<ServicesProps> = ({
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
      className={cn("py-20 px-6 bg-white dark:bg-gray-900", className)}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeItems.map((service, index) => {
            const Icon = service.iconName ? iconMap[service.iconName] : null;

            return (
              <div
                key={service.id || index}
                className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {Icon && (
                  <div className="w-14 h-14 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-600 flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-indigo-500 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                )}
                {service.summary && !service.description && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.summary}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
