import { SectionProps } from '../../shared/types/section';

export interface ProcessItem {
  title: string;
  description?: string;
  iconName?: string;
  duration?: string;
  deliverables?: string[];
}

export interface ProcessProps extends SectionProps {
  title: string;
  subtitle?: string;
  items?: ProcessItem[];
}
