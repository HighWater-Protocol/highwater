import { Router, Request, Response, NextFunction, RequestHandler } from "express";

// Mock data for portfolio holdings
const mockHoldings = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 2.5,
    value: 150000,
    allocation: 35.5,
    price: 60000,
    change24h: 2.5
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 15,
    value: 45000,
    allocation: 28.3,
    price: 3000,
    change24h: -1.2
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    amount: 50000,
    value: 50000,
    allocation: 20.1,
    price: 1,
    change24h: 0
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    amount: 100,
    value: 15000,
    allocation: 10.2,
    price: 150,
    change24h: 5.3
  },
  {
    id: 'dot',
    symbol: 'DOT',
    name: 'Polkadot',
    amount: 200,
    value: 1500,
    allocation: 5.9,
    price: 7.5,
    change24h: -2.1
  }
];

const router = Router();

// Get portfolio holdings
const getHoldings: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const portfolioId = req.params.portfolioId;
    
    // In a real application, you would fetch holdings for the specific portfolio
    // For now, we'll just return the mock data
    res.json({
      success: true,
      data: mockHoldings,
    });
  } catch (error) {
    next(error);
  }
};

router.get("/:portfolioId/holdings", getHoldings);

export default router;
