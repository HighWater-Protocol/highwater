"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface PortfolioDataPoint {
  date: string;
  value: number;
}

interface PortfolioActivityChartProps {
  data: PortfolioDataPoint[];
  loading: boolean;
  error: string | null;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const timeRanges = ["1D", "1W", "1M", "3M", "YTD", "1Y", "ALL"];

export default function PortfolioActivityChart({ 
  data, 
  loading, 
  error, 
  timeRange, 
  onTimeRangeChange 
}: PortfolioActivityChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">Portfolio Activity Summary</h2>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-2 py-1 text-xs rounded font-medium ${
                timeRange === range
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-48 w-full flex-1">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg w-full">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={v => `$${(Number(v)/1e6).toFixed(1)}M`} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No data available for the selected time range
          </div>
        )}
      </div>
    </div>
  );
}
