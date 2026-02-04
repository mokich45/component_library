import React, { useState } from 'react';
import { 
  Code, 
  Palette, 
  Gauge, 
  Lock,
  Zap,
  Shield,
  Users,
  Smartphone,
  Cloud,
  BarChart,
  Check,
  Star
} from 'lucide-react';
import { FeaturesProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, Palette, Gauge, Lock, Zap, Shield, Users, Smartphone, Cloud, BarChart, Check, Star
};

export const FeaturesTabs: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  tabs,
  className,
  id,
}) => {
  if (!tabs || tabs.length === 0) return null;
  
  const safeTabs = clampArray(tabs, 4);
  const [activeTab, setActiveTab] = useState(0);

  const activeContent = safeTabs[activeTab];
  const ActiveIcon = activeContent?.iconName ? iconMap[activeContent.iconName] : null;

  if (!activeContent) return null;

  return (
    <section 
      id={id} 
      className={cn("py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {safeTabs.map((tab, index) => {
              const Icon = tab.iconName ? iconMap[tab.iconName] : null;
              const isActive = activeTab === index;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex-1 min-w-[140px] px-6 py-4 flex items-center justify-center gap-2 transition-colors relative",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="font-medium">{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1 space-y-6">
                {ActiveIcon && (
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <ActiveIcon className="w-8 h-8" />
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {activeContent.title}
                </h3>
                {activeContent.description && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {activeContent.description}
                  </p>
                )}
              </div>
              
              {activeContent.features && activeContent.features.length > 0 && (
                <div className="flex-1 w-full">
                  <ul className="space-y-4">
                    {activeContent.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
