import { apiClient } from './apiClient';
import { PortfolioAllocation, PortfolioAsset, Asset } from '@highwater/types';
import { 
  Holding, 
  Trade, 
  Transaction, 
  Allocation,
  PortfolioTimeSeriesPoint 
} from '../types/portfolio';

// API functions
export const portfolioAPI = {
  // Get portfolio holdings
  async getHoldings(portfolioId: string = 'default'): Promise<Holding[]> {
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolioId}/holdings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching portfolio holdings:', error);
      throw error;
    }
  },

  // Get recent trades
  async getRecentTrades(portfolioId: string = 'default', limit: number = 10): Promise<Trade[]> {
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolioId}/trades?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching recent trades:', error);
      throw error;
    }
  },

  // Get transaction history
  async getTransactionHistory(
    portfolioId: string = 'default',
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Transaction[]; total: number; page: number; totalPages: number }> {
    try {
      const response = await fetch(
        `/api/v1/portfolios/${portfolioId}/transactions?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  },

  // Get portfolio allocation
  async getAllocation(portfolioId: string = 'default'): Promise<Allocation[]> {
    try {
      const portfolioAllocations = await apiClient.getPortfolioAllocation(portfolioId);
      const totalValue = portfolioAllocations.reduce((sum, alloc) => sum + alloc.value, 0);
      
      // Map the PortfolioAllocation[] to Allocation[]
      return portfolioAllocations.map(alloc => ({
        asset: alloc.label,
        value: alloc.value,
        allocation: totalValue > 0 ? (alloc.value / totalValue) * 100 : 0,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
      }));
    } catch (error) {
      console.error('Error fetching portfolio allocation:', error);
      throw error;
    }
  },

  // Get portfolio value history
  async getPortfolioValueHistory(
    portfolioId: string = 'default',
    range: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL' = '1M'
  ): Promise<PortfolioTimeSeriesPoint[]> {
    try {
      return await apiClient.getPortfolioTimeSeries(portfolioId, range);
    } catch (error) {
      console.error('Error fetching portfolio value history:', error);
      throw error;
    }
  },
};
