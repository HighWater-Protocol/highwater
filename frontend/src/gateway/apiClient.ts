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
  // Ensure endpoint starts with a slash
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;
  
  console.log(`[API] Fetching: ${url}`);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    console.log(`[API] Response status: ${response.status} for ${url}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Error response:`, errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // If the response has a data property, return that, otherwise return the whole response
    const result = data.data !== undefined ? data.data : data;
    console.log('[API] Response data:', result);
    return result;
  } catch (error) {
    console.error(`[API] Request failed for ${url}:`, error);
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

  // Health Check
  getHealth: () => fetchFromApi<{
    status: 'ok' | 'error';
    timestamp: string;
    uptime: number;
    environment: string;
    version: string;
    database: {
      status: 'connected' | 'disconnected';
    };
  }>('/api/v1/health'),

  // Add more API methods here as needed
};
