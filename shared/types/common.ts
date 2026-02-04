export interface CTA {
  label: string;
  href?: string;
  targetId?: string;
  variant?: "primary" | "secondary";
}

export interface MediaImage {
  src: string;
  alt?: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Badge {
  text: string;
}
