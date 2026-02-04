import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Zap, 
  Trophy, 
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
  Star, 
  Heart
} from 'lucide-react';
import { ProcessProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Layers,
  Zap,
  Trophy,
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
  Star,
  Heart,
};

export const ProcessVariant4: React.FC<ProcessProps> = ({
  title,
  subtitle,
  badges,
  steps,
  showConnectingLine = true,
  connectingLineGradient = "from-cyan-500 via-purple-500 via-orange-500 to-green-500",
  showCTA = true,
  ctaLabel = "Начать проект",
  ctaHref,
  ctaTargetId,
  ctaGradient = "from-blue-600 to-purple-600",
  cardBackgroundGradient = "from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-700",
  numberTextColor = "text-slate-200 dark:text-gray-700",
  titleTextColor = "text-slate-900 dark:text-white",
  subtitleTextColor = "text-slate-600 dark:text-gray-400",
  stepTitleTextColor = "text-slate-900 dark:text-white",
  stepDescriptionTextColor = "text-slate-600 dark:text-gray-400",
  className,
  id,
}) => {
  const safeSteps = clampArray(steps, 8);
  const [lineWidth, setLineWidth] = useState(0);
  const badge = badges?.[0];

  // Анимация линии при монтировании
  useEffect(() => {
    const timer = setTimeout(() => {
      setLineWidth(100);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!safeSteps || safeSteps.length === 0) {
    return null;
  }

  const ctaHrefValue = ctaHref || (ctaTargetId ? `#${ctaTargetId}` : '#');

  return (
    <section 
      id={id}
      className={cn("max-w-7xl mx-auto px-4 py-16", className)}
    >
      <div className="text-center mb-20">
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
            {badge.text}
          </span>
        )}
        <h2 className={cn("text-4xl md:text-5xl font-bold mb-6", titleTextColor)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("text-lg md:text-xl max-w-2xl mx-auto", subtitleTextColor)}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {safeSteps.map((step, index) => {
          const IconComponent = step.iconName ? iconMap[step.iconName] : null;
          const gradient = step.gradient || "from-blue-500 to-cyan-500";
          const stepNumber = step.number || String(index + 1).padStart(2, '0');

          return (
            <div
              key={index}
              className="relative group"
            >
              {/* Анимированный фон */}
              <div className={cn(
                "absolute inset-0 rounded-3xl transform transition-transform duration-300 group-hover:scale-105",
                `bg-gradient-to-br ${cardBackgroundGradient}`
              )} />

              <div className="relative p-8">
                {/* Большой номер на фоне */}
                <div className={cn(
                  "absolute top-4 right-4 text-8xl font-bold opacity-50",
                  numberTextColor
                )}>
                  {stepNumber}
                </div>

                {/* Иконка с градиентом */}
                {IconComponent && (
                  <div className={cn(
                    "relative z-10 w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-5",
                    gradient
                  )}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                )}

                {/* Контент */}
                <h3 className={cn("text-2xl font-bold mb-3 relative z-10", stepTitleTextColor)}>
                  {step.title}
                </h3>
                {step.description && (
                  <p className={cn("leading-relaxed relative z-10", stepDescriptionTextColor)}>
                    {step.description}
                  </p>
                )}

                {/* Индикатор при наведении */}
                <div className={cn(
                  "absolute bottom-0 left-0 h-1 bg-gradient-to-r rounded-full transition-all duration-300 group-hover:w-full",
                  gradient,
                  "w-0"
                )} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Анимированная соединительная линия */}
      {showConnectingLine && (
        <div className="hidden lg:block relative h-2 mb-12">
          <div className={cn(
            "absolute inset-0 rounded-full opacity-30 bg-gradient-to-r",
            connectingLineGradient
          )} />
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-r transition-all duration-2000 ease-in-out",
              connectingLineGradient
            )}
            style={{ width: `${lineWidth}%` }}
          />
        </div>
      )}

      {/* CTA */}
      {showCTA && (
        <div className="text-center">
          <a
            href={ctaHrefValue}
            className={cn(
              "inline-block px-8 py-4 bg-gradient-to-r text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300",
              ctaGradient
            )}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </section>
  );
};
