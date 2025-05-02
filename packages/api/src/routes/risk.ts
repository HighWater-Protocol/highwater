import { Router } from "express";
import { RiskReport } from "@highwater/types";

const router = Router();

// Example: GET /risk
router.get("/", (req, res) => {
  const riskReports: RiskReport[] = [];
  res.json(riskReports);
});

export default router;
