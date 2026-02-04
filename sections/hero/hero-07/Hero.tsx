import React from 'react';
import { HeroProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const HeroGlass: React.FC<HeroProps> = ({
  badges,
  title,
  subtitle,
  note, // Используем для email
  ctas,
  className,
  id,
}) => {
  const safeCtas = clampArray(ctas, 2);
  const badge = badges?.[0];

  return (
    <div id={id} className={cn("relative z-10 w-full px-4 sm:px-0 py-20", className)}>
      <div className="absolute -inset-10 sm:-inset-20 opacity-20 blur-3xl pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(51,255,244,0.3)_0%,transparent_50%)]" />
      <div className="absolute -inset-10 sm:-inset-20 opacity-20 blur-3xl pointer-events-none bg-[radial-gradient(circle_at_70%_50%,rgba(169,110,255,0.25)_0%,transparent_50%)]" />

      <div className="relative backdrop-blur-2xl px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-14 max-w-[800px] mx-auto rounded-[20px] bg-white/5 border border-white/10">
        {badge && (
          <div className="mb-3 sm:mb-4">
            <span className="uppercase tracking-wider text-sm text-gray-400 font-normal" style={{ letterSpacing: '0.1em' }}>
              {badge.text}
            </span>
          </div>
        )}

        <h1 className="mb-4 sm:mb-6 text-white font-bold leading-tight text-4xl sm:text-6xl md:text-7xl" style={{ letterSpacing: '-0.02em' }}>
          {title}
        </h1>

        {subtitle && (
          <p className="mb-8 sm:mb-10 text-gray-400 font-normal leading-relaxed text-lg sm:text-xl">
            {subtitle}
            {note && <span className="text-cyan-400 ml-2">{note}</span>}
          </p>
        )}

        {safeCtas.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {safeCtas.map((cta, index) => {
              const isPrimary = cta.variant === 'primary' || index === 0;
              const href = cta.href || (cta.targetId ? `#${cta.targetId}` : undefined);

              return (
                <a
                  key={index}
                  href={href || "#"}
                  className={cn(
                    "relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg overflow-hidden group transition-all duration-300 w-full sm:w-auto text-center font-medium",
                    isPrimary ? "bg-white/10 border border-cyan-400/30 text-white" : "bg-transparent border border-white/20 text-white/90"
                  )}
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
