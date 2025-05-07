import React from 'react';
import NavBar from '../components/NavBar';
import PortfolioActivityChart from '../components/PortfolioActivityChart';
import NetWorthOverview from '../components/NetWorthOverview';
import PerformanceComparisonChart from '../components/PerformanceComparisonChart';
import RiskComplianceFlags from '../components/RiskComplianceFlags';
import TransactionSummaryTable from '../components/TransactionSummaryTable';
import GainLossAnalysis from '../components/GainLossAnalysis';
import { AllocationBreakdown } from '../components/AllocationBreakdown';

async function getHealth() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/health`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.statusText}`);
  }
  return res.json() as Promise<{ status: string; timestamp: string }>;
}

export default async function Home() {
  let health: { status: string; timestamp: string };
  try {
    health = await getHealth();
  } catch (err: any) {
    health = { status: 'error', timestamp: err.message };
  }

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


      </main>
    </>
  );
}
