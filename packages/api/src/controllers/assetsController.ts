import { Request, Response, NextFunction } from "express";
import { fetchAssets } from "../services/assetService";
import { saveAssets, getAssets } from "../dal/assetDal";

export async function getAssetsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { start, limit, convert } = req.query;
    const assets = await fetchAssets({
      start: start ? Number(start) : 1,
      limit: limit ? Number(limit) : 10,
      convert: typeof convert === "string" ? convert : "USD",
    });
    saveAssets(assets);
    res.json(assets);
  } catch (err) {
    next(err);
  }
}

export function getCachedAssetsController(req: Request, res: Response) {
  const assets = getAssets();
  res.json(assets);
}
