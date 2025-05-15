"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface AllocationItem {
  label: string;
  value: number;
}

interface AllocationBreakdownProps {
  data: AllocationItem[];
  loading: boolean;
  error: string | null;
}

const COLORS = ['#6366f1', '#10b981', '#f59e42', '#f43f5e', '#818cf8', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#ef4444'];

// Default export removed as we'll use the component export instead

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

function renderCustomizedLabel() {
  return null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: AllocationItem & { index: number };
    value: number;
  }>;
  totalValue: number;
}

function CustomTooltip({ active, payload, totalValue }: CustomTooltipProps) {
  if (active && payload && payload.length > 0) {
    const { value, payload: data } = payload[0];
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
    
    return (
      <div className="rounded-lg shadow-lg bg-white px-4 py-3 border border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="inline-block w-3 h-3 rounded-full" 
            style={{ backgroundColor: COLORS[data.index % COLORS.length] }} 
          />
          <span className="font-semibold text-gray-800">{data.label}</span>
        </div>
        <div className="text-gray-900 font-medium tabular-nums text-base">
          ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
        {totalValue > 0 && (
          <div className="text-xs text-gray-500">
            {percentage.toFixed(2)}% of portfolio
          </div>
        )}
      </div>
    );
  }
  return null;
}

export function AllocationBreakdown({ data, loading, error }: AllocationBreakdownProps) {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4 h-full">
        <Skeleton className="h-7 w-48 mb-2" />
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="flex-1 w-full space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center h-full text-center">
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

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center h-full text-center">
        <p className="text-gray-500">No allocation data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4 h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 tracking-tight text-left mb-2">Allocation Breakdown</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full flex-1">
        <div className="flex flex-col items-center justify-center w-full md:w-32 h-32">
          <ResponsiveContainer width="100%" height={120}>
            <PieChart margin={{ top: 12, right: 6, left: 6, bottom: 12 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={44}
                innerRadius={24}
                labelLine={false}
                label={renderCustomizedLabel}
                isAnimationActive={false}
              >
                {data.map((entry, idx) => (
                  <Cell 
                    key={`cell-${idx}`} 
                    fill={COLORS[idx % COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip totalValue={total} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full flex flex-col justify-center">
          <ul className="space-y-2">
            {data.map((item, idx) => {
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <li key={item.label} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-gray-700 font-medium min-w-[110px] truncate">
                    <span 
                      className="flex-shrink-0 inline-block w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }} 
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="text-gray-900 tabular-nums text-right min-w-[92px] truncate">
                    ${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-gray-500 tabular-nums text-right min-w-[52px]">
                    {percentage.toFixed(1)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
