export type SlideIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SlideConfig {
  id: SlideIndex;
  code: string;
  title: string;
  bg: string;
  isDark: boolean;
}

export interface EcosystemNode {
  id: 'Node A' | 'Node B' | 'Node C';
  title: string;
  tagline: string;
  x: number;
  y: number;
}
