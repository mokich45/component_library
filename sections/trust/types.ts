import { SectionProps } from '../../shared/types/section';

export interface TrustItem {
  label: string;
  logo?: string;
  href?: string;
}

export interface TrustProps extends SectionProps {
  title?: string;
  subtitle?: string;
  items?: TrustItem[];
}
