// packages/web/src/app/insights/page.tsx
import React from 'react'
import NavBar from '../../components/NavBar'
import { InformationCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { MARKET_SIGNALS, AI_INSIGHTS, ALERTS, NEWS } from '../../data/mockDashboard'
import MarketSignals from '../../components/MarketSignals'
import AIInsights from '../../components/AIInsights'
import Alerts from '../../components/Alerts'
import NewsFeed from '../../components/NewsFeed'
import OnChainTrends from '../../components/OnChainTrends'
import RiskComplianceFlags from '../../components/RiskComplianceFlags'

export default function InsightsPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Insights</h1>
            <p className="mt-1 text-gray-600 text-sm">Last updated: April 30, 2025 · 01:02 AM EST</p>
          </div>
        </div>

        {/* Market Signals + AI Insights */}
        <div className="flex flex-col lg:flex-row gap-6">
          <MarketSignals />
          <AIInsights />
        </div>

        {/* On-Chain Trends */}
        <OnChainTrends />

        {/* Alerts & News */}
        <div className="flex flex-col lg:flex-row gap-6 h-[500px]">
          <div className="flex-1 h-full overflow-y-auto">
            <Alerts />
          </div>
          <div className="flex-1 h-full overflow-y-auto">
            <NewsFeed />
          </div>
        </div>
      </main>
    </>
  )
}
