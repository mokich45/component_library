import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Users } from 'lucide-react';
import { ContactProps } from '../types';
import { cn } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, MapPin, Clock, MessageSquare, Users
};

export const ContactFullWidth: React.FC<ContactProps> = ({
  title,
  subtitle,
  badges,
  contactInfo,
  formFields,
  formTitle,
  formButtonLabel,
  className,
  id,
}) => {
  const defaultFormFields = formFields || [
    { name: 'name', type: 'text', placeholder: 'Имя', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'subject', type: 'text', placeholder: 'Тема сообщения' },
    { name: 'message', type: 'textarea', placeholder: 'Ваше сообщение', rows: 6, required: true }
  ];

  const defaultContactInfo = contactInfo || [];

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
      case 'phone': return 'bg-blue-600';
      case 'email': return 'bg-purple-600';
      case 'address': return 'bg-green-600';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <section 
      id={id} 
      className={cn("py-20 px-4 bg-gray-900 dark:bg-gray-950 text-white", className)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-900/30 rounded-full">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Карточки контактов */}
        {defaultContactInfo.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {defaultContactInfo.slice(0, 3).map((info, index) => {
              const Icon = info.iconName ? iconMap[info.iconName] : getIconForType(info.type);
              const colorClass = getColorForType(info.type);
              const primaryValue = info.values[0] || '';
              const secondaryValue = info.values[1] || '';

              return (
                <div
                  key={index}
                  className="bg-gray-800 dark:bg-gray-900 p-8 rounded-2xl text-center hover:bg-gray-750 dark:hover:bg-gray-800 transition-colors border border-transparent dark:border-gray-800"
                >
                  <div className={cn("inline-flex p-4 rounded-full mb-4", colorClass)}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{info.label}</h3>
                  {primaryValue && (
                    <p className="text-gray-400 dark:text-gray-300 mb-2">{primaryValue}</p>
                  )}
                  {secondaryValue && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{secondaryValue}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Форма обратной связи */}
        <div className="bg-gray-800 dark:bg-gray-900 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto border border-transparent dark:border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {formTitle || "Отправьте сообщение"}
            </h3>
            {subtitle && (
              <p className="text-gray-400 dark:text-gray-500">
                Заполните форму и мы свяжемся с вами
              </p>
            )}
          </div>
          
          <form className="space-y-5">
            {defaultFormFields.length === 4 && defaultFormFields[0].type === 'text' && defaultFormFields[1].type === 'email' ? (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type={defaultFormFields[0].type}
                    name={defaultFormFields[0].name}
                    placeholder={defaultFormFields[0].placeholder}
                    required={defaultFormFields[0].required}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type={defaultFormFields[1].type}
                    name={defaultFormFields[1].name}
                    placeholder={defaultFormFields[1].placeholder}
                    required={defaultFormFields[1].required}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {defaultFormFields[2] && (
                  <input
                    type={defaultFormFields[2].type}
                    name={defaultFormFields[2].name}
                    placeholder={defaultFormFields[2].placeholder}
                    required={defaultFormFields[2].required}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {defaultFormFields[3] && defaultFormFields[3].type === 'textarea' && (
                  <textarea
                    name={defaultFormFields[3].name}
                    placeholder={defaultFormFields[3].placeholder}
                    rows={defaultFormFields[3].rows || 6}
                    required={defaultFormFields[3].required}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </>
            ) : (
              defaultFormFields.map((field, index) => (
                <div key={index}>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={field.rows || 6}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-6 rounded-lg transition-colors duration-300 font-medium"
            >
              {formButtonLabel || "Отправить сообщение"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
