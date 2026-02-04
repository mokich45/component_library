import React from 'react';
import { 
  CheckCircle2, 
  Star, 
  Users, 
  Trophy, 
  Shield, 
  Award, 
  Calendar, 
  Lock, 
  TrendingUp, 
  Heart,
  Zap,
  Clock,
  BadgeCheck
} from 'lucide-react';
import { TrustProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle2,
  Star,
  Users,
  Trophy,
  Shield,
  Award,
  Calendar,
  Lock,
  TrendingUp,
  Heart,
  Zap,
  Clock,
  BadgeCheck,
};

export const TrustStrip2: React.FC<TrustProps> = ({
  badges,
  backgroundColor = "bg-white dark:bg-gray-900",
  iconTextColor = "text-white",
  titleTextColor = "text-slate-900 dark:text-white",
  subtitleTextColor = "text-slate-500 dark:text-gray-400",
  showBorder = true,
  borderColor = "border-slate-200 dark:border-gray-700",
  className,
  id,
}) => {
  const safeBadges = clampArray(badges, 8);

  if (!safeBadges || safeBadges.length === 0) {
    return null;
  }

  return (
    <div 
      id={id}
      className={cn(
        "w-full py-10",
        backgroundColor,
        showBorder && `border-y ${borderColor}`,
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {safeBadges.map((badge, index) => {
            const IconComponent = badge.iconName ? iconMap[badge.iconName] : null;
            const badgeColor = badge.color || "bg-blue-500 dark:bg-blue-600";

            return (
              <div key={index} className="flex items-center gap-3">
                {IconComponent && (
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center shadow-lg",
                    badgeColor
                  )}>
                    <IconComponent className={cn("w-6 h-6", iconTextColor)} />
                  </div>
                )}
                <div>
                  <div className={cn("font-semibold", titleTextColor)}>
                    {badge.title}
                  </div>
                  {badge.subtitle && (
                    <div className={cn("text-sm", subtitleTextColor)}>
                      {badge.subtitle}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
