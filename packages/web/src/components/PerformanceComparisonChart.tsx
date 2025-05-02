"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Fix date axis so all dates show up properly
const data = [
  { date: 'Feb 29', Portfolio: 100, BTC: 97, ETH: 102 },
  { date: 'Mar 01', Portfolio: 107, BTC: 104, ETH: 110 },
  { date: 'Mar 30', Portfolio: 111, BTC: 107, ETH: 116 },
  { date: 'Apr 01', Portfolio: 115, BTC: 109, ETH: 119 },
  { date: 'Apr 30', Portfolio: 124, BTC: 112, ETH: 125 },
];

export default function PerformanceComparisonChart() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">Performance Comparison</h2>
        <div className="flex gap-1">
          {["YTD","1Y","Inception"].map((r) => (
            <button key={r} className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 font-medium text-gray-600">{r}</button>
          ))}
        </div>
      </div>
      <div className="h-48 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={['auto', 'auto']} tickFormatter={v => `${v}%`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={v => `${v}%`} />
            <Legend />
            <Line type="monotone" dataKey="Portfolio" stroke="#6366f1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="BTC" stroke="#f59e42" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ETH" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
