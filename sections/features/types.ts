import { FeatureItem, SectionProps } from '../../shared/types/section';

export interface FeaturesProps extends SectionProps {
  title: string;
  subtitle?: string;
  items?: Array<
    FeatureItem & {
      gradientColor?: string;
      stats?: string;
      image?: string;
      category?: string;
      href?: string;
      cta?: {
        label: string;
        href?: string;
      };
    }
  >;
}
