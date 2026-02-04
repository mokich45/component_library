import React from 'react';
import { 
  Shield, 
  Clock, 
  BadgeCheck, 
  Lock, 
  CheckCircle2, 
  Star, 
  Users, 
  Trophy, 
  Award, 
  Calendar, 
  TrendingUp, 
  Heart,
  Zap
} from 'lucide-react';
import { TrustProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Clock,
  BadgeCheck,
  Lock,
  CheckCircle2,
  Star,
  Users,
  Trophy,
  Award,
  Calendar,
  TrendingUp,
  Heart,
  Zap,
};

export const TrustStrip3: React.FC<TrustProps> = ({
  credentials,
  backgroundGradient = "from-slate-900 to-slate-800 dark:from-gray-950 dark:to-gray-900",
  iconColor = "text-emerald-400 dark:text-emerald-300",
  textColor = "text-white dark:text-gray-100",
  className,
  id,
}) => {
  const safeCredentials = clampArray(credentials, 8);

  if (!safeCredentials || safeCredentials.length === 0) {
    return null;
  }

  return (
    <div 
      id={id}
      className={cn(
        "w-full py-8 bg-gradient-to-r",
        backgroundGradient,
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {safeCredentials.map((cred, index) => {
            const IconComponent = cred.iconName ? iconMap[cred.iconName] : null;

            return (
              <div key={index} className={cn("flex items-center gap-3", textColor)}>
                {IconComponent && (
                  <IconComponent className={cn("w-6 h-6", iconColor)} />
                )}
                <span className={cn("font-medium text-sm md:text-base", textColor)}>
                  {cred.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
