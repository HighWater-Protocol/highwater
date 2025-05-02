"use client";
import React from 'react';
import NavBar from '../../components/NavBar';
import { AllocationBreakdown } from '../../components/AllocationBreakdown';
import GainLossAnalysis from '../../components/GainLossAnalysis';
import TransactionSummaryTable from '../../components/TransactionSummaryTable';
import HoldingsTable from '../../components/HoldingsTable';
import RecentTrades from '../../components/RecentTrades';

export default function Portfolio() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Portfolio Overview</h1>
            <p className="mt-1 text-gray-600 text-sm">Last updated: May 2, 2025 · 01:02 AM EST</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AllocationBreakdown />
          <GainLossAnalysis />
        </div>
        <TransactionSummaryTable />
        <HoldingsTable />
        <RecentTrades />
      </main>
    </>
  );
}
