"use client";
import React from 'react';
import MOCK_ALLOC from '../portfolios/AllocationBreakdown';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

// Cryptoassets now equals sum of Allocation Breakdown
const MOCK_NET_WORTH = {
  cryptoassets: MOCK_ALLOC.reduce((acc: number, cur: {value: number}) => acc + cur.value, 0),
  investments: 5_261_894,
  reserves: 5_421_771,
  liabilities: 395_500,
};

const total =
  MOCK_NET_WORTH.cryptoassets +
  MOCK_NET_WORTH.investments +
  MOCK_NET_WORTH.reserves -
  MOCK_NET_WORTH.liabilities;

const items = [
  {
    label: 'Cryptoassets',
    value: MOCK_NET_WORTH.cryptoassets,
    color: '#6366f1',
  },
  {
    label: 'Traditional Investments',
    value: MOCK_NET_WORTH.investments,
    color: '#10b981',
  },
  {
    label: 'Cash Reserves',
    value: MOCK_NET_WORTH.reserves,
    color: '#f59e42',
  },
  {
    label: 'Liabilities',
    value: MOCK_NET_WORTH.liabilities,
    color: '#f43f5e',
    negative: true,
  },
];

export default function NetWorthOverview() {
  const maxValue = Math.max(...items.map(i => i.value));
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col h-full justify-between gap-6">
      <h2 className="text-xl font-medium text-gray-800 tracking-tight mb-2">Net Worth Overview</h2>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-2">
        <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm leading-tight">${total.toLocaleString()}</span>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 w-40 min-w-[120px]">{item.label}</span>
            <div className="flex-1 flex items-center">
              <ResponsiveContainer width="100%" height={18}>
                <BarChart
                  data={[{ value: item.value }]}
                  layout="vertical"
                  margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  barCategoryGap={0}
                >
                  <XAxis type="number" hide domain={[0, maxValue]} />
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
            <span className={`text-base font-semibold tabular-nums ${item.negative ? 'text-red-600' : 'text-gray-900'}`}>{item.negative ? '-' : ''}${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
