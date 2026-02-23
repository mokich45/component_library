import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { ContactProps } from '../types';
import { cn } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, MessageSquare
};

export const ContactCentered: React.FC<ContactProps> = ({
  title,
  subtitle,
  badges,
  contactInfo,
  formFields,
  formButtonLabel,
  socialLinks,
  className,
  id,
}) => {
  const defaultFormFields = (formFields || [
    { name: 'name', type: 'text', placeholder: 'Иван Иванов', label: 'Имя', required: true },
    { name: 'email', type: 'email', placeholder: 'ivan@example.com', label: 'Email', required: true },
    { name: 'company', type: 'text', placeholder: 'Название вашей компании', label: 'Компания' },
    { name: 'message', type: 'textarea', placeholder: 'Расскажите о вашем проекте...', label: 'Сообщение', rows: 6, required: true }
  ]).filter((field) => Boolean(field?.name) && Boolean(field?.type));

  const defaultContactInfo = (contactInfo || [])
    .map((info) => ({ ...info, values: (info.values || []).filter((value) => typeof value === 'string' && value.trim().length > 0) }))
    .filter((info) => info.values.length > 0 && Boolean(info.label));
  const defaultSocialLinks = (socialLinks || []).filter((link) => typeof link.href === 'string' && link.href.trim().length > 0);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      default: return MessageSquare;
    }
  };

  return (
    <section 
      id={id} 
      className={cn("min-h-screen flex items-center justify-center py-20 px-4 bg-white dark:bg-gray-900", className)}
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-sm mb-4 font-medium">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="p-8 md:p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-transparent dark:border-gray-700">
          <form className="space-y-6 mb-12">
            {defaultFormFields.length === 4 && defaultFormFields[0].type === 'text' && defaultFormFields[1].type === 'email' ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {defaultFormFields[0].label && (
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                        {defaultFormFields[0].label}
                        {defaultFormFields[0].required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    )}
                    <input
                      type={defaultFormFields[0].type}
                      name={defaultFormFields[0].name}
                      placeholder={defaultFormFields[0].placeholder}
                      required={defaultFormFields[0].required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    {defaultFormFields[1].label && (
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                        {defaultFormFields[1].label}
                        {defaultFormFields[1].required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    )}
                    <input
                      type={defaultFormFields[1].type}
                      name={defaultFormFields[1].name}
                      placeholder={defaultFormFields[1].placeholder}
                      required={defaultFormFields[1].required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>
                </div>
                {defaultFormFields[2] && (
                  <div>
                    {defaultFormFields[2].label && (
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                        {defaultFormFields[2].label}
                        {defaultFormFields[2].required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    )}
                    <input
                      type={defaultFormFields[2].type}
                      name={defaultFormFields[2].name}
                      placeholder={defaultFormFields[2].placeholder}
                      required={defaultFormFields[2].required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>
                )}
                {defaultFormFields[3] && defaultFormFields[3].type === 'textarea' && (
                  <div>
                    {defaultFormFields[3].label && (
                      <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                        {defaultFormFields[3].label}
                        {defaultFormFields[3].required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    )}
                    <textarea
                      name={defaultFormFields[3].name}
                      placeholder={defaultFormFields[3].placeholder}
                      rows={defaultFormFields[3].rows || 6}
                      required={defaultFormFields[3].required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>
                )}
              </>
            ) : (
              defaultFormFields.map((field, index) => (
                <div key={index}>
                  {field.label && (
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  )}
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={field.rows || 6}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  )}
                </div>
              ))
            )}
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300 font-medium text-lg"
            >
              {formButtonLabel || "Отправить запрос"}
            </button>
          </form>

          {(defaultContactInfo.length > 0 || defaultSocialLinks.length > 0) && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
              {defaultContactInfo.length > 0 && (
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  {defaultContactInfo.slice(0, 3).map((info, index) => {
                    const Icon = info.iconName ? iconMap[info.iconName] : getIconForType(info.type);
                    const primaryValue = info.values[0] || '';

                    return (
                      <div key={index}>
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">{info.label}</span>
                        </div>
                        {primaryValue && (
                          <p className="text-gray-600 dark:text-gray-400">{primaryValue}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {defaultSocialLinks.length > 0 && (
                <div className="flex justify-center gap-4">
                  {defaultSocialLinks.map((link, index) => {
                    const Icon = link.iconName ? iconMap[link.iconName] : MessageSquare;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
