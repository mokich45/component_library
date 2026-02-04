import React from 'react';
import { 
  Award, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Shield, 
  Clock, 
  BadgeCheck, 
  Lock, 
  CheckCircle2, 
  Users, 
  Trophy, 
  Calendar, 
  Heart,
  Zap
} from 'lucide-react';
import { TrustProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  CheckCircle,
  CheckCircle2,
  Star,
  TrendingUp,
  Shield,
  Clock,
  BadgeCheck,
  Lock,
  Users,
  Trophy,
  Calendar,
  Heart,
  Zap,
};

export const TrustStrip4: React.FC<TrustProps> = ({
  title,
  achievements,
  backgroundColor = "bg-slate-100 dark:bg-gray-800",
  cardBackgroundColor = "bg-white dark:bg-gray-900",
  iconTextColor = "text-white",
  numberTextColor = "text-slate-900 dark:text-white",
  achievementTextColor = "text-slate-600 dark:text-gray-400",
  titleLabelColor = "text-slate-600 dark:text-gray-400",
  className,
  id,
}) => {
  const safeAchievements = clampArray(achievements, 8);

  if (!safeAchievements || safeAchievements.length === 0) {
    return null;
  }

  return (
    <div 
      id={id}
      className={cn("w-full py-16", backgroundColor, className)}
    >
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <h2 className={cn(
            "text-center text-sm uppercase tracking-wider mb-10",
            titleLabelColor
          )}>
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeAchievements.map((achievement, index) => {
            const IconComponent = achievement.iconName ? iconMap[achievement.iconName] : null;
            const gradient = achievement.gradient || "from-blue-400 to-indigo-500";

            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300",
                  cardBackgroundColor
                )}
              >
                {IconComponent && (
                  <div className={cn(
                    "w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center mb-4",
                    gradient
                  )}>
                    <IconComponent className={cn("w-7 h-7", iconTextColor)} />
                  </div>
                )}
                <div className={cn("text-4xl font-bold mb-1", numberTextColor)}>
                  {achievement.number}
                </div>
                <div className={achievementTextColor}>
                  {achievement.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
