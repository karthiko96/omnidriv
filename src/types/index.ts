export interface DriveFile {
  id: string;
  name: string;
  type: 'folder' | 'video' | 'pdf' | 'doc' | 'image' | 'sheet' | 'deck' | 'design' | '3d' | 'code' | 'model';
  size: string;
  sizeBytes?: number;
  itemsCount?: number;
  modified: string;
  author: string;
  created?: string;
  streamingSpeed: string;
  status: 'synced' | 'streaming' | 'cached' | 'agent-locked';
  location?: string;
  project?: string;
  version?: string;
  permissions?: string[];
  accessHistory?: string[];
  aiMetadata?: string[];
  storageLocation?: string;
  tags?: string[];
  description?: string;
  summary?: string;
}

export type PlatformType = 'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'cli';

export interface PricingPlan {
  id: 'individual' | 'teams' | 'enterprise';
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  badge?: string;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  ctaText: string;
}
