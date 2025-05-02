import { Router } from "express";
import { Portfolio } from "@highwater/types";

const router = Router();

// Example: GET /portfolios
router.get("/", (req, res) => {
  const portfolios: Portfolio[] = [];
  res.json(portfolios);
});

export default router;
