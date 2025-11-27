export enum CategoryType {
  PROPHETS = 'PROPHETS',
  BATTLES = 'BATTLES',
  SAHABA = 'SAHABA',
  SCHOLARS = 'SCHOLARS'
}

export interface NavItem {
  id: CategoryType;
  label: string;
  icon: string;
}

// Unified interface - no more separate fetch
export interface HistoricalEntity {
  id: string;
  name: string;
  category: CategoryType;
  shortDesc: string;
  fullDescription: string; // The rich text story
  dates: string; // Birth/Death or Event Date
  achievements: string[]; // List of key points
  significance: string; // Religious/Historical importance
  tags?: string[];
}

export interface DetailedInfo {
  summary: string;
  dates: string;
  achievements: string[];
  significance: string;
}