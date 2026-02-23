import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Headphones, Globe, MessageSquare } from 'lucide-react';
import { ContactProps } from '../types';
import { cn } from '../../../shared/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Phone, MapPin, Clock, Headphones, Globe, MessageSquare
};

export const ContactTabs: React.FC<ContactProps> = ({
  title,
  subtitle,
  badges,
  contactInfo,
  formFields,
  formTitle,
  formButtonLabel,
  offices,
  tabs,
  privacyCheckbox,
  className,
  id,
}) => {
  const defaultTabs = tabs || [
    { id: 'form', label: 'Форма обратной связи', content: 'form' as const },
    { id: 'contacts', label: 'Контактная информация', content: 'contacts' as const },
    { id: 'offices', label: 'Наши офисы', content: 'offices' as const }
  ];
  
  const [activeTab, setActiveTab] = useState(defaultTabs[0]?.id || 'form');
  const activeTabData = defaultTabs.find(tab => tab.id === activeTab);

  const defaultFormFields = (formFields || [
    { name: 'name', type: 'text', placeholder: 'Введите имя', label: 'Ваше имя' },
    { name: 'phone', type: 'tel', placeholder: '+7 (___) ___-__-__', label: 'Телефон' },
    { name: 'email', type: 'email', placeholder: 'your@email.com', label: 'Email' },
    { name: 'subject', type: 'text', placeholder: 'О чем вы хотите спросить?', label: 'Тема обращения' },
    { name: 'message', type: 'textarea', placeholder: 'Опишите ваш вопрос подробнее...', label: 'Сообщение', rows: 5, required: true }
  ]).filter((field) => Boolean(field?.name) && Boolean(field?.type));

  const defaultContactInfo = (contactInfo || [])
    .map((info) => ({ ...info, values: (info.values || []).filter((value) => typeof value === 'string' && value.trim().length > 0) }))
    .filter((info) => info.values.length > 0 && Boolean(info.label));
  const defaultOffices = (offices || []).filter((office) => Boolean(office?.name));

  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      case 'clock': return Clock;
      default: return MessageSquare;
    }
  };

  return (
    <section 
      id={id} 
      className={cn("py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800", className)}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          {badges && badges.length > 0 && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
              {badges[0].text}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-full">
          {/* Tabs List */}
          <div className="grid w-full grid-cols-3 mb-8 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-transparent dark:border-gray-700">
            {defaultTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-3 px-4 rounded-lg transition-colors duration-300 text-sm font-medium",
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTabData?.content === 'form' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 border border-transparent dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {formTitle || "Отправьте нам сообщение"}
              </h3>
              <form className="space-y-5">
                {defaultFormFields.length === 5 && defaultFormFields[0].type === 'text' && defaultFormFields[1].type === 'tel' ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        {defaultFormFields[0].label && (
                          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                            {defaultFormFields[0].label}
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
                    {defaultFormFields[3] && (
                      <div>
                        {defaultFormFields[3].label && (
                          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                            {defaultFormFields[3].label}
                          </label>
                        )}
                        <input
                          type={defaultFormFields[3].type}
                          name={defaultFormFields[3].name}
                          placeholder={defaultFormFields[3].placeholder}
                          required={defaultFormFields[3].required}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        />
                      </div>
                    )}
                    {defaultFormFields[4] && defaultFormFields[4].type === 'textarea' && (
                      <div>
                        {defaultFormFields[4].label && (
                          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                            {defaultFormFields[4].label}
                          </label>
                        )}
                        <textarea
                          name={defaultFormFields[4].name}
                          placeholder={defaultFormFields[4].placeholder}
                          rows={defaultFormFields[4].rows || 5}
                          required={defaultFormFields[4].required}
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
                        </label>
                      )}
                      {field.type === 'textarea' ? (
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        />
                      )}
                    </div>
                  ))
                )}
                {privacyCheckbox && (
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      required={privacyCheckbox.required}
                      className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-400">
                      {privacyCheckbox.label}
                    </label>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300 font-medium text-lg"
                >
                  {formButtonLabel || "Отправить"}
                </button>
              </form>
            </div>
          )}

          {activeTabData?.content === 'contacts' && defaultContactInfo.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 border border-transparent dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Наши контакты</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {defaultContactInfo.map((info, index) => {
                  const Icon = info.iconName ? iconMap[info.iconName] : getIconForType(info.type);
                  const colorClasses = [
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                    'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                    'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                    'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                    'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
                    'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  ];
                  const colorClass = colorClasses[index % colorClasses.length];

                  return (
                    <div key={index} className="flex gap-4">
                      <div className={cn("flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center", colorClass)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{info.label}</h4>
                        {info.values.map((value, i) => (
                          <p key={i} className="text-gray-600 dark:text-gray-400">{value}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTabData?.content === 'offices' && defaultOffices.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 border border-transparent dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Наши офисы</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {defaultOffices.map((office, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">{office.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {office.address && (
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {office.address}
                        </p>
                      )}
                      {office.phone && (
                        <p className="flex items-start gap-2">
                          <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {office.phone}
                        </p>
                      )}
                      {office.workingHours && (
                        <p className="flex items-start gap-2">
                          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {office.workingHours}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
