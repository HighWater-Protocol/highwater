"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import MOCK_ALLOC from './AllocationBreakdown';

// Get total net worth from NetWorthOverview logic
const MOCK_NET_WORTH = {
  cryptoassets: MOCK_ALLOC.reduce((acc: number, cur: {value: number}) => acc + cur.value, 0),
  investments: 5261894,
  reserves: 5421771,
  liabilities: 395500,
};
const totalNetWorth = MOCK_NET_WORTH.cryptoassets + MOCK_NET_WORTH.investments + MOCK_NET_WORTH.reserves - MOCK_NET_WORTH.liabilities;

const lastDate = 'Apr 30';
const data = [
  { date: 'Feb 29', value: 11303217 },
  { date: 'Mar 01', value: 12187523 },
  { date: 'Mar 30', value: 12452629 },
  { date: 'Apr 01', value: 12777612 },
  { date: lastDate, value: totalNetWorth },
];

export default function PortfolioActivityChart() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">Portfolio Activity Summary</h2>
        <div className="flex gap-1">
          {["1D","1W","1M","3M","YTD","1Y","ALL"].map((r) => (
            <button key={r} className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 font-medium text-gray-600">{r}</button>
          ))}
        </div>
      </div>
      <div className="h-48 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={['auto', 'auto']} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={v => `$${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
