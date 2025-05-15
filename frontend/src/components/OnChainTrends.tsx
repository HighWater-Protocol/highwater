"use client";
import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const MOCK_TRENDS = [
  {
    label: 'BTC Active Addresses',
    value: '1.20M',
    change: '+4.2%',
    chartData: [
      { date: 'Feb', value: 1.12 },
      { date: 'Mar', value: 1.16 },
      { date: 'Mar 15', value: 1.18 },
      { date: 'Apr', value: 1.19 },
      { date: 'Apr 30', value: 1.20 },
    ],
    chartColor: '#6366f1',
  },
  {
    label: 'ETH Gas Fees',
    value: '38 Gwei',
    change: '-12.8%',
    chartData: [
      { date: 'Feb', value: 52 },
      { date: 'Mar', value: 48 },
      { date: 'Mar 15', value: 44 },
      { date: 'Apr', value: 41 },
      { date: 'Apr 30', value: 38 },
    ],
    chartColor: '#f59e42',
  },
  {
    label: 'Altcoin Flows',
    value: '+$92M',
    change: '+7.1%',
    chartData: [
      { date: 'Feb', value: 60 },
      { date: 'Mar', value: 72 },
      { date: 'Mar 15', value: 80 },
      { date: 'Apr', value: 86 },
      { date: 'Apr 30', value: 92 },
    ],
    chartColor: '#10b981',
  },
  {
    label: 'Stablecoin Supply',
    value: '$142B',
    change: '+1.3%',
    chartData: [
      { date: 'Feb', value: 128 },
      { date: 'Mar', value: 134 },
      { date: 'Mar 15', value: 137 },
      { date: 'Apr', value: 139 },
      { date: 'Apr 30', value: 142 },
    ],
    chartColor: '#f43f5e',
  },
];

export default function OnChainTrends() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">On-Chain Trends</h2>
        <div className="space-x-2">
          {['BTC', 'ETH', 'Altcoins', 'Watchlist'].map((f) => (
            <button
              key={f}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_TRENDS.map((trend) => (
          <div key={trend.label} className="bg-white rounded-lg shadow-lg border border-gray-200 p-5 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{trend.label}</span>
              <span className={`text-xs ml-2 font-semibold ${trend.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{trend.change}</span>
            </div>
            <span className="mt-2 text-2xl font-bold text-gray-900">{trend.value}</span>
            <div className="mt-3 w-full h-16 bg-gray-100 rounded flex items-center justify-center">
              <ResponsiveContainer width="100%" height={48}>
                <LineChart data={trend.chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Line type="monotone" dataKey="value" stroke={trend.chartColor} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
