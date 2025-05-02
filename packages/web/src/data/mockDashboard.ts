// Centralized mock data for dashboard/insights
export type Signal = {
  title: string
  value: string
  change?: string
  footnote?: string
};

export const MARKET_SIGNALS: Signal[] = [
  { title: 'Crypto Market Volatility Index', value: '76.4', footnote: '30d avg: 58.2', change: '+12.3%' },
  { title: 'Total DeFi TVL', value: '$42.8B', footnote: '7d change: +$1.4B', change: '+3.5%' },
  { title: 'Bitcoin Dominance', value: '52.3%', footnote: '30d avg: 54.6%', change: '-1.8%' },
  { title: 'Stablecoin Net Flow', value: '+$892M', footnote: '24h vol: $14.2B', change: '+28.4%' },
  { title: 'Network Hash Rate', value: '392 EH/s', footnote: '7d avg: 375 EH/s', change: '+8.2%' },
  { title: 'Derivatives Open Interest', value: '$24.6B', footnote: '24h change: +$1.2B', change: '+5.8%' },
  { title: 'Institutional Flows', value: '+$482M', footnote: 'Weekly net flow', change: '+12.4%' },
  { title: 'Regulatory Activity', value: 'Medium', footnote: 'Last 7 days', change: '+3 events' },
];

export const AI_INSIGHTS = [
  { text: 'Your ETH allocation increased in volatility by 17% today. Consider adjusting exposure.', priority: 'Medium priority', time: 'Detected 2 hours ago' },
  { text: 'Stablecoin inflows to exchanges at 3-month high. Potential buying pressure building.', priority: 'Informational', time: 'Detected 4 hours ago' },
  { text: 'Custodial concentration risk: 72% of client BTC held at single provider. Diversification recommended.', priority: 'High priority', time: 'Detected 1 day ago' },
];

export const ALERTS = [
  { title: 'Volatility Spike: SOL', desc: 'Solana volatility exceeds 30-day average by 42%. Current allocation: 8.3% of portfolio.', time: 'Apr 30, 2025 · 08:42 AM', action: 'Rebalance recommended' },
  { title: 'Custodian Overconcentration', desc: '72% of client assets held at CoinSecure. Best practice: ≤50% per custodian.', time: 'Apr 29, 2025 · 03:15 PM', action: 'Diversify holdings' },
  { title: 'Regulatory Flag: AVAX', desc: 'SEC classified Avalanche as a security. Current allocation: 4.2%.', time: 'Apr 28, 2025 · 11:23 AM', action: 'Monitor closely' },
  { title: 'Smart Contract Risk: AAVE', desc: 'High utilization rates in AAVE markets. Liquidity risk increased.', time: 'Apr 27, 2025 · 02:37 PM', action: 'Review exposure' },
  { title: 'Stablecoin Depeg Alert', desc: 'USDT briefly depegged to $0.98 on Binance. Exposure: $1.2M.', time: 'Apr 26, 2025 · 10:12 AM', action: 'Assess risk' },
  { title: 'On-Chain Activity Surge', desc: 'ETH gas fees spiked to 120 Gwei. Recent portfolio transactions affected.', time: 'Apr 25, 2025 · 06:50 PM', action: 'Delay non-urgent transfers' },
  { title: 'Portfolio Drawdown', desc: 'Portfolio value dropped 5% in last 24h. Largest contributor: BTC.', time: 'Apr 24, 2025 · 09:18 AM', action: 'Review positions' },
  { title: 'Exchange Outage', desc: 'Kraken experienced a 2-hour withdrawal outage. No client funds lost.', time: 'Apr 23, 2025 · 04:05 PM', action: 'No action needed' },
];

export const NEWS = [
  { headline: 'SEC Chair Testifies on Crypto Regulation Framework', source: 'Bloomberg', time: '2h ago', tag: 'SEC' },
  { headline: 'Ethereum Foundation Releases Validator Security Guidelines', source: 'CoinDesk', time: '5h ago', tag: 'ETH' },
  { headline: 'EU MiCA Framework Implementation Timeline Accelerated', source: 'Financial Times', time: '8h ago', tag: 'MiCA' },
  { headline: 'Solana DeFi Protocol Patches Critical Vulnerability', source: 'The Block', time: '10h ago', tag: 'SOL' },
  { headline: 'BlackRock Bitcoin ETF Sees $235M Inflow in Single Day', source: 'WSJ', time: '12h ago', tag: 'BTC' },
  { headline: 'CFTC Issues Guidance on Crypto Derivatives Compliance', source: 'Reuters', time: '1d ago', tag: 'CFTC' },
];
