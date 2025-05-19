"use client";
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { apiClient } from '@/gateway/apiClient';
import { PortfolioAllocation } from '@highwater/types';

// This would typically come from your auth context or props
const DEFAULT_PORTFOLIO_ID = 'default';

export default function PortfolioActivityChart() {
  const [allocation, setAllocation] = useState<PortfolioAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllocation = async () => {
      try {
        const data = await apiClient.getPortfolioAllocation(DEFAULT_PORTFOLIO_ID);
        setAllocation(data);
      } catch (err) {
        console.error('Failed to fetch portfolio allocation:', err);
        setError('Failed to load portfolio data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllocation();
  }, []);

  // Calculate total net worth from allocation
  const totalNetWorth = allocation.reduce((acc, curr) => acc + curr.value, 0);
  
  // Generate chart data using the allocation data
  const lastDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  // Create a chart data point for each allocation
  const data = [
    ...allocation.map((item, index) => ({
      date: item.label,
      value: item.value,
      name: item.label
    })),
    // Add the total as the last point
    { 
      date: 'Total', 
      value: totalNetWorth,
      name: 'Total Portfolio Value'
    }
  ];
  
  // Sort by value in descending order for better visualization
  data.sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium text-gray-800">Portfolio Activity Summary</h2>
            <div className="flex gap-1">
              {["1D","1W","1M","3M","YTD","1Y","ALL"].map((r) => (
                <button 
                  key={r} 
                  className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 font-medium text-gray-600"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2, fill: '#EEF2FF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Portfolio Value</p>
                <p className="text-2xl font-semibold text-gray-900">${totalNetWorth.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
