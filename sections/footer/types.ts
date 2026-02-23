import { Badge, CTA, SectionProps } from '../../shared/types/section';

export interface FooterLinkGroup {
  title: string;
  links: Array<{
    label: string;
    href?: string;
  }>;
}

export interface FooterProps extends SectionProps {
  title?: string;
  subtitle?: string;
  badges?: Badge[];
  ctas?: CTA[];
  copyright?: string;
  links?: FooterLinkGroup[];
  socials?: Array<{
    iconName?: string;
    href: string;
    label?: string;
  }>;
}
