import { useEffect, useState } from 'react'
import { apiClient } from '@/gateway/apiClient'
import { AIInsight, Alert, MarketSignal, NewsItem } from '@highwater/types'

interface InsightPageAPIState {
  marketSignals: MarketSignal[];
  aiInsights: AIInsight[];
  alerts: Alert[];
  news: NewsItem[];
  loading: {
    marketSignals: boolean;
    aiInsights: boolean;
    alerts: boolean;
    news: boolean;
  };
  error: {
    marketSignals: string | null;
    aiInsights: string | null;
    alerts: string | null;
    news: string | null;
  };
}

export function insightPageAPIs(): InsightPageAPIState {
  const [marketSignals, setMarketSignals] = useState<MarketSignal[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState({
    marketSignals: true,
    aiInsights: true,
    alerts: true,
    news: true,
  });
  const [error, setError] = useState<InsightPageAPIState['error']>({
    marketSignals: null,
    aiInsights: null,
    alerts: null,
    news: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [
          signalsData, 
          insightsData, 
          alertsData, 
          newsData
        ] = await Promise.allSettled([
          apiClient.getMarketSignals(),
          apiClient.getAIInsights(),
          apiClient.getAlerts(),
          apiClient.getNews(),
        ]);

        // Handle market signals
        if (signalsData.status === 'fulfilled') {
          setMarketSignals(signalsData.value);
        } else {
          setError(prev => ({ ...prev, marketSignals: 'Failed to load market signals' }));
          console.error('Error fetching market signals:', signalsData.reason);
        }

        // Handle AI insights
        if (insightsData.status === 'fulfilled') {
          setAiInsights(insightsData.value);
        } else {
          setError(prev => ({ ...prev, aiInsights: 'Failed to load AI insights' }));
          console.error('Error fetching AI insights:', insightsData.reason);
        }

        // Handle alerts
        if (alertsData.status === 'fulfilled') {
          setAlerts(alertsData.value);
        } else {
          setError(prev => ({ ...prev, alerts: 'Failed to load alerts' }));
          console.error('Error fetching alerts:', alertsData.reason);
        }

        // Handle news
        if (newsData.status === 'fulfilled') {
          setNews(newsData.value);
        } else {
          setError(prev => ({ ...prev, news: 'Failed to load news' }));
          console.error('Error fetching news:', newsData.reason);
        }
      } catch (err) {
        console.error('Unexpected error fetching dashboard data:', err);
      } finally {
        setLoading({
          marketSignals: false,
          aiInsights: false,
          alerts: false,
          news: false,
        });
      }
    };

    fetchData();
  }, []);

  return {
    marketSignals,
    aiInsights,
    alerts,
    news,
    loading,
    error,
  };
}
