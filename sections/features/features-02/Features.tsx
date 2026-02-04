import React from 'react';
import { 
  Zap, 
  Shield, 
  Users, 
  Smartphone, 
  Cloud, 
  BarChart,
  Check,
  Star,
  ZapOff,
  Settings,
  Heart,
  Globe
} from 'lucide-react';
import { FeaturesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Shield, Users, Smartphone, Cloud, BarChart, Check, Star, ZapOff, Settings, Heart, Globe
};

export const FeaturesGrid: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  badges,
  items,
  className,
  id,
}) => {
  const safeItems = clampArray(items, 6);
  const badge = badges?.[0];

  return (
    <section 
      id={id} 
      className={cn("py-24 px-6 bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badge && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              {badge.text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {safeItems.map((item, index) => {
            const Icon = item.iconName ? iconMap[item.iconName] : null;
            return (
              <div key={index} className="text-center p-6 transition-all duration-200 hover:transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {Icon ? <Icon className="w-8 h-8" /> : <Check className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
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
