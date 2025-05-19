// Shared API types for Insights feature

export interface APIMarketSignal {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  signal: 'bullish' | 'bearish' | 'neutral';
}

export interface APIAIInsight {
  id: string;
  insight?: string;
  summary?: string;
  description?: string;
  priority?: string;
  timestamp?: string;
}

export interface APIAlert {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  message?: string;
  action_required?: string;
  timestamp?: string;
}

export interface APINewsItem {
  id: string;
  title?: string;
  source?: string | { name: string };
  published_at?: string;
  category?: string;
}

// Type guards
export function isAPIMarketSignal(data: any): data is APIMarketSignal {
  return data && typeof data.name === 'string' && typeof data.price === 'number';
}

export function isAPIAIInsight(data: any): data is APIAIInsight {
  return data && (data.insight || data.summary || data.description);
}

export function isAPIAlert(data: any): data is APIAlert {
  return data && (data.title || data.message);
}

export function isAPINewsItem(data: any): data is APINewsItem {
  return data && (data.title || data.headline);
}
