import { Badge, SectionProps } from '../../shared/types/section';

export interface ContactFormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'url';
  placeholder?: string;
  label?: string;
  required?: boolean;
  rows?: number;
}

export interface ContactInfoItem {
  type: 'phone' | 'email' | 'address' | string;
  label: string;
  values: string[];
  iconName?: string;
}

export interface SocialLink {
  iconName?: string;
  href: string;
}

export interface ContactProps extends SectionProps {
  title: string;
  subtitle?: string;
  badges?: Badge[];
  formFields?: ContactFormField[];
  formButtonLabel?: string;
  contactInfo?: ContactInfoItem[];
  socialLinks?: SocialLink[];
}
