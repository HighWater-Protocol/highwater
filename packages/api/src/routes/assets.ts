import { Router } from "express";
import { getAssetsController, getCachedAssetsController } from "../controllers/assetsController";

const router: Router = Router();

// Example: GET /assets
// router.get("/", (req, res) => {
//   const assets: Asset[] = [];
//   res.json(assets);
// });

// GET /api/v1/assets/live - fetches live data from CoinMarketCap
router.get("/live", getAssetsController);

// GET /api/v1/assets/cache - returns cached assets
router.get("/cache", getCachedAssetsController);

export default router;
