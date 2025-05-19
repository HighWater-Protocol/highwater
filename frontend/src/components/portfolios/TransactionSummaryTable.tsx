"use client";
import React from 'react';

const MOCK_TRANSACTIONS = [
  { type: 'Buys', count: 42, value: '$723,450', change: '+12.4%' },
  { type: 'Sells', count: 18, value: '$346,780', change: '-8.2%' },
  { type: 'Capital Gains', count: 23, value: '$163,345', change: '+3.7%' },
  { type: 'Staking Rewards', count: 156, value: '$86,240', change: '+1.2%' },
  { type: 'Fees', count: 78, value: '$12,875', change: '-0.4%' },
];

export default function TransactionSummaryTable() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 overflow-x-auto flex flex-col h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 mb-4 tracking-tight">Transaction Summary</h2>
      <table className="w-full min-w-[400px] text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 font-semibold">Transaction Type</th>
            <th className="py-2 font-semibold">Count</th>
            <th className="py-2 font-semibold">Fiat Value</th>
            <th className="py-2 font-semibold">% Change</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_TRANSACTIONS.map((t) => (
            <tr key={t.type} className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-2 font-medium text-gray-700 align-middle whitespace-nowrap">{t.type}</td>
              <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{t.count}</td>
              <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{t.value}</td>
              <td className={`py-2 align-middle whitespace-nowrap font-semibold ${t.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{t.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
