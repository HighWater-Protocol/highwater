import { AIInsight, Alert, MarketSignal, NewsItem } from '@highwater/types'

// Local interfaces since they're not in the shared types yet
interface PortfolioAllocation {
  label: string
  value: number
}

interface RiskComplianceFlag {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: 'risk' | 'compliance' | 'security';
  createdAt: string;
  updatedAt: string;
}

// Base API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API request failed');
    }

    const data = await response.json();
    // If the response has a data property, return that, otherwise return the whole response
    return data.data !== undefined ? data.data : data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

export const apiClient = {
  // Market Data
  getMarketSignals: () => fetchFromApi<MarketSignal[]>('/api/v1/market/signals'),
  
  // AI Insights
  getAIInsights: () => fetchFromApi<AIInsight[]>('/api/v1/ai/insights'),
  
  // Alerts
  getAlerts: () => fetchFromApi<Alert[]>('/api/v1/alerts'),
  
  // News
  getNews: () => fetchFromApi<NewsItem[]>('/api/v1/news'),
  
  // Portfolio
  getPortfolioAllocation: (portfolioId: string) => 
    fetchFromApi<PortfolioAllocation[]>(`/api/v1/portfolios/${portfolioId}/allocation`),

  // Risk & Compliance
  getRiskComplianceFlags: () => 
    fetchFromApi<RiskComplianceFlag[]>('/api/v1/risk/flags'),

  // Add more API methods here as needed
};
