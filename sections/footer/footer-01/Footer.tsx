import React from 'react';
import { Heart, Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { FooterProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Github, Twitter, Linkedin, Instagram, Facebook, Youtube
};

export const FooterCentered: React.FC<FooterProps> = ({
  logo,
  description,
  links,
  socialLinks,
  copyright,
  madeWith,
  className,
  id,
}) => {
  const safeLinks = clampArray(links, 10);
  const safeSocialLinks = clampArray(socialLinks, 6);

  return (
    <footer 
      id={id} 
      className={cn("bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700", className)}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Logo and Description */}
        {(logo || description) && (
          <div className="text-center mb-8">
            {logo && (
              <div className="inline-flex items-center gap-2 mb-4">
                {logo.image ? (
                  <img
                    src={logo.image.src}
                    alt={logo.image.alt || logo.text || ""}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className={cn(
                    "w-10 h-10 rounded-xl",
                    logo.gradientColor || "bg-gradient-to-br from-purple-500 to-pink-500"
                  )} />
                )}
                {logo.text && (
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {logo.text}
                  </span>
                )}
              </div>
            )}
            {description && (
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        {safeLinks.length > 0 && (
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
            {safeLinks.map((link, index) => {
              const href = link.href || (link.targetId ? `#${link.targetId}` : '#');
              return (
                <a
                  key={index}
                  href={href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        {/* Social Media */}
        {safeSocialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-8">
            {safeSocialLinks.map((socialLink, index) => {
              const Icon = socialLink.iconName ? iconMap[socialLink.iconName] : null;
              if (!Icon) return null;

              return (
                <a
                  key={index}
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        )}

        {/* Copyright */}
        <div className="text-center">
          {madeWith && (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 mb-2">
              {madeWith.text}
              {madeWith.iconName ? (() => {
                const Icon = iconMap[madeWith.iconName];
                return Icon ? <Icon className="w-4 h-4 text-red-500 fill-red-500" /> : <Heart className="w-4 h-4 text-red-500 fill-red-500" />;
              })() : <Heart className="w-4 h-4 text-red-500 fill-red-500" />}
            </p>
          )}
          {copyright && (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};
