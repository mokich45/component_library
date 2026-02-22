import { Badge, CTA, CollageImage, SectionProps, Stat } from '../../shared/types/section';

export interface HeroNavItem {
  label: string;
  href: string;
}

export interface HeroHeaderConfig {
  logo?: string;
  navItems?: HeroNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface HeroMedia {
  image?: {
    src: string;
    alt?: string;
  };
  images?: CollageImage[];
}

export interface HeroProps extends SectionProps {
  title: string;
  subtitle?: string;
  note?: string;
  ctas?: CTA[];
  stats?: Stat[];
  badges?: Badge[];
  media?: HeroMedia;
  nav?: HeroHeaderConfig;
}
