"use client";
import React, { useEffect, useState } from 'react';
import { apiClient } from '@/gateway/apiClient';

import { RiskComplianceFlag } from '@highwater/types';

const getBorderColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'border-red-500';
    case 'medium':
      return 'border-yellow-400';
    case 'low':
      return 'border-green-500';
    default:
      return 'border-gray-300';
  }
};

export default function RiskComplianceFlags() {
  const [flags, setFlags] = useState<RiskComplianceFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const data = await apiClient.getRiskComplianceFlags();
        setFlags(data);
      } catch (err) {
        console.error('Failed to fetch risk and compliance flags:', err);
        setError('Failed to load risk and compliance data');
      } finally {
        setLoading(false);
      }
    };

    fetchFlags();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-3 flex flex-col h-full">
        <h2 className="text-xl font-medium text-gray-800 mb-2">Risk & Compliance Flags</h2>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-3 flex flex-col h-full">
        <h2 className="text-xl font-medium text-gray-800 mb-2">Risk & Compliance Flags</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-3 flex flex-col h-full">
      <h2 className="text-xl font-medium text-gray-800 mb-2">Risk & Compliance Flags</h2>
      {flags.length === 0 ? (
        <div className="text-gray-500 text-center my-4">No risk or compliance flags found</div>
      ) : (
        flags.map((flag) => (
          <div 
            key={flag.id} 
            className={`border-l-4 ${getBorderColor(flag.severity)} pl-3 py-2`}
          >
            <div className="font-medium text-gray-700">{flag.title}</div>
            <div className="text-xs text-gray-500">{flag.description}</div>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                flag.severity === 'high' ? 'bg-red-100 text-red-800' :
                flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {flag.severity.charAt(0).toUpperCase() + flag.severity.slice(1)} {flag.category}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
