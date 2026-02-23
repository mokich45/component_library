export interface CTA {
  label: string;
  href?: string;
  targetId?: string;
  variant?: "primary" | "secondary";
}

export interface PreviewContext {
  isPreview?: boolean;
  mode?: 'desktop' | 'mobile';
}

export interface BaseSectionProps {
  previewContext?: PreviewContext;
}

export interface Image {
  src: string;
  alt?: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface FeatureItem {
  title: string;
  description?: string;
  iconName?: string;
}

export interface ServiceItem {
  name: string;
  description?: string;
}

export interface Badge {
  icon?: string;
  text: string;
}

export interface AchievementBadge {
  value: string;
  label: string;
  icon?: string;
}

export interface RecognitionBadge {
  title: string;
  subtitle?: string;
  icon?: string;
}

export interface CollageImage extends Image {
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform?: string;
  };
  rotation?: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  grayscale?: boolean;
  zIndex?: number;
  width?: string;
  height?: string;
}

export interface SectionProps extends BaseSectionProps {
  className?: string;
  id?: string;
}
