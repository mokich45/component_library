import React from 'react';
import { Star, Quote } from 'lucide-react';
import { ProofProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

export const ProofTestimonials: React.FC<ProofProps> = ({
  title,
  subtitle,
  badges,
  testimonials,
  overallRating,
  className,
  id,
}) => {
  const safeTestimonials = clampArray(testimonials, 6);
  const rating = overallRating || 5;

  return (
    <section 
      id={id} 
      className={cn("w-full py-24 px-4 bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              {badges[0].text}
            </span>
          )}
          {overallRating && (
            <div className="inline-flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-6 h-6",
                    i < rating 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  )} 
                />
              ))}
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeTestimonials.map((testimonial, index) => {
            const rating = testimonial.rating || 5;
            
            return (
              <div 
                key={index} 
                className="relative bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 border border-transparent dark:border-gray-700"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200 dark:text-gray-700" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-4 h-4",
                        i < rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                      )} 
                    />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-gray-300 mb-6 relative z-10 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <img
                      src={testimonial.image.src}
                      alt={testimonial.image.alt || testimonial.name || ""}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="text-slate-900 dark:text-white font-medium">
                      {testimonial.name}
                    </div>
                    {testimonial.role && (
                      <div className="text-sm text-slate-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
