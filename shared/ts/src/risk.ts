export interface RiskReport {
  id: string;
  portfolioId: string;
  volatility: number;
  liquidity: number;
  custodyConcentration: number;
  regulatoryFlags: string[];
  createdAt: string;
}
