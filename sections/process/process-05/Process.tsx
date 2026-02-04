import React, { useState } from 'react';
import { 
  ChevronDown, 
  Briefcase, 
  Users2, 
  Code2, 
  BarChart3, 
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
  Lightbulb, 
  FileSearch, 
  Code, 
  MessageSquare, 
  PenTool, 
  Sparkles, 
  Search, 
  Layers, 
  Zap, 
  Trophy, 
  Star, 
  Heart
} from 'lucide-react';
import { ProcessProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ChevronDown,
  Briefcase,
  Users2,
  Code2,
  BarChart3,
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
  Lightbulb,
  FileSearch,
  Code,
  MessageSquare,
  PenTool,
  Sparkles,
  Search,
  Layers,
  Zap,
  Trophy,
  Star,
  Heart,
};

export const ProcessVariant5: React.FC<ProcessProps> = ({
  title,
  subtitle,
  badges,
  steps,
  defaultOpenIndex = 0,
  showProgress = true,
  progressLabel = "Прогресс изучения",
  progressGradient = "from-blue-500 to-purple-500",
  detailsCardBackground = "bg-white dark:bg-gray-800",
  detailsTextColor = "text-slate-700 dark:text-gray-300",
  titleTextColor = "text-slate-900 dark:text-white",
  subtitleTextColor = "text-slate-600 dark:text-gray-400",
  stepTitleTextColor = "text-slate-900 dark:text-white",
  stepDescriptionTextColor = "text-slate-600 dark:text-gray-400",
  className,
  id,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const safeSteps = clampArray(steps, 8);
  const badge = badges?.[0];

  if (!safeSteps || safeSteps.length === 0) {
    return null;
  }

  const progressPercentage = openIndex !== null 
    ? Math.round(((openIndex + 1) / safeSteps.length) * 100) 
    : 0;

  return (
    <section 
      id={id}
      className={cn("max-w-4xl mx-auto px-4 py-16", className)}
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

      <div className="space-y-4">
        {safeSteps.map((step, index) => {
          const isOpen = openIndex === index;
          const StepIconComponent = step.iconName ? iconMap[step.iconName] : null;
          const bgColor = step.bgColor || "bg-gray-50 dark:bg-gray-800";
          const iconBg = step.iconBg || "bg-blue-500 dark:bg-blue-600";

          return (
            <div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden border-2 transition-all duration-300",
                bgColor,
                isOpen 
                  ? "border-slate-300 dark:border-gray-600 shadow-xl" 
                  : "border-transparent shadow-md"
              )}
            >
              {/* Заголовок */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-6 flex items-center gap-4 text-left hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {StepIconComponent && (
                  <div className={cn(
                    "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg",
                    iconBg
                  )}>
                    <StepIconComponent className="w-7 h-7 text-white" />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className={cn("text-xl font-bold mb-1", stepTitleTextColor)}>
                    {step.title}
                  </h3>
                  {(step.shortDesc || step.description) && (
                    <p className={stepDescriptionTextColor}>
                      {step.shortDesc || step.description}
                    </p>
                  )}
                </div>

                <div className={cn(
                  "flex-shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}>
                  <ChevronDown className="w-6 h-6 text-slate-400 dark:text-gray-500" />
                </div>
              </button>

              {/* Раскрывающийся контент */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className={cn("rounded-xl p-6 shadow-inner", detailsCardBackground)}>
                    {step.detailsList && step.detailsList.length > 0 ? (
                      <ul className="space-y-3">
                        {step.detailsList.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <div className={cn(
                              "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
                              iconBg
                            )}>
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                            <span className={cn("leading-relaxed", detailsTextColor)}>
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : step.details ? (
                      <p className={cn("leading-relaxed", detailsTextColor)}>
                        {step.details}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Прогресс */}
      {showProgress && (
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className={cn("text-sm font-semibold", subtitleTextColor)}>
              {progressLabel}
            </span>
            <span className={cn("text-sm font-bold", progressGradient.replace('from-', 'text-').split(' ')[0])}>
              {progressPercentage}%
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full bg-gradient-to-r rounded-full transition-all duration-500",
                progressGradient
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
