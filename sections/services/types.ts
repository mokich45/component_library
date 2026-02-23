import { CTA, SectionProps } from '../../shared/types/section';

export interface ServiceCardItem {
  id?: string;
  title: string;
  summary?: string;
  description?: string;
  iconName?: string;
  timeline?: string;
  deliverables?: string[];
  ctas?: CTA[];
}

export interface ServicesProps extends SectionProps {
  title: string;
  subtitle?: string;
  items?: ServiceCardItem[];
}
