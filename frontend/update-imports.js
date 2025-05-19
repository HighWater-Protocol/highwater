const fs = require('fs');
const path = require('path');

// Map of old import paths to new ones
const importMappings = {
  // Home components
  "@/components/MarketSignals": "@/components/home/MarketSignals",
  "@/components/NewsFeed": "@/components/home/NewsFeed",
  "@/components/NetWorthOverview": "@/components/home/NetWorthOverview",
  "@/components/RecentTrades": "@/components/home/RecentTrades",
  
  // Insights components
  "@/components/AIInsights": "@/components/insights/AIInsights",
  "@/components/GainLossAnalysis": "@/components/insights/GainLossAnalysis",
  "@/components/OnChainTrends": "@/components/insights/OnChainTrends",
  "@/components/PerformanceComparisonChart": "@/components/insights/PerformanceComparisonChart",
  
  // Portfolios components
  "@/components/AllocationBreakdown": "@/components/portfolios/AllocationBreakdown",
  "@/components/HoldingsTable": "@/components/portfolios/HoldingsTable",
  "@/components/PortfolioActivityChart": "@/components/portfolios/PortfolioActivityChart",
  "@/components/TransactionSummaryTable": "@/components/portfolios/TransactionSummaryTable",
  
  // Other components
  "@/components/Alerts": "@/components/other/Alerts",
  "@/components/HealthCheck": "@/components/other/HealthCheck",
  "@/components/RiskComplianceFlags": "@/components/other/RiskComplianceFlags",
  
  // UI components
  "@/components/NavBar": "@/components/ui/NavBar",
  "@/components/ui/skeleton": "@/components/ui/skeleton"
};

// Also handle relative imports
const relativeMappings = {
  // Home components
  '../../components/MarketSignals': '../../components/home/MarketSignals',
  '../../components/NewsFeed': '../../components/home/NewsFeed',
  '../../components/NetWorthOverview': '../../components/home/NetWorthOverview',
  '../../components/RecentTrades': '../../components/home/RecentTrades',
  
  // Insights components
  '../../components/AIInsights': '../../components/insights/AIInsights',
  '../../components/GainLossAnalysis': '../../components/insights/GainLossAnalysis',
  '../../components/OnChainTrends': '../../components/insights/OnChainTrends',
  '../../components/PerformanceComparisonChart': '../../components/insights/PerformanceComparisonChart',
  
  // Portfolios components
  '../../components/AllocationBreakdown': '../../components/portfolios/AllocationBreakdown',
  '../../components/HoldingsTable': '../../components/portfolios/HoldingsTable',
  '../../components/PortfolioActivityChart': '../../components/portfolios/PortfolioActivityChart',
  '../../components/TransactionSummaryTable': '../../components/portfolios/TransactionSummaryTable',
  
  // Other components
  '../../components/Alerts': '../../components/other/Alerts',
  '../../components/HealthCheck': '../../components/other/HealthCheck',
  '../../components/RiskComplianceFlags': '../../components/other/RiskComplianceFlags',
  
  // UI components
  '../../components/NavBar': '../../components/ui/NavBar',
  '../../components/ui/skeleton': '../../components/ui/skeleton',
  
  // Handle the case in NetWorthOverview.tsx
  "'./AllocationBreakdown'": "'../portfolios/AllocationBreakdown'"
};

// Files that need updating
const filesToUpdate = [
  'src/app/page.tsx',
  'src/app/portfolio/page.tsx',
  'src/app/insights/page.tsx',
  'src/app/settings/page.tsx',
  'src/components/home/NetWorthOverview.tsx',
  'src/components/other/Alerts.tsx',
  'src/components/insights/AIInsights.tsx',
  'src/components/home/NewsFeed.tsx',
  'src/components/home/MarketSignals.tsx',
  'src/app/insights/page.tsx'
];

// Process each file
filesToUpdate.forEach(filePath => {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;
      
      // Update imports
      Object.entries(importMappings).forEach(([oldPath, newPath]) => {
        if (content.includes(oldPath)) {
          content = content.replace(
            new RegExp(`from ['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
            `from '${newPath}'`
          );
          updated = true;
        }
      });
      
      // Update relative imports
      Object.entries(relativeMappings).forEach(([oldPath, newPath]) => {
        if (content.includes(oldPath)) {
          content = content.replace(
            new RegExp(`from ['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
            `from '${newPath}'`
          );
          updated = true;
        }
      });
      
      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in ${filePath}`);
      }
    } else {
      console.log(`Skipping non-existent file: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Import updates complete!');
