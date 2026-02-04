import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import { FooterProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, MapPin, Clock, ArrowRight, Facebook, Instagram, Twitter, Linkedin, Send
};

export const FooterSplit: React.FC<FooterProps> = ({
  logo,
  description,
  contactInfo,
  columns,
  socialLinks,
  copyright,
  legalLinks,
  newsletter,
  className,
  id,
}) => {
  const safeColumns = clampArray(columns, 2);
  const safeSocialLinks = clampArray(socialLinks, 6);
  const safeLegalLinks = clampArray(legalLinks, 6);
  const defaultContactInfo = contactInfo || [];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      case 'clock': return Clock;
      default: return Mail;
    }
  };

  return (
    <footer 
      id={id} 
      className={cn("bg-gray-50 dark:bg-gray-900", className)}
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
          {/* Left Side - Company Info & Contact */}
          <div className="space-y-8">
            {/* Logo & Description */}
            {(logo || description) && (
              <div>
                {logo && (
                  <div className="flex items-center gap-2 mb-4">
                    {logo.image ? (
                      <img
                        src={logo.image.src}
                        alt={logo.image.alt || logo.text || ""}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className={cn(
                        "w-12 h-12 rounded-xl",
                        logo.gradientColor || "bg-gradient-to-br from-indigo-500 to-purple-600"
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
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Contact Info */}
            {defaultContactInfo.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Свяжитесь с нами
                </h3>
                <div className="space-y-3">
                  {defaultContactInfo.map((info, index) => {
                    const Icon = info.iconName ? iconMap[info.iconName] : getIconForType(info.type);
                    const primaryValue = info.values[0] || '';
                    const secondaryValue = info.values[1] || '';

                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {info.label}
                          </p>
                          {primaryValue && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {primaryValue}
                            </p>
                          )}
                          {secondaryValue && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {secondaryValue}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Links & Newsletter */}
          <div className="space-y-8">
            {/* Quick Links Grid */}
            {safeColumns.length > 0 && (
              <div className="grid grid-cols-2 gap-8">
                {safeColumns.map((column, colIndex) => (
                  <div key={colIndex}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      {column.title}
                    </h3>
                    {column.links && column.links.length > 0 && (
                      <ul className="space-y-2">
                        {column.links.map((link, index) => {
                          const href = link.href || (link.targetId ? `#${link.targetId}` : '#');
                          return (
                            <li key={index}>
                              <a
                                href={href}
                                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center gap-1 group"
                              >
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            )}

            {/* Newsletter */}
            {newsletter && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Новости и статьи
                </h3>
                {newsletter.subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {newsletter.subtitle}
                  </p>
                )}
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={newsletter.placeholder || "Ваш email"}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm"
                  />
                  <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors text-sm">
                    {newsletter.buttonLabel || "Подписаться"}
                  </button>
                </div>
                {newsletter.subtitle && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Отписаться можно в любой момент
                  </p>
                )}
              </div>
            )}

            {/* Social Media */}
            {safeSocialLinks.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Мы в соцсетях
                </h3>
                <div className="flex gap-3">
                  {safeSocialLinks.map((socialLink, index) => {
                    const Icon = socialLink.iconName ? iconMap[socialLink.iconName] : null;
                    if (!Icon) return null;

                    return (
                      <a
                        key={index}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        {(copyright || safeLegalLinks.length > 0) && (
          <div className="border-t border-gray-200 dark:border-gray-700 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {copyright && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {copyright}
                </p>
              )}
              {safeLegalLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  {safeLegalLinks.map((link, index) => {
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
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
