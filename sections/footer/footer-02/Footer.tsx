import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube } from 'lucide-react';
import { FooterProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook, Twitter, Instagram, Linkedin, Github, Youtube
};

export const FooterMinimal: React.FC<FooterProps> = ({
  logo,
  links,
  socialLinks,
  copyright,
  className,
  id,
}) => {
  const safeLinks = clampArray(links, 8);
  const safeSocialLinks = clampArray(socialLinks, 6);

  return (
    <footer 
      id={id} 
      className={cn("bg-gray-900 dark:bg-gray-950 text-white py-8", className)}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          {logo && (
            <div className="flex items-center gap-2">
              {logo.image ? (
                <img
                  src={logo.image.src}
                  alt={logo.image.alt || logo.text || ""}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <div className={cn(
                  "w-8 h-8 rounded-lg",
                  logo.gradientColor || "bg-indigo-500"
                )} />
              )}
              {logo.text && (
                <span className="text-xl font-semibold">{logo.text}</span>
              )}
            </div>
          )}

          {/* Links */}
          {safeLinks.length > 0 && (
            <nav className="flex gap-6 flex-wrap justify-center">
              {safeLinks.map((link, index) => {
                const href = link.href || (link.targetId ? `#${link.targetId}` : '#');
                return (
                  <a
                    key={index}
                    href={href}
                    className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          )}

          {/* Social Icons */}
          {safeSocialLinks.length > 0 && (
            <div className="flex gap-4">
              {safeSocialLinks.map((socialLink, index) => {
                const Icon = socialLink.iconName ? iconMap[socialLink.iconName] : null;
                if (!Icon) return null;

                return (
                  <a
                    key={index}
                    href={socialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {copyright && (
          <div className="mt-8 pt-6 border-t border-gray-800 dark:border-gray-700 text-center text-sm text-gray-400 dark:text-gray-500">
            <p>{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
};
