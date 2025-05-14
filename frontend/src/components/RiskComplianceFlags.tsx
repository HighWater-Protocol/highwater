import React from 'react';

const FLAGS = [
  {
    title: 'High Volatility Exposure',
    desc: '13.5% of portfolio in highly volatile assets (SOL, AVAX)',
  },
  {
    title: 'Concentration Risk',
    desc: 'BTC represents 43% of crypto allocation',
  },
  {
    title: 'Regulatory Exposure',
    desc: '3.2% allocation to unregistered assets',
  },
  {
    title: 'Custody Security',
    desc: '93% of assets in institutional custody',
  },
];

export default function RiskComplianceFlags() {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-3 flex flex-col h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 mb-2">Risk & Compliance Flags</h2>
      {FLAGS.map((flag) => (
        <div key={flag.title} className="border-l-4 border-yellow-400 pl-3 py-2">
          <div className="font-medium text-gray-700">{flag.title}</div>
          <div className="text-xs text-gray-500">{flag.desc}</div>
        </div>
      ))}
    </div>
  );
}
