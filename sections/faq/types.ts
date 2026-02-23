import { Badge, SectionProps } from '../../shared/types/section';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps extends SectionProps {
  title: string;
  subtitle?: string;
  badges?: Badge[];
  items?: FaqItem[];
}
