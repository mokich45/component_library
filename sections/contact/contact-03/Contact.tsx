import React from 'react';
import { Mail, Phone, Send, MessageCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { ContactProps } from '../types';
import { cn } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, Send, MessageCircle, Calendar, MapPin, Clock
};

export const ContactSidePanel: React.FC<ContactProps> = ({
  title,
  subtitle,
  badges,
  contactInfo,
  formFields,
  formTitle,
  formButtonLabel,
  workingHours,
  note,
  privacyCheckbox,
  className,
  id,
}) => {
  const defaultFormFields = formFields || [
    { name: 'name', type: 'text', placeholder: 'Иван Иванов', label: 'Ваше имя', required: true },
    { name: 'email', type: 'email', placeholder: 'ivan@example.com', label: 'Email', required: true },
    { name: 'phone', type: 'tel', placeholder: '+7 (___) ___-__-__', label: 'Номер телефона' },
    { name: 'service', type: 'select', label: 'Выберите услугу', options: ['Консультация', 'Техническая поддержка', 'Сотрудничество', 'Другое'] },
    { name: 'message', type: 'textarea', placeholder: 'Расскажите подробнее о вашем вопросе...', label: 'Сообщение', rows: 5, required: true }
  ];

  const defaultContactInfo = contactInfo || [];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      case 'clock': return Clock;
      case 'message': return MessageCircle;
      case 'calendar': return Calendar;
      default: return MessageCircle;
    }
  };

  return (
    <section 
      id={id} 
      className={cn("min-h-screen grid md:grid-cols-2", className)}
    >
      {/* Левая часть - Фон с информацией */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl mb-12 text-blue-100 dark:text-blue-200">
              {subtitle}
            </p>
          )}

          {defaultContactInfo.length > 0 && (
            <div className="space-y-8">
              {defaultContactInfo.map((info, index) => {
                const Icon = info.iconName ? iconMap[info.iconName] : getIconForType(info.type);
                const primaryValue = info.values[0] || '';
                const secondaryValue = info.values[1] || '';

                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{info.label}</h3>
                      {primaryValue && (
                        <p className="text-blue-100 dark:text-blue-200">{primaryValue}</p>
                      )}
                      {secondaryValue && (
                        <p className="text-sm text-blue-200 dark:text-blue-300 mt-1">{secondaryValue}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {(workingHours || note) && (
            <div className="mt-12 pt-8 border-t border-white/20">
              {note && (
                <p className="text-sm text-blue-100 dark:text-blue-200 mb-2">
                  {note}
                </p>
              )}
              {workingHours && (
                <p className="text-sm text-blue-100 dark:text-blue-200">
                  {workingHours}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Правая часть - Форма */}
      <div className="bg-white dark:bg-gray-900 p-8 md:p-12 flex items-center">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {formTitle || "Отправьте сообщение"}
            </h3>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400">
                Заполните форму ниже, и наш менеджер свяжется с вами в ближайшее время
              </p>
            )}
          </div>

          <form className="space-y-6">
            {defaultFormFields.map((field, index) => (
              <div key={index}>
                {field.label && (
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    className="w-full h-12 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  >
                    {field.options?.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={field.rows || 5}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full h-12 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                )}
              </div>
            ))}

            {privacyCheckbox && (
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  required={privacyCheckbox.required}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-400">
                  {privacyCheckbox.label}
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-14 text-lg gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300 font-medium flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
              {formButtonLabel || "Отправить сообщение"}
            </button>

            {note && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {note}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
