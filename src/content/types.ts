export type Locale = 'tr' | 'en';

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface Profile {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
  cv: string;
  portrait: string;
  ogImage: string;
}

export interface Metric {
  value: string;
  label: LocalizedText;
}

export interface Project {
  id: string;
  index: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  bullets: LocalizedText[];
  tags: string[];
  github: string;
  status: 'completed' | 'inProgress';
  icon: 'phone' | 'workflow' | 'code';
}

export interface SkillCategory {
  id: string;
  index: string;
  name: LocalizedText;
  description: LocalizedText;
  items: string[];
}

export interface Experience {
  id: string;
  role: LocalizedText;
  company: string;
  location: LocalizedText;
  period: LocalizedText;
  remote?: boolean;
  bullets: LocalizedText[];
}

export type VideoKind = 'showreel' | 'work';
export type VideoCategory = 'showreel' | 'film' | 'commercial' | 'documentary';
export type VideoOrientation = 'landscape' | 'portrait';

export interface VideoWork {
  id: string;
  kind: VideoKind;
  title: LocalizedText;
  client?: LocalizedText;
  description: LocalizedText;
  src: string;
  poster: string;
  duration: string;
  year: string;
  category: VideoCategory;
  categoryLabel: LocalizedText;
  orientation: VideoOrientation;
  tools: string[];
  credits: LocalizedText;
  featured: boolean;
  published: boolean;
}
