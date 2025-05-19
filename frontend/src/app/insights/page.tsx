'use client';

import React from 'react'
import NavBar from '@/components/ui/NavBar'
import MarketSignals from '@/components/insights/MarketSignals'
import AIInsights from '@/components/insights/AIInsights'
import Alerts from '@/components/other/Alerts'
import NewsFeed from '@/components/insights/NewsFeed'
import OnChainTrends from '@/components/insights/OnChainTrends'
import { insightPageAPIs } from '@/gateway/insightPageAPIs'
import { Skeleton } from '@/components/ui/skeleton'

export default function InsightsPage() {
  const { 
    marketSignals, 
    aiInsights, 
    alerts, 
    news, 
    loading, 
    error 
  } = insightPageAPIs();

  if (Object.values(loading).some(Boolean) && !Object.values(error).some(Boolean)) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-gray-50 p-8 space-y-8">
          <div className="space-y-8">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Insights</h1>
            <p className="mt-1 text-gray-600 text-sm">
              Last updated: {new Date().toLocaleString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
          </div>
        </div>

        {/* Display any errors */}
        {Object.entries(error).map(([key, err]) => 
          err && (
            <div key={key} className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {err}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {/* Market Signals + AI Insights */}
        <div className="flex flex-col lg:flex-row gap-6">
          <MarketSignals signals={marketSignals} loading={loading.marketSignals} error={error.marketSignals} />
          <AIInsights insights={aiInsights} loading={loading.aiInsights} error={error.aiInsights} />
        </div>

        {/* On-Chain Trends */}
        <OnChainTrends />

        {/* Alerts & News */}
        <div className="flex flex-col lg:flex-row gap-6">
          <Alerts alerts={alerts} loading={loading.alerts} error={error.alerts} />
          <NewsFeed news={news} loading={loading.news} error={error.news} />
        </div>
      </main>
    </>
  );
}
