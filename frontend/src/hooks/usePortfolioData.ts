import { useState, useEffect } from 'react';
import { portfolioAPI, Holding, Trade, Transaction, Allocation } from '@/gateway/portfolioAPIs';

export function usePortfolioData(portfolioId: string = 'default') {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allocation, setAllocation] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState({
    holdings: true,
    trades: true,
    transactions: true,
    allocation: true,
  });
  const [error, setError] = useState({
    holdings: null as string | null,
    trades: null as string | null,
    transactions: null as string | null,
    allocation: null as string | null,
  });

  // Fetch all portfolio data
  const fetchPortfolioData = async () => {
    try {
      setLoading({
        holdings: true,
        trades: true,
        transactions: true,
        allocation: true,
      });

      // Fetch all data in parallel
      const [holdingsData, tradesData, transactionsData, allocationData] = await Promise.all([
        portfolioAPI.getHoldings(portfolioId),
        portfolioAPI.getRecentTrades(portfolioId, 10),
        portfolioAPI.getTransactionHistory(portfolioId, 1, 10).then(res => res.data),
        portfolioAPI.getAllocation(portfolioId),
      ]);

      setHoldings(holdingsData);
      setTrades(tradesData);
      setTransactions(transactionsData);
      setAllocation(allocationData);

      setError({
        holdings: null,
        trades: null,
        transactions: null,
        allocation: null,
      });
    } catch (err) {
      const error = err as Error;
      setError({
        holdings: error.message,
        trades: error.message,
        transactions: error.message,
        allocation: error.message,
      });
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading({
        holdings: false,
        trades: false,
        transactions: false,
        allocation: false,
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPortfolioData();
  }, [portfolioId]);

  // Refetch function
  const refetch = () => {
    fetchPortfolioData();
  };

  return {
    holdings,
    trades,
    transactions,
    allocation,
    loading,
    error,
    refetch,
  };
}
