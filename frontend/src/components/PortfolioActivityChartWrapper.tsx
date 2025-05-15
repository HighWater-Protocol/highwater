'use client';

import { useState } from 'react';
import PortfolioActivityChart, { PortfolioDataPoint } from './PortfolioActivityChart';

export default function PortfolioActivityChartWrapper() {
  const [timeRange, setTimeRange] = useState('1M');
  
  // Mock data - replace with your actual data fetching logic
  const chartData: PortfolioDataPoint[] = [];
  const loading = false;
  const error = null;

  return (
    <PortfolioActivityChart 
      data={chartData}
      loading={loading}
      error={error}
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
    />
  );
}
