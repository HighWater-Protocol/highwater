// Frontend-specific portfolio types

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  allocation: number;
  price: number;
  change24h: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  value: number;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRADE' | 'TRANSFER';
  amount: number;
  asset: string;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  details?: Record<string, unknown>;
}

export interface Allocation {
  asset: string;
  value: number;
  allocation: number;
  color?: string;
}

export interface PortfolioTimeSeriesPoint {
  date: string;
  value: number;
}
