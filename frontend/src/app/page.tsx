'use client';

import NavBar from '../components/ui/NavBar';
import PortfolioActivityChart from '../components/portfolios/PortfolioActivityChart';
import NetWorthOverview from '../components/home/NetWorthOverview';
import PerformanceComparisonChart from '../components/insights/PerformanceComparisonChart';
import RiskComplianceFlags from '../components/other/RiskComplianceFlags';
import TransactionSummaryTable from '../components/portfolios/TransactionSummaryTable';
import GainLossAnalysis from '../components/insights/GainLossAnalysis';
import { AllocationBreakdown } from '../components/portfolios/AllocationBreakdown';
import HealthCheck from '../components/other/HealthCheck';
import { useHomePageAPIs } from '../gateway/HomePageAPIs';

// Client component wrapper to handle client-side data fetching
function HomeContent() {
  const { 
    portfolioAllocation, 
    riskComplianceFlags, 
    loading, 
    error 
  } = useHomePageAPIs('default');

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Home Dashboard</h1>
            <p className="mt-1 text-gray-600 text-sm">Last updated: April 30, 2025 · 01:02 AM EST</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Export</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Refresh</button>
          </div>
        </div>

        {/* Top Row: Activity Chart + Net Worth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PortfolioActivityChart />
          </div>
          <NetWorthOverview />
        </div>

        {/* Performance Comparison + Risk Flags */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceComparisonChart />
          </div>
          <RiskComplianceFlags />
        </div>

        {/* Transaction Summary + Gain/Loss */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionSummaryTable />
          <GainLossAnalysis />
        </div>

        {/* Allocation Breakdown */}
        <AllocationBreakdown />

        {/* API Health */}
        <div className="bg-white rounded shadow p-6">
          <HealthCheck />
        </div>
      </main>
    </>
  );
}

export default HomeContent;
