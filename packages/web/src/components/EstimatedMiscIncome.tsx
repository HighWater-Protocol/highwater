import React from 'react';

const MOCK_MISC = [
  { type: 'Rewards', amount: '$1,250', txCount: 8 },
  { type: 'Forks', amount: '$300', txCount: 2 },
  { type: 'Airdrops', amount: '$2,100', txCount: 4 },
];

export default function EstimatedMiscIncome() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 tracking-tight">Estimated MISC Income</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 uppercase text-xs border-b">
            <th className="py-2">Activity Type</th>
            <th className="py-2 text-center">Transactions</th>
            <th className="py-2 text-right">Income</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_MISC.map((item) => (
            <tr key={item.type} className="border-b last:border-0">
              <td className="py-2 font-medium text-gray-700">{item.type}</td>
              <td className="py-2 text-gray-600 text-center">{item.txCount}</td>
              <td className="py-2 text-green-700 font-semibold text-right">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-4" />
    </div>
  );
}
