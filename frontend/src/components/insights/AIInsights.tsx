import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface AIInsight {
  text: string;
  priority: string;
  time: string;
}

interface AIInsightsProps {
  insights: AIInsight[];
  loading: boolean;
  error: string | null;
}

export default function AIInsights({ insights, loading, error }: AIInsightsProps) {
  return (
    <div className="w-full lg:w-1/3 space-y-4 flex-shrink-0 bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">AI-Generated Insights</h2>
        <span className="px-2 py-0.5 text-xs font-medium uppercase bg-gray-100 text-gray-500 rounded">Beta</span>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {insights.map((i, idx) => (
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
        </>
      )}
    </div>
  );
}
