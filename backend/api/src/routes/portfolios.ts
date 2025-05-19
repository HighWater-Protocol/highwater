import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { Portfolio } from "@highwater/types";

interface PortfolioTimeSeriesPoint {
  date: string;
  value: number;
}

// Local interface since it's not in the shared types yet
interface PortfolioAllocation {
  label: string;
  value: number;
}

// Mock data for portfolio allocations
const mockPortfolioAllocation: PortfolioAllocation[] = [
  { label: 'Layer 1s', value: 1138000 },
  { label: 'DeFi', value: 811420 },
  { label: 'Stablecoins', value: 648135 },
  { label: 'Tokenized Assets', value: 486652 },
  { label: 'NFTs', value: 192277 },
];

const router = Router();

interface PortfoliosRequest extends Request {
  query: {
    page?: string;
    limit?: string;
    clientId?: string;
  };
}

// Get all portfolios with pagination
const getPortfolios: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const typedReq = req as PortfoliosRequest;
  try {
    const page = Number(typedReq.query.page) || 1;
    const limit = Number(typedReq.query.limit) || 10;
    const clientId = typedReq.query.clientId;
    
    // TODO: Implement actual portfolio retrieval logic
    const portfolios: Portfolio[] = [];
    const total = 0;
    const totalPages = Math.ceil(total / limit);

    const response = {
      success: true,
      data: portfolios,
      total,
      page,
      totalPages
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

// Get single portfolio by ID
const getPortfolioById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const portfolioId = req.params.id as string;
    
    // TODO: Implement actual portfolio retrieval logic
    const portfolio: Portfolio | null = null;

    const response = {
      success: true,
      data: portfolio ? [portfolio] : [],
      total: portfolio ? 1 : 0,
      page: 1,
      totalPages: 1
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

router.get("/", getPortfolios);
router.get("/:id", getPortfolioById);

// Get portfolio allocation
const getPortfolioAllocation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      data: mockPortfolioAllocation,
    });
  } catch (error) {
    next(error);
  }
};

// Get portfolio time series data
const getPortfolioTimeSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { range = '1M' } = req.query;
    
    // In a real implementation, we would fetch this from a database
    const baseValue = 5000000; // $5M base value
    const now = new Date();
    const data: PortfolioTimeSeriesPoint[] = [];
    
    // Configuration for each time range
    const rangeConfig = {
      '1D': {
        points: 24, // 24 hours in a day
        interval: 60 * 60 * 1000, // 1 hour in milliseconds
        variation: 0.003 // Small variation for hourly data
      },
      '1W': {
        points: 14, // 14 data points (every 12 hours for 7 days)
        interval: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
        variation: 0.01
      },
      '1M': {
        points: 30, // 30 days
        interval: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        variation: 0.02
      },
      '3M': {
        points: 30, // 30 data points (approx. every 3 days)
        interval: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
        variation: 0.03
      },
      'YTD': {
        points: 30, // 30 data points
        interval: Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (30 * 24 * 60 * 60 * 1000)) * 24 * 60 * 60 * 1000,
        variation: 0.05
      },
      '1Y': {
        points: 52, // 52 weeks
        interval: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        variation: 0.04
      },
      'ALL': {
        points: 24, // 24 months
        interval: 30 * 24 * 60 * 60 * 1000, // ~1 month in milliseconds
        variation: 0.06
      }
    };

    const config = rangeConfig[range as keyof typeof rangeConfig] || rangeConfig['1M'];
    let currentValue = baseValue;
    const currentTime = now.getTime();
    
    // Generate data points from most recent to oldest
    for (let i = 0; i <= config.points; i++) {
      const timestamp = currentTime - (i * config.interval);
      const date = new Date(timestamp);
      
      // Skip if date is in the future (can happen with fixed intervals)
      if (date > now) continue;
      
      // Add some random variation to simulate market movements
      const variation = (Math.random() * 2 - 1) * config.variation * currentValue;
      currentValue = Math.max(1000, currentValue + variation); // Ensure value never goes below $1000
      
      // Ensure we don't have duplicate timestamps
      if (data.length > 0 && data[data.length - 1].date === date.toISOString()) {
        continue;
      }
      
      data.unshift({
        date: date.toISOString(),
        value: Number(currentValue.toFixed(2))
      });
    }
    
    // Make sure we have at least 2 points
    if (data.length < 2) {
      data.unshift({
        date: new Date(currentTime - config.interval).toISOString(),
        value: Number((baseValue * 0.95).toFixed(2))
      });
    }
    
    res.json({
      success: true,
      data
    });
    
  } catch (error) {
    next(error);
  }
};

router.get("/:id/allocation", getPortfolioAllocation);
router.get("/:id/timeseries", getPortfolioTimeSeries);

export default router;
