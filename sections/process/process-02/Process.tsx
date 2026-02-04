import React from 'react';
import { 
  Lightbulb, 
  FileSearch, 
  Code, 
  Rocket, 
  CheckCircle2, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  Award, 
  Calendar, 
  Lock, 
  Clock, 
  BadgeCheck, 
  CheckCircle, 
  Star, 
  Trophy, 
  Heart,
  Zap
} from 'lucide-react';
import { ProcessProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  FileSearch,
  Code,
  Rocket,
  CheckCircle2,
  CheckCircle,
  Users,
  Target,
  TrendingUp,
  Shield,
  Award,
  Calendar,
  Lock,
  Clock,
  BadgeCheck,
  Star,
  Trophy,
  Heart,
  Zap,
};

export const ProcessVariant2: React.FC<ProcessProps> = ({
  title,
  subtitle,
  badges,
  steps,
  showStepNumbers = true,
  showArrows = true,
  arrowColor = "text-slate-400 dark:text-gray-500",
  titleTextColor = "text-slate-900 dark:text-white",
  subtitleTextColor = "text-slate-600 dark:text-gray-400",
  stepTitleTextColor = "text-slate-900 dark:text-white",
  stepDescriptionTextColor = "text-slate-600 dark:text-gray-400",
  numberBackgroundColor = "bg-white dark:bg-gray-800",
  numberTextColor = "text-slate-900 dark:text-white",
  numberBorderColor = "border-slate-900 dark:border-gray-300",
  iconBackgroundColor = "bg-white dark:bg-gray-800",
  className,
  id,
}) => {
  const safeSteps = clampArray(steps, 8);
  const badge = badges?.[0];

  if (!safeSteps || safeSteps.length === 0) {
    return null;
  }

  return (
    <section 
      id={id}
      className={cn("max-w-7xl mx-auto px-4 py-16", className)}
    >
      <div className="text-center mb-16">
        {badge && (
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            {badge.text}
          </span>
        )}
        <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", titleTextColor)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("text-lg md:text-xl max-w-2xl mx-auto", subtitleTextColor)}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {safeSteps.map((step, index) => {
          const IconComponent = step.iconName ? iconMap[step.iconName] : null;
          const bgColor = step.bgColor || "bg-gray-50 dark:bg-gray-800";
          const iconColor = step.iconColor || "text-gray-600 dark:text-gray-400";
          const borderColor = step.borderColor || "border-gray-200 dark:border-gray-700";

          return (
            <div
              key={index}
              className={cn(
                "relative rounded-2xl p-8 border-2 hover:scale-105 transition-transform duration-300",
                bgColor,
                borderColor
              )}
            >
              {/* Номер шага */}
              {showStepNumbers && (
                <div className={cn(
                  "absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2",
                  numberBackgroundColor,
                  numberBorderColor
                )}>
                  <span className={cn("text-xl font-bold", numberTextColor)}>
                    {index + 1}
                  </span>
                </div>
              )}

              {/* Иконка */}
              {IconComponent && (
                <div className="mb-6 mt-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shadow-md",
                    iconBackgroundColor
                  )}>
                    <IconComponent className={cn("w-8 h-8", iconColor)} />
                  </div>
                </div>
              )}

              {/* Контент */}
              <h3 className={cn("text-xl font-bold mb-3", stepTitleTextColor)}>
                {step.title}
              </h3>
              {step.description && (
                <p className={cn("leading-relaxed", stepDescriptionTextColor)}>
                  {step.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Стрелки между карточками (только на больших экранах) */}
      {showArrows && safeSteps.length > 1 && (
        <div className="hidden lg:flex justify-center items-center gap-8 mt-8">
          {[...Array(safeSteps.length - 1)].map((_, i) => (
            <div key={i} className="flex-1 flex items-center justify-center">
              <div className={cn("w-full h-0.5 bg-slate-300 dark:bg-gray-600")} />
              <div 
                className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12"
                style={{
                  borderLeftColor: arrowColor.includes('slate-400') 
                    ? 'rgb(148 163 184)' 
                    : arrowColor.includes('gray-500')
                    ? 'rgb(107 114 128)'
                    : 'rgb(148 163 184)'
                }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
