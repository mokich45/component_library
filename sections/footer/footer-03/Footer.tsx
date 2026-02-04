import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { FooterProps } from '../types';
import { cn, clampArray } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Github
};

export const FooterMultiColumn: React.FC<FooterProps> = ({
  description,
  columns,
  copyright,
  legalLinks,
  className,
  id,
}) => {
  const safeColumns = clampArray(columns, 4);
  const safeLegalLinks = clampArray(legalLinks, 6);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      default: return Mail;
    }
  };

  return (
    <footer 
      id={id} 
      className={cn("bg-slate-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400", className)}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safeColumns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="text-white dark:text-white text-lg font-semibold mb-4">
                {column.title}
              </h3>
              
              {column.description && (
                <p className="text-sm mb-4 leading-relaxed text-gray-300 dark:text-gray-400">
                  {column.description}
                </p>
              )}

              {column.socialLinks && column.socialLinks.length > 0 && (
                <div className="flex gap-3 mb-4">
                  {column.socialLinks.map((socialLink, index) => {
                    const Icon = socialLink.iconName ? iconMap[socialLink.iconName] : null;
                    if (!Icon) return null;

                    const hoverColors = [
                      'hover:bg-blue-600',
                      'hover:bg-blue-400',
                      'hover:bg-pink-600',
                      'hover:bg-red-600'
                    ];
                    const hoverColor = hoverColors[index % hoverColors.length];

                    return (
                      <a
                        key={index}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-9 h-9 bg-slate-800 dark:bg-gray-800 rounded-full flex items-center justify-center transition-colors",
                          hoverColor
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}

              {column.links && column.links.length > 0 && (
                <ul className="space-y-2">
                  {column.links.map((link, index) => {
                    const href = link.href || (link.targetId ? `#${link.targetId}` : '#');
                    return (
                      <li key={index}>
                        <a
                          href={href}
                          className="text-sm hover:text-white dark:hover:text-gray-200 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}

              {column.contactInfo && column.contactInfo.length > 0 && (
                <ul className="space-y-3">
                  {column.contactInfo.map((contact, index) => {
                    const Icon = contact.iconName ? iconMap[contact.iconName] : getIconForType(contact.type);
                    return (
                      <li key={index} className="flex gap-3 text-sm">
                        <Icon className="w-5 h-5 flex-shrink-0 text-indigo-400 dark:text-indigo-500" />
                        <span className="text-gray-300 dark:text-gray-400">{contact.value}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {column.newsletter && (
                <div className="mt-6">
                  <h4 className="text-white dark:text-white text-sm font-semibold mb-2">
                    Подпишитесь на новости
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder={column.newsletter.placeholder || "Email"}
                      className="flex-1 px-3 py-2 bg-slate-800 dark:bg-gray-800 rounded text-sm text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded text-sm font-medium transition-colors text-white">
                      {column.newsletter.buttonLabel || "→"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        {(copyright || safeLegalLinks.length > 0) && (
          <div className="mt-12 pt-8 border-t border-slate-800 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            {copyright && (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {copyright}
              </p>
            )}
            {safeLegalLinks.length > 0 && (
              <div className="flex gap-6 text-sm flex-wrap justify-center">
                {safeLegalLinks.map((link, index) => {
                  const href = link.href || (link.targetId ? `#${link.targetId}` : '#');
                  return (
                    <a
                      key={index}
                      href={href}
                      className="hover:text-white dark:hover:text-gray-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
