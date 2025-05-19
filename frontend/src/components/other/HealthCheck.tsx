'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/gateway/apiClient';

interface HealthCheckProps {
  className?: string;
}

export default function HealthCheck({ className = '' }: HealthCheckProps) {
  const [health, setHealth] = useState<{
    status: 'ok' | 'error';
    timestamp: string;
    uptime: number;
    environment: string;
    version: string;
    database: {
      status: 'connected' | 'disconnected';
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getHealth();
      setHealth(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch health status:', err);
      setError('Failed to load health status');
      setHealth({
        status: 'error',
        timestamp: new Date().toISOString(),
        uptime: 0,
        environment: 'unknown',
        version: 'unknown',
        database: { status: 'disconnected' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchHealth();
    
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(() => {
      console.log('Refreshing health check...');
      fetchHealth();
    }, 30000);
    
    // Clean up interval on component unmount
    return () => {
      console.log('Cleaning up health check interval');
      clearInterval(interval);
    };
  }, []);

  if (isLoading && !health) {
    return (
      <div className="bg-white rounded shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="bg-white rounded shadow p-6">
        <div className="text-red-500 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Health status unavailable
        </div>
        {error && <p className="mt-2 text-sm text-gray-600">{error}</p>}
        <button 
          onClick={fetchHealth}
          className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);
    
    return parts.join(' ');
  };

  return (
    <div className={`bg-white rounded shadow p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">API Health Check</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <span className="font-medium">Status:</span>
            <span 
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                health.status === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {health.status.toUpperCase()}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-2 sm:mt-0">
            Last checked: {new Date(health.timestamp).toLocaleString()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Environment</div>
            <div className="font-medium capitalize">{health.environment}</div>
          </div>
          <div>
            <div className="text-gray-500">Version</div>
            <div className="font-medium">{health.version}</div>
          </div>
          <div>
            <div className="text-gray-500">Uptime</div>
            <div className="font-mono">{formatUptime(health.uptime)}</div>
          </div>
          <div>
            <div className="text-gray-500">Database</div>
            <div className="flex items-center">
              <span 
                className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  health.database.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              <span className="capitalize">{health.database.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
