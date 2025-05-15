// Types - these should match your backend API response types
export interface MarketSignal {
  title: string;
  value: string;
  change?: string;
  footnote?: string;
}

export interface AIInsight {
  text: string;
  priority: string;
  time: string;
}

export interface Alert {
  title: string;
  desc: string;
  time: string;
  action: string;
}

export interface NewsItem {
  headline: string;
  source: string;
  time: string;
  tag: string;
}