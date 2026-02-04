import React from 'react';
import { 
  Shield, 
  Award, 
  Calendar, 
  CheckCircle, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Lock, 
  Users, 
  Zap, 
  Heart, 
  Trophy, 
  Clock, 
  BadgeCheck 
} from 'lucide-react';
import { TrustProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Award,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Star,
  TrendingUp,
  Lock,
  Users,
  Zap,
  Heart,
  Trophy,
  Clock,
  BadgeCheck,
};

export const TrustStrip1: React.FC<TrustProps> = ({
  stats,
  backgroundColor = "bg-slate-50 dark:bg-gray-800",
  iconBackgroundColor = "bg-blue-600 dark:bg-blue-700",
  iconTextColor = "text-white",
  valueTextColor = "text-slate-900 dark:text-white",
  labelTextColor = "text-slate-600 dark:text-gray-400",
  className,
  id,
}) => {
  const safeStats = clampArray(stats, 8);

  if (!safeStats || safeStats.length === 0) {
    return null;
  }

  return (
    <div 
      id={id}
      className={cn("w-full py-12", backgroundColor, className)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {safeStats.map((stat, index) => {
            const IconComponent = stat.iconName ? iconMap[stat.iconName] : null;

            return (
              <div key={index} className="flex flex-col items-center text-center">
                {IconComponent && (
                  <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4", iconBackgroundColor)}>
                    <IconComponent className={cn("w-8 h-8", iconTextColor)} />
                  </div>
                )}
                <div className={cn("text-3xl font-bold mb-1", valueTextColor)}>
                  {stat.value}
                </div>
                <div className={cn("text-sm", labelTextColor)}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
