import { Request, Response, NextFunction } from "express";
import { createPortfolio, getPortfolios, updatePortfolio, deletePortfolio } from "../dal/portfoliosDal";
import { AuthRequest } from '../auth/authMiddleware';

export async function createPortfolioController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { name, clientId, assets, createdAt, updatedAt } = req.body;
    if (!name || !clientId) {
      return res.status(400).json({ error: "Missing required fields: name, clientId" });
    }
    const newPortfolio = await createPortfolio({
      name,
      clientId,
      assets: assets || [],
      createdAt: createdAt || undefined,
      updatedAt: updatedAt || undefined,
    });
    res.status(201).json(newPortfolio);
  } catch (err: any) {
    next(err);
  }
}

export async function getPortfoliosController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const portfolios = await getPortfolios();
    res.json(portfolios);
  } catch (err: any) {
    next(err);
  }
}

export async function updatePortfolioController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updatePortfolio(id, updates);
    res.json(updated);
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    next(err);
  }
}

export async function deletePortfolioController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deletePortfolio(id);
    res.status(204).send();
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    next(err);
  }
}
