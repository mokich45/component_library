import React from 'react';
import { 
  CheckCircle2, 
  Rocket, 
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
  CheckCircle2,
  CheckCircle,
  Rocket,
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

export const ProcessVariant1: React.FC<ProcessProps> = ({
  title,
  subtitle,
  badges,
  steps,
  showVerticalLine = true,
  verticalLineGradient = "from-blue-500 via-purple-500 to-green-500",
  showStepNumbers = true,
  cardBackgroundColor = "bg-white dark:bg-gray-800",
  cardBorderColor = "border-slate-200 dark:border-gray-700",
  titleTextColor = "text-slate-900 dark:text-white",
  subtitleTextColor = "text-slate-600 dark:text-gray-400",
  stepTitleTextColor = "text-slate-900 dark:text-white",
  stepDescriptionTextColor = "text-slate-600 dark:text-gray-400",
  completedTextColor = "text-green-600 dark:text-green-400",
  numberBackgroundColor = "bg-white dark:bg-gray-800",
  numberTextColor = "text-slate-700 dark:text-gray-300",
  numberBorderColor = "border-slate-200 dark:border-gray-700",
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
      className={cn("max-w-6xl mx-auto px-4 py-16", className)}
    >
      <div className="text-center mb-16">
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
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

      <div className="relative">
        {/* Вертикальная линия */}
        {showVerticalLine && (
          <div className={cn(
            "absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b hidden md:block",
            verticalLineGradient
          )} />
        )}

        <div className="space-y-12">
          {safeSteps.map((step, index) => {
            const IconComponent = step.iconName ? iconMap[step.iconName] : null;
            const gradient = step.gradient || "from-blue-500 to-cyan-500";

            return (
              <div key={index} className="relative flex items-start gap-8">
                {/* Иконка с номером */}
                <div className="relative flex-shrink-0">
                  {IconComponent && (
                    <div className={cn(
                      "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg z-10 relative",
                      gradient
                    )}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  )}
                  {showStepNumbers && (
                    <div className={cn(
                      "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 z-20",
                      numberBackgroundColor,
                      numberBorderColor
                    )}>
                      <span className={cn("text-sm font-bold", numberTextColor)}>
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>

                {/* Контент */}
                <div className={cn(
                  "flex-1 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border",
                  cardBackgroundColor,
                  cardBorderColor
                )}>
                  <h3 className={cn("text-2xl font-bold mb-3", stepTitleTextColor)}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className={cn("leading-relaxed", stepDescriptionTextColor)}>
                      {step.description}
                    </p>
                  )}
                  {step.isCompleted && (
                    <div className={cn("mt-4 flex items-center gap-2 text-sm font-medium", completedTextColor)}>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{step.completedText || "Этап завершён"}</span>
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
