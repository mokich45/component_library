import React, { useState } from 'react';
import { 
  Shield, 
  Award, 
  Medal, 
  BadgeCheck, 
  Zap, 
  Users, 
  CheckCircle, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Lock, 
  Clock, 
  Trophy, 
  Calendar, 
  Heart
} from 'lucide-react';
import { TrustProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Award,
  Medal,
  BadgeCheck,
  Zap,
  Users,
  CheckCircle,
  CheckCircle2,
  Star,
  TrendingUp,
  Lock,
  Clock,
  Trophy,
  Calendar,
  Heart,
};

export const TrustStrip5: React.FC<TrustProps> = ({
  titleLabel,
  badgeItems,
  backgroundGradientVertical = "from-white to-slate-50 dark:from-gray-900 dark:to-gray-800",
  cardBackgroundColor = "bg-white dark:bg-gray-800",
  badgeIconColor = "text-blue-600 dark:text-blue-400",
  badgeLabelColor = "text-slate-700 dark:text-gray-300",
  titleLabelColor = "text-slate-500 dark:text-gray-400",
  dividerColor = "bg-slate-300 dark:bg-gray-600",
  showBorder = true,
  borderColor = "border-slate-200 dark:border-gray-700",
  cardBorderColor = "border-slate-200 dark:border-gray-700",
  cardHoverBorderColor = "border-blue-300 dark:border-blue-500",
  className,
  id,
}) => {
  const safeBadgeItems = clampArray(badgeItems, 12);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!safeBadgeItems || safeBadgeItems.length === 0) {
    return null;
  }

  return (
    <div 
      id={id}
      className={cn(
        "w-full py-10 bg-gradient-to-b",
        backgroundGradientVertical,
        showBorder && `border-y ${borderColor}`,
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        {titleLabel && (
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className={cn("h-px w-12", dividerColor)}></div>
            <span className={cn("text-xs uppercase tracking-widest", titleLabelColor)}>
              {titleLabel}
            </span>
            <div className={cn("h-px w-12", dividerColor)}></div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {safeBadgeItems.map((badge, index) => {
            const IconComponent = badge.iconName ? iconMap[badge.iconName] : null;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer",
                  cardBackgroundColor,
                  hoveredIndex === index ? cardHoverBorderColor : cardBorderColor,
                  hoveredIndex === index && "shadow-md"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {IconComponent && (
                  <IconComponent className={cn("w-8 h-8 mb-2", badgeIconColor)} />
                )}
                <span className={cn("text-xs text-center font-medium", badgeLabelColor)}>
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
