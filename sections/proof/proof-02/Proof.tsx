import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProofProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const ProofCaseStudies: React.FC<ProofProps> = ({
  title,
  subtitle,
  badges,
  caseStudies,
  className,
  id,
}) => {
  const safeCaseStudies = clampArray(caseStudies, 4);
  const badge = badges?.[0];

  return (
    <section 
      id={id} 
      className={cn("w-full py-24 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badge && (
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-sm mb-4 font-medium">
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

        <div className="space-y-12">
          {safeCaseStudies.map((study, index) => {
            const primaryCta = study.ctas?.[0];
            const href = primaryCta?.href || (primaryCta?.targetId ? `#${primaryCta.targetId}` : undefined);
            const ctaLabel = primaryCta?.label || "Read full case study";

            return (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-transparent dark:border-gray-700"
              >
                {study.image && (
                  <div className="relative h-80 md:h-auto">
                    <img
                      src={study.image.src}
                      alt={study.image.alt || study.company || ""}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="text-white text-2xl font-bold mb-1">
                        {study.company}
                      </div>
                      {study.industry && (
                        <div className="text-white/80">{study.industry}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {study.challenge && (
                    <>
                      <div className="text-sm text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2 font-medium">
                        The Challenge
                      </div>
                      <p className="text-xl text-slate-700 dark:text-gray-300 mb-6">
                        {study.challenge}
                      </p>
                    </>
                  )}

                  {study.results && study.results.length > 0 && (
                    <>
                      <div className="text-sm text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3 font-medium">
                        The Results
                      </div>
                      <div className="space-y-3 mb-6">
                        {study.results.map((result, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-gray-300">{result}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {study.quote && (
                    <div className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 py-2 mb-6">
                      <p className="text-lg text-slate-900 dark:text-white italic">"{study.quote}"</p>
                    </div>
                  )}

                  {primaryCta && (
                    <div>
                      {href ? (
                        <a
                          href={href}
                          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all font-medium"
                        >
                          {ctaLabel}
                          <ArrowRight className="w-5 h-5" />
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all font-medium">
                          {ctaLabel}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
