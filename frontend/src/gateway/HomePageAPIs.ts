import { useEffect, useState } from 'react';
import { apiClient } from '@/gateway/apiClient';
import { PortfolioAllocation, RiskComplianceFlag } from '@highwater/types';

interface HomePageAPIState {
  portfolioAllocation: PortfolioAllocation[];
  riskComplianceFlags: RiskComplianceFlag[];
  // Add other data types as needed
  loading: {
    portfolioAllocation: boolean;
    riskComplianceFlags: boolean;
    // Add other loading states as needed
  };
  error: {
    portfolioAllocation: string | null;
    riskComplianceFlags: string | null;
    // Add other error states as needed
  };
}

export function useHomePageAPIs(portfolioId: string = 'default'): HomePageAPIState {
  // State for portfolio allocation
  const [portfolioAllocation, setPortfolioAllocation] = useState<PortfolioAllocation[]>([]);
  const [riskComplianceFlags, setRiskComplianceFlags] = useState<RiskComplianceFlag[]>([]);
  
  // Loading and error states
  const [loading, setLoading] = useState({
    portfolioAllocation: true,
    riskComplianceFlags: true,
  });

  const [error, setError] = useState({
    portfolioAllocation: null as string | null,
    riskComplianceFlags: null as string | null,
  });

  // Fetch all data when component mounts or portfolioId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [allocationData, riskFlagsData] = await Promise.allSettled([
          apiClient.getPortfolioAllocation(portfolioId),
          apiClient.getRiskComplianceFlags(),
          // Add other API calls here
        ]);

        // Handle portfolio allocation
        if (allocationData.status === 'fulfilled') {
          setPortfolioAllocation(allocationData.value);
        } else {
          setError(prev => ({ ...prev, portfolioAllocation: 'Failed to load portfolio allocation' }));
          console.error('Error fetching portfolio allocation:', allocationData.reason);
        }

        // Handle risk compliance flags
        if (riskFlagsData.status === 'fulfilled') {
          setRiskComplianceFlags(riskFlagsData.value);
        } else {
          setError(prev => ({ ...prev, riskComplianceFlags: 'Failed to load risk compliance flags' }));
          console.error('Error fetching risk compliance flags:', riskFlagsData.reason);
        }

      } catch (err) {
        console.error('Error in HomePageAPIs:', err);
        setError({
          portfolioAllocation: 'Failed to load portfolio data',
          riskComplianceFlags: 'Failed to load risk data',
        });
      } finally {
        setLoading({
          portfolioAllocation: false,
          riskComplianceFlags: false,
        });
      }
    };

    fetchData();
  }, [portfolioId]);

  return {
    portfolioAllocation,
    riskComplianceFlags,
    loading,
    error,
  };
}

// Helper function to get health status
export async function getHealth(): Promise<{ status: string; timestamp: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/health`,
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in getHealth:', error);
    throw error;
  }
}
