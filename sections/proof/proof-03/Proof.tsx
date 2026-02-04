import React from 'react';
import { ProofProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const ProofCompanies: React.FC<ProofProps> = ({
  title,
  subtitle,
  badges,
  companies,
  stats,
  className,
  id,
}) => {
  const safeCompanies = clampArray(companies, 8);
  const safeStats = clampArray(stats, 3);

  return (
    <section 
      id={id} 
      className={cn("w-full py-24 px-4 bg-slate-900 dark:bg-gray-900 text-white", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-900/30 rounded-full">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-400 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {safeCompanies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {safeCompanies.map((company, index) => {
              const colorClass = company.color || "text-white";
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-center h-24 bg-white/5 dark:bg-gray-800/50 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors border border-transparent dark:border-gray-700"
                >
                  {company.logo ? (
                    <img
                      src={company.logo.src}
                      alt={company.logo.alt || company.name || ""}
                      className="max-w-[120px] max-h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className={cn("text-2xl font-semibold opacity-80 hover:opacity-100 transition-opacity", colorClass)}>
                      {company.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {safeStats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {safeStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white/5 dark:bg-gray-800/50 rounded-xl border border-transparent dark:border-gray-700"
              >
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-slate-400 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
