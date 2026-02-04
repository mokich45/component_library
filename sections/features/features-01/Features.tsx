import React from 'react';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Award,
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
  Rocket, Target, TrendingUp, Award, Zap, Shield, Users, Smartphone, Cloud, BarChart, Check, Star
};

export const FeaturesCards: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  items,
  className,
  id,
}) => {
  const safeItems = clampArray(items, 4);

  return (
    <section 
      id={id} 
      className={cn("py-24 px-6 bg-slate-900 dark:bg-gray-900 text-white", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safeItems.map((item, index) => {
            const Icon = item.iconName ? iconMap[item.iconName] : null;
            const gradientColor = item.gradientColor || "from-indigo-500 to-purple-500";
            
            return (
              <div
                key={index}
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Glow effect on hover */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl",
                    gradientColor
                  )}
                />
                
                {/* Card */}
                <div className="relative bg-slate-800 dark:bg-gray-800 p-8 rounded-2xl border border-slate-700 dark:border-gray-700 group-hover:border-slate-600 dark:group-hover:border-gray-600 transition-colors">
                  {Icon && (
                    <div className={cn(
                      "inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r mb-6",
                      gradientColor
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-3">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
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
