import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { ParsedQs } from "qs";
// Import types from the shared types package
import { MarketSignal, AIInsight, Alert, NewsItem } from "@highwater/types";

const router = Router();

// Mock data - replace with actual database calls in production
const mockMarketSignals: MarketSignal[] = [
  {
    title: "SP 500",
    value: "4,567.89",
    change: "+1.23%",
    footnote: "All-time high"
  },
  {
    title: "BTC/USD",
    value: "$42,123.45",
    change: "-2.34%",
    footnote: "24h"
  },
  {
    title: "VIX",
    value: "18.76",
    change: "-0.45%",
    footnote: "Volatility Index"
  }
];

const mockAIInsights: AIInsight[] = [
  {
    text: "Market volatility expected to increase by 15% in the next 24 hours.",
    priority: "high",
    time: "2 hours ago"
  },
  {
    text: "Bitcoin showing strong support at $40,000 level.",
    priority: "medium",
    time: "5 hours ago"
  }
];

const mockAlerts: Alert[] = [
  {
    title: "Price Alert",
    desc: "BTC crossed $42,000",
    time: "10:30 AM",
    action: "View"
  },
  {
    title: "Portfolio Alert",
    desc: "Your portfolio is down 2.5% today",
    time: "9:15 AM",
    action: "Review"
  }
];

const mockNews: NewsItem[] = [
  {
    headline: "Fed Signals Potential Rate Cuts in 2024",
    source: "Bloomberg",
    time: "1 hour ago",
    tag: "Markets"
  },
  {
    headline: "Bitcoin ETF Approval Imminent, Analysts Say",
    source: "CoinDesk",
    time: "3 hours ago",
    tag: "Crypto"
  }
];

// Market Signals
const getMarketSignals: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Replace with actual database call
    res.json({
      success: true,
      data: mockMarketSignals
    });
  } catch (error) {
    next(error);
  }
};

// AI Insights
const getAIInsights: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Replace with actual database call
    res.json({
      success: true,
      data: mockAIInsights
    });
  } catch (error) {
    next(error);
  }
};

// Alerts
const getAlerts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Replace with actual database call
    res.json({
      success: true,
      data: mockAlerts
    });
  } catch (error) {
    next(error);
  }
};

// News
const getNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Replace with actual database call
    res.json({
      success: true,
      data: mockNews
    });
  } catch (error) {
    next(error);
  }
};

// Routes
router.get('/market/signals', getMarketSignals);
router.get('/ai/insights', getAIInsights);
router.get('/alerts', getAlerts);
router.get('/news', getNews);

export default router;