export interface RiskComplianceFlag {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: 'risk' | 'compliance' | 'security';
  createdAt: string;
  updatedAt: string;
}

export interface RiskReport {
  id: string;
  portfolioId: string;
  volatility: number;
  liquidity: number;
  custodyConcentration: number;
  regulatoryFlags: RiskComplianceFlag[];
  createdAt: string;
}
