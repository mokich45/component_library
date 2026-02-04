import React, { useState } from 'react';
import { 
  MessageSquare, 
  PenTool, 
  Sparkles, 
  CheckCircle, 
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
  Lightbulb, 
  FileSearch, 
  Code, 
  Star, 
  Trophy, 
  Heart,
  Zap
} from 'lucide-react';
import { ProcessProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  PenTool,
  Sparkles,
  CheckCircle,
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
  Lightbulb,
  FileSearch,
  Code,
  Star,
  Trophy,
  Heart,
  Zap,
};

export const ProcessVariant3: React.FC<ProcessProps> = ({
  title,
  subtitle,
  badges,
  steps,
  activeStep: controlledActiveStep,
  defaultActiveStep = 0,
  onStepChange,
  showNavigation = true,
  navigationPrevLabel = "Назад",
  navigationNextLabel = "Далее",
  progressLineColor = "from-blue-600 to-purple-600",
  activeStepGradient = "from-blue-600 to-purple-600",
  inactiveStepBackground = "bg-slate-200 dark:bg-gray-700",
  detailsCardBackground = "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
  detailsCardBorder = "border-blue-100 dark:border-blue-800",
  titleTextColor = "text-slate-900 dark:text-white",
  subtitleTextColor = "text-slate-600 dark:text-gray-400",
  activeStepTitleColor = "text-slate-900 dark:text-white",
  inactiveStepTitleColor = "text-slate-400 dark:text-gray-500",
  stepDescriptionTextColor = "text-slate-500 dark:text-gray-400",
  detailsTitleColor = "text-slate-900 dark:text-white",
  detailsTextColor = "text-slate-700 dark:text-gray-300",
  className,
  id,
}) => {
  const [internalActiveStep, setInternalActiveStep] = useState(defaultActiveStep);
  const safeSteps = clampArray(steps, 8);
  const badge = badges?.[0];

  // Используем контролируемый или неконтролируемый режим
  const activeStep = controlledActiveStep !== undefined ? controlledActiveStep : internalActiveStep;
  const setActiveStep = (index: number) => {
    if (controlledActiveStep === undefined) {
      setInternalActiveStep(index);
    }
    onStepChange?.(index);
  };

  if (!safeSteps || safeSteps.length === 0) {
    return null;
  }

  const currentStep = safeSteps[activeStep];
  const IconComponent = currentStep?.iconName ? iconMap[currentStep.iconName] : null;

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

      {/* Горизонтальный степпер */}
      <div className="mb-12">
        <div className="relative">
          {/* Линия прогресса */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-slate-200 dark:bg-gray-700 hidden md:block">
            <div
              className={cn("h-full bg-gradient-to-r transition-all duration-500", progressLineColor)}
              style={{ width: `${(activeStep / (safeSteps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Шаги */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
            {safeSteps.map((step, index) => {
              const StepIconComponent = step.iconName ? iconMap[step.iconName] : null;
              const isActive = index <= activeStep;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                      isActive
                        ? cn("bg-gradient-to-br shadow-lg scale-110", activeStepGradient)
                        : inactiveStepBackground
                    )}
                  >
                    {StepIconComponent && (
                      <StepIconComponent
                        className={cn(
                          "w-8 h-8",
                          isActive ? "text-white" : "text-slate-400 dark:text-gray-500"
                        )}
                      />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <p
                      className={cn(
                        "font-semibold",
                        isActive ? activeStepTitleColor : inactiveStepTitleColor
                      )}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className={cn("text-sm mt-1", stepDescriptionTextColor)}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Детали активного шага */}
      {currentStep && (
        <div className={cn(
          "bg-gradient-to-br rounded-3xl p-8 md:p-12 border shadow-xl",
          detailsCardBackground,
          detailsCardBorder
        )}>
          <div className="flex items-start gap-6">
            {IconComponent && (
              <div className={cn(
                "flex-shrink-0 w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg",
                activeStepGradient
              )}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            )}
            <div className="flex-1">
              <h3 className={cn("text-2xl font-bold mb-4", detailsTitleColor)}>
                Шаг {activeStep + 1}: {currentStep.title}
              </h3>
              {currentStep.details && (
                <p className={cn("text-lg leading-relaxed", detailsTextColor)}>
                  {currentStep.details}
                </p>
              )}
            </div>
          </div>

          {/* Навигация */}
          {showNavigation && (
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-6 py-3 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors shadow-md"
              >
                {navigationPrevLabel}
              </button>
              <button
                onClick={() => setActiveStep(Math.min(safeSteps.length - 1, activeStep + 1))}
                disabled={activeStep === safeSteps.length - 1}
                className={cn(
                  "px-6 py-3 bg-gradient-to-r text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow",
                  activeStepGradient
                )}
              >
                {navigationNextLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
