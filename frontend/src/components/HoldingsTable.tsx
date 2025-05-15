"use client";
import React from 'react';

const MOCK_HOLDINGS = [
  { asset: 'BTC', name: 'Bitcoin', amount: 1.25, value: 82500, allocation: 43.2, change: '+2.5%' },
  { asset: 'ETH', name: 'Ethereum', amount: 18.0, value: 54000, allocation: 28.3, change: '+1.1%' },
  { asset: 'USDC', name: 'USD Coin', amount: 12000, value: 12000, allocation: 6.3, change: '0.0%' },
  { asset: 'SOL', name: 'Solana', amount: 400, value: 6200, allocation: 3.1, change: '-0.6%' },
  { asset: 'AVAX', name: 'Avalanche', amount: 200, value: 7000, allocation: 3.7, change: '+0.3%' },
  { asset: 'Other', name: 'Other Assets', amount: '-', value: 25000, allocation: 15.4, change: '+0.2%' },
];

export default function HoldingsTable() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Holdings</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 font-semibold">Asset</th>
              <th className="py-2 font-semibold">Name</th>
              <th className="py-2 font-semibold">Amount</th>
              <th className="py-2 font-semibold">Value</th>
              <th className="py-2 font-semibold">Allocation</th>
              <th className="py-2 font-semibold">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_HOLDINGS.map((h) => (
              <tr key={h.asset} className="border-b last:border-none">
                <td className="py-2 font-medium text-gray-700 align-middle whitespace-nowrap">{h.asset}</td>
                <td className="py-2 text-gray-700 align-middle whitespace-nowrap">{h.name}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{h.amount}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">${h.value.toLocaleString()}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{h.allocation}%</td>
                <td className={`py-2 align-middle whitespace-nowrap font-semibold ${h.change.startsWith('+') ? 'text-green-600' : h.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>{h.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
