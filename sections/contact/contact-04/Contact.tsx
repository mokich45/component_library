import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { ContactProps } from '../types';
import { cn } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, MapPin, Send, MessageSquare, Clock
};

export const ContactSplit: React.FC<ContactProps> = ({
  title,
  subtitle,
  badges,
  contactInfo,
  formFields,
  formTitle,
  formButtonLabel,
  workingHours,
  note,
  className,
  id,
}) => {
  const defaultFormFields = (formFields || [
    { name: 'name', type: 'text', placeholder: 'Ваше имя', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Телефон' },
    { name: 'message', type: 'textarea', placeholder: 'Ваше сообщение', rows: 5, required: true }
  ]).filter((field) => Boolean(field?.name) && Boolean(field?.type));

  const defaultContactInfo = (contactInfo || [])
    .map((info) => ({ ...info, values: (info.values || []).filter((value) => typeof value === 'string' && value.trim().length > 0) }))
    .filter((info) => info.values.length > 0 && Boolean(info.label));

  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      default: return MessageSquare;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'phone': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'email': return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'address': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <section 
      id={id} 
      className={cn("py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Левая колонка - Контактная информация */}
          {defaultContactInfo.length > 0 && (
            <div className="space-y-6">
              <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-lg border border-transparent dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Наши контакты
                </h3>
                
                <div className="space-y-6">
                  {defaultContactInfo.map((info, index) => {
                    const Icon = info.iconName ? iconMap[info.iconName] : getIconForType(info.type);
                    const colorClass = getColorForType(info.type);

                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={cn("p-3 rounded-full", colorClass)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">
                            {info.label}
                          </h4>
                          {info.values.map((value, i) => (
                            <p key={i} className="text-gray-600 dark:text-gray-400">
                              {value}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {workingHours && (
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{workingHours}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Правая колонка - Форма */}
          <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-lg border border-transparent dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {formTitle || "Напишите нам"}
            </h3>
            <form className="space-y-4">
              {defaultFormFields.map((field, index) => (
                <div key={index}>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={field.rows || 5}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
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
              ))}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
              >
                <Send className="w-4 h-4" />
                {formButtonLabel || "Отправить сообщение"}
              </button>
            </form>
            {note && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
