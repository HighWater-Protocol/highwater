import { 
  AIInsight, 
  Alert, 
  MarketSignal, 
  NewsItem,
  PortfolioAllocation,
  RiskComplianceFlag
} from '@highwater/types';
import { PortfolioTimeSeriesPoint } from '../types/portfolio';

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
        ...(options?.headers || {}),
      },
    });

    console.log(`[API] Response status: ${response.status} for ${url}`);
    
    const responseData = await response.json();
    
    if (!response.ok) {
      const errorMessage = typeof responseData === 'object' && responseData !== null && 'message' in responseData
        ? responseData.message
        : `HTTP ${response.status}: ${response.statusText}`;
      
      console.error(`[API] Error response:`, errorMessage);
      throw new Error(errorMessage);
    }

    // If the response has a success flag and data, return the data
    if (responseData && typeof responseData === 'object' && 'success' in responseData && 'data' in responseData) {
      return responseData.data;
    }

    // For backward compatibility, return the response as is if it doesn't match our expected format
    return responseData;
  } catch (error) {
    console.error('[API] Request failed:', error);
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

  getPortfolioTimeSeries: (portfolioId: string, range: string = '1M') => 
    fetchFromApi<PortfolioTimeSeriesPoint[]>(
      `/api/v1/portfolios/${portfolioId}/timeseries?range=${range}`
    ),
    
  getPortfolioValue: (portfolioId: string) => 
    fetchFromApi<{ currentValue: number; changePercent: number }>(
      `/api/v1/portfolios/${portfolioId}/value`
    ),
  
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
