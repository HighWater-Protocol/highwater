export interface ComplianceLog {
  id: string;
  userId: string;
  clientId: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface ComplianceReport {
  id: string;
  clientId: string;
  portfolioId: string;
  advisorId: string;
  summary: string;
  createdAt: string;
  notes?: string;
}
