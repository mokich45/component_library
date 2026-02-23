import { CTA, SectionProps } from '../../shared/types/section';

export interface PortfolioStat {
  label: string;
  value: string;
}

export interface PortfolioItem {
  title: string;
  description?: string;
  image?: {
    src: string;
    alt?: string;
  };
  ctas?: CTA[];
  tags?: string[];
  year?: string;
  client?: string;
}

export interface PortfolioProps extends SectionProps {
  title: string;
  subtitle?: string;
  items?: PortfolioItem[];
  stats?: PortfolioStat[];
}
