import React from 'react';
import { Trophy, Shield, Award, Medal, CheckCircle, Star } from 'lucide-react';
import { ProofProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, Shield, Award, Medal, CheckCircle, Star
};

export const ProofAwards: React.FC<ProofProps> = ({
  title,
  subtitle,
  badges,
  awards,
  certifications,
  note,
  className,
  id,
}) => {
  const safeAwards = clampArray(awards, 4);
  const safeCertifications = clampArray(certifications, 4);
  const badge = badges?.[0];

  return (
    <section 
      id={id} 
      className={cn("w-full py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badge && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              {badge.text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Awards Grid */}
        {safeAwards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {safeAwards.map((award, index) => {
              const Icon = award.iconName ? iconMap[award.iconName] : Trophy;
              const colorClass = award.gradientColor || "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400";
              
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-transparent dark:border-gray-700"
                >
                  <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4", colorClass)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {award.title}
                  </div>
                  {award.organization && (
                    <div className="text-sm text-slate-600 dark:text-gray-400 mb-1">
                      {award.organization}
                    </div>
                  )}
                  {award.year && (
                    <div className="text-xs text-slate-500 dark:text-gray-500">
                      {award.year}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Certifications */}
        {safeCertifications.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-transparent dark:border-gray-700">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Certified & Compliant
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {safeCertifications.map((cert, index) => {
                const Icon = cert.iconName ? iconMap[cert.iconName] : Shield;
                
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-slate-600 dark:text-gray-400" />
                    </div>
                    <div className="text-slate-900 dark:text-white mb-1 font-medium">
                      {cert.name}
                    </div>
                    {cert.description && (
                      <div className="text-sm text-slate-500 dark:text-gray-400">
                        {cert.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {note && (
              <div className="mt-12 text-center">
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {note}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
