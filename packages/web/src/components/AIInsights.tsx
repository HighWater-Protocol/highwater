import React from 'react';
import { AI_INSIGHTS } from '../data/mockDashboard';

export default function AIInsights() {
  return (
    <div className="w-full lg:w-1/3 space-y-4 flex-shrink-0 bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">AI-Generated Insights</h2>
        <span className="px-2 py-0.5 text-xs font-medium uppercase bg-gray-100 text-gray-500 rounded">Beta</span>
      </div>
      {AI_INSIGHTS.map((i, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-700 leading-snug">{i.text}</p>
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>{i.time}</span>
            <span>{i.priority}</span>
          </div>
        </div>
      ))}
      <p className="text-xs italic text-gray-400">
        AI-generated insights are not financial advice. Always apply professional judgment.
      </p>
    </div>
  );
}
