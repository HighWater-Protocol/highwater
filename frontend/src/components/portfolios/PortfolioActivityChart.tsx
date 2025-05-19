"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { apiClient } from '@/gateway/apiClient';

type TimeRange = '1D' | '1W' | '1M' | '3M' | 'YTD' | '1Y' | 'ALL';

// This would typically come from your auth context or props
const DEFAULT_PORTFOLIO_ID = 'default';

import { PortfolioTimeSeriesPoint } from '@/gateway/apiClient';

interface PortfolioValue {
  currentValue: number;
  changePercent: number;
  lastUpdated: string;
}

export default function PortfolioActivityChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartData, setChartData] = useState<Array<{date: Date; value: number}>>([]);
  const [portfolioValue, setPortfolioValue] = useState<PortfolioValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingValue, setLoadingValue] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentPortfolioValue = useCallback(async () => {
    setLoadingValue(true);
    try {
      const value = await apiClient.getPortfolioValue(DEFAULT_PORTFOLIO_ID);
      setPortfolioValue({
        currentValue: value.currentValue,
        changePercent: value.changePercent,
        lastUpdated: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to fetch current portfolio value:', err);
      // Use the latest data point as a fallback if available
      if (chartData.length > 0) {
        const latest = chartData[chartData.length - 1];
        setPortfolioValue({
          currentValue: latest.value,
          changePercent: 0, // Can't calculate change without previous value
          lastUpdated: latest.date.toISOString()
        });
      }
    } finally {
      setLoadingValue(false);
    }
  }, [chartData]);

  const fetchPortfolioData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch time series data first
      console.log(`Fetching portfolio time series for range: ${timeRange}`);
      const responseData = await apiClient.getPortfolioTimeSeries(
        DEFAULT_PORTFOLIO_ID, 
        timeRange
      ) as Array<{ date: string; value: number }>;
      
      console.log('Received portfolio data:', responseData);
      
      if (!Array.isArray(responseData)) {
        throw new Error('Expected an array of data points in the response');
      }
      
      // Convert string dates to Date objects for the chart
      const formattedData = responseData
        .map(item => {
          if (!item || typeof item !== 'object' || !('date' in item) || !('value' in item)) {
            console.warn('Invalid data point format:', item);
            return null;
          }
          
          const date = new Date(item.date);
          const value = typeof item.value === 'number' ? item.value : 0;
          
          if (isNaN(date.getTime())) {
            console.warn('Invalid date in data point:', item);
            return null;
          }
          
          return { date, value };
        })
        .filter((item): item is { date: Date; value: number } => item !== null);
      
      if (formattedData.length === 0) {
        throw new Error('No valid data points received from server');
      }
      
      setChartData(formattedData);
      
      // If we don't have a current value yet, use the latest data point
      if (!portfolioValue) {
        const latest = formattedData[formattedData.length - 1];
        setPortfolioValue({
          currentValue: latest.value,
          changePercent: 0,
          lastUpdated: latest.date.toISOString()
        });
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to fetch portfolio time series:', {
        error: errorMessage,
        timeRange,
        timestamp: new Date().toISOString(),
        errorDetails: err
      });
      setError(`Failed to load portfolio data. Please try again.`);
    } finally {
      setLoading(false);
    }
  }, [timeRange, portfolioValue]);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  // Format date for display based on time range
  const formatXAxis = (date: Date) => {
    const dateObj = new Date(date);
    
    if (timeRange === '1D') {
      // Show hours for 1D view
      return dateObj.toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else if (timeRange === '1W') {
      // Show day and hour for 1W view
      return dateObj.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit',
        hour12: true
      });
    } else if (timeRange === '1M') {
      // Show day and month for 1M view
      return dateObj.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric'
      });
    } else {
      // For longer ranges, show month and year
      return dateObj.toLocaleDateString('en-US', { 
        year: timeRange === '1Y' || timeRange === 'YTD' ? undefined : '2-digit',
        month: 'short',
        day: timeRange === '3M' || timeRange === 'YTD' ? 'numeric' : undefined
      });
    }
  };
  
  // Handle time range change
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };
  
  // Get current value for display
  const currentValue = portfolioValue?.currentValue || 0;

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchPortfolioData}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Portfolio Value</h2>
              {portfolioValue && !loadingValue ? (
                <div className="mt-2">
                  <div className="text-3xl font-bold">
                    {formatCurrency(portfolioValue.currentValue)}
                  </div>
                  <div className={`text-sm ${portfolioValue.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioValue.changePercent >= 0 ? '↑' : '↓'} {formatPercent(portfolioValue.changePercent / 100)} (24h)
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(portfolioValue.lastUpdated).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="mt-2 h-12 flex items-center">
                  <div className="animate-pulse h-8 w-48 bg-gray-200 rounded"></div>
                </div>
              )}
            </div>
            <h2 className="text-xl font-medium text-gray-800">Portfolio Activity Summary</h2>
            <div className="flex gap-1">
              {(['1D', '1W', '1M', '3M', 'YTD', '1Y', 'ALL'] as TimeRange[]).map((range) => (
                <button 
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  disabled={loading}
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    timeRange === range 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={formatXAxis}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    formatter={(value: number) => [`$${value.toLocaleString(undefined, { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}`, 'Portfolio Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ 
                      r: 6, 
                      stroke: '#4F46E5', 
                      strokeWidth: 2, 
                      fill: '#EEF2FF' 
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Current Portfolio Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${currentValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
