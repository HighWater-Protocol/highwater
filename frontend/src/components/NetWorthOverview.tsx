"use client";
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface NetWorthData {
  cryptoassets: number;
  investments: number;
  reserves: number;
  liabilities: number;
}

interface NetWorthOverviewProps {
  data: NetWorthData | null;
  loading: boolean;
  error: string | null;
}

interface NetWorthItem {
  label: string;
  value: number;
  color: string;
  negative?: boolean;
}

export default function NetWorthOverview({ data, loading, error }: NetWorthOverviewProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col h-full justify-between gap-6">
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center h-full text-center">
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
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center h-full text-center">
        <p className="text-gray-500">No net worth data available</p>
      </div>
    );
  }

  const total = data.cryptoassets + data.investments + data.reserves - data.liabilities;
  
  const items: NetWorthItem[] = [
    {
      label: 'Cryptoassets',
      value: data.cryptoassets,
      color: '#6366f1',
    },
    {
      label: 'Traditional Investments',
      value: data.investments,
      color: '#10b981',
    },
    {
      label: 'Cash Reserves',
      value: data.reserves,
      color: '#f59e42',
    },
    {
      label: 'Liabilities',
      value: data.liabilities,
      color: '#f43f5e',
      negative: true,
    },
  ];

  const maxValue = Math.max(...items.map(i => i.value));
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col h-full justify-between gap-6">
      <h2 className="text-xl font-medium text-gray-800 tracking-tight mb-2">Net Worth Overview</h2>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-2">
        <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm leading-tight">
          ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 w-40 min-w-[120px] truncate">
              {item.label}
            </span>
            <div className="flex-1 flex items-center min-w-0">
              <div className="w-full">
                <ResponsiveContainer width="100%" height={18}>
                  <BarChart
                    data={[{ value: item.value }]}
                    layout="vertical"
                    margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    barCategoryGap={0}
                  >
                    <XAxis type="number" hide domain={[0, maxValue * 1.1]} />
                    <Bar
                      dataKey="value"
                      fill={item.color}
                      radius={[6, 6, 6, 6]}
                      background={{ fill: '#f3f4f6' }}
                      barSize={item.negative ? 12 : 16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <span 
              className={`text-base font-semibold tabular-nums min-w-[100px] text-right ${
                item.negative ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              {item.negative ? '-' : ''}${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
