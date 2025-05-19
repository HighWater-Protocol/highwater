import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { Portfolio } from "@highwater/types";

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

router.get("/:id/allocation", getPortfolioAllocation);

export default router;
