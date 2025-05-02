"use client";
import React from 'react';

const EXCHANGES = ['Coinbase', 'Gemini', 'Kraken', 'Binance', 'Photon'];

const MOCK_TRADES = [
  { date: '2025-05-01', asset: 'BTC', type: 'Buy', amount: 0.25, price: 65000, value: 16250, status: 'Completed' },
  { date: '2025-04-29', asset: 'ETH', type: 'Sell', amount: 2, price: 3200, value: 6400, status: 'Completed' },
  { date: '2025-04-28', asset: 'SOL', type: 'Buy', amount: 100, price: 16, value: 1600, status: 'Completed' },
  { date: '2025-04-27', asset: 'USDC', type: 'Deposit', amount: 5000, price: 1, value: 5000, status: 'Completed' },
  { date: '2025-04-26', asset: 'AVAX', type: 'Buy', amount: 50, price: 35, value: 1750, status: 'Completed' },
].map((t, i) => ({ ...t, exchange: EXCHANGES[i % EXCHANGES.length] }));

export default function RecentTrades() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Recent Trades</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 font-semibold">Date</th>
              <th className="py-2 font-semibold">Asset</th>
              <th className="py-2 font-semibold">Type</th>
              <th className="py-2 font-semibold">Amount</th>
              <th className="py-2 font-semibold">Price</th>
              <th className="py-2 font-semibold">Value</th>
              <th className="py-2 font-semibold">Exchange</th>
              <th className="py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRADES.map((t, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-2 font-medium text-gray-700 align-middle whitespace-nowrap">{t.date}</td>
                <td className="py-2 text-gray-700 align-middle whitespace-nowrap">{t.asset}</td>
                <td className="py-2 text-gray-700 align-middle whitespace-nowrap">{t.type}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{t.amount}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">${t.price.toLocaleString()}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">${t.value.toLocaleString()}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{t.exchange}</td>
                <td className={`py-2 align-middle whitespace-nowrap font-semibold ${t.status === 'Completed' ? 'text-green-600' : 'text-gray-600'}`}>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
