import React from 'react';
import { TrendingUp, Users, Award, Zap, Star, Heart, CheckCircle, Shield } from 'lucide-react';
import { ProofProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Users, Award, Zap, Star, Heart, CheckCircle, Shield
};

export const ProofStatsGrid: React.FC<ProofProps> = ({
  title,
  subtitle,
  badges,
  stats,
  className,
  id,
}) => {
  if (!stats || stats.length === 0) return null;
  
  const safeStats = clampArray(stats, 4);
  const badge = badges?.[0];

  return (
    <section 
      id={id} 
      className={cn("w-full py-24 px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900", className)}
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
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safeStats.map((stat, index) => {
            const Icon = stat.iconName ? iconMap[stat.iconName] : null;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-transparent dark:border-gray-700"
              >
                {Icon && (
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 mb-6 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <Icon className="w-7 h-7" />
                  </div>
                )}
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-slate-900 dark:text-gray-200 mb-2">
                  {stat.label}
                </div>
                {stat.subValue && (
                  <div className="text-sm text-slate-500 dark:text-gray-400">
                    {stat.subValue}
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
