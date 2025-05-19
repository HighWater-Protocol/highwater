import React from 'react';

const MOCK_GAINS = [
  { asset: 'BTC', realized: '+$275,678', unrealized: '+$674,321' },
  { asset: 'ETH', realized: '+$124,356', unrealized: '+$421,456' },
  { asset: 'SOL', realized: '+$58,942', unrealized: '+$157,684' },
  { asset: 'Other', realized: '+$14,471', unrealized: '+$570,217' },
];

export default function GainLossAnalysis() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 mb-4 tracking-tight">Gain / Loss Analysis</h2>
      <div className="flex flex-col md:flex-row gap-8 flex-1">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 border border-gray-50 flex h-full justify-between">
          <div className="text-xs text-gray-500 mb-1 font-semibold uppercase">Realized Gains/Losses</div>
          <div className="text-3xl font-extrabold text-green-700 mb-2">+$482,356</div>
          <ul className="text-sm text-gray-700 space-y-1 flex-1">
            {MOCK_GAINS.map((g) => (
              <li key={g.asset} className="flex justify-between items-center">
                <span className="font-medium text-gray-600">{g.asset}</span>
                <span className={`tabular-nums font-medium ${g.realized.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{g.realized}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 border border-gray-50 flex h-full justify-between">
          <div className="text-xs text-gray-500 mb-1 font-semibold uppercase">Unrealized Gains/Losses</div>
          <div className="text-3xl font-extrabold text-blue-700 mb-2">+$1,253,678</div>
          <ul className="text-sm text-gray-700 space-y-1 flex-1">
            {MOCK_GAINS.map((g) => (
              <li key={g.asset} className="flex justify-between items-center">
                <span className="font-medium text-gray-600">{g.asset}</span>
                <span className={`tabular-nums font-medium ${g.unrealized.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{g.unrealized}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
