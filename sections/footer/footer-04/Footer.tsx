import React from 'react';
import { Send, Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { FooterProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Send, Facebook, Twitter, Instagram, Youtube, Linkedin, Github
};

export const FooterNewsletter: React.FC<FooterProps> = ({
  logo,
  columns,
  socialLinks,
  copyright,
  newsletter,
  className,
  id,
}) => {
  const safeColumns = clampArray(columns, 4);
  const safeSocialLinks = clampArray(socialLinks, 6);

  return (
    <footer 
      id={id} 
      className={cn("bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-700 text-white", className)}
    >
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        {newsletter && (
          <div className="py-12 border-b border-white/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-3">
                {newsletter.title || "Оставайтесь на связи"}
              </h2>
              {newsletter.subtitle && (
                <p className="text-white/90 mb-6">
                  {newsletter.subtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={newsletter.placeholder || "Введите ваш email"}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 placeholder:text-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-6 py-3 bg-white text-purple-600 dark:text-purple-700 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {newsletter.buttonLabel || "Подписаться"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Links Section */}
        {safeColumns.length > 0 && (
          <div className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {safeColumns.map((column, colIndex) => (
                <div key={colIndex}>
                  <h3 className="font-semibold mb-4">{column.title}</h3>
                  {column.links && column.links.length > 0 && (
                    <ul className="space-y-2 text-sm text-white/80">
                      {column.links.map((link, index) => {
                        const href = link.href || (link.targetId ? `#${link.targetId}` : '#');
                        return (
                          <li key={index}>
                            <a
                              href={href}
                              className="hover:text-white transition-colors"
                            >
                              {link.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/20">
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
                      logo.gradientColor || "bg-white"
                    )} />
                  )}
                  {logo.text && (
                    <span className="font-semibold">{logo.text}</span>
                  )}
                </div>
              )}

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
                        className="hover:scale-110 transition-transform"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}

              {copyright && (
                <p className="text-sm text-white/70">
                  {copyright}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
