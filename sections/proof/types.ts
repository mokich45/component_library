import { SectionProps } from '../../shared/types/section';

export interface ProofItem {
  title?: string;
  quote?: string;
  description?: string;
  author?: string;
  role?: string;
  company?: string;
  value?: string;
  label?: string;
  logo?: string;
  image?: {
    src: string;
    alt?: string;
  };
}

export interface ProofProps extends SectionProps {
  title: string;
  subtitle?: string;
  items?: ProofItem[];
}
