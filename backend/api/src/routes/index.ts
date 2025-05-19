import { Router } from "express";
import assetsRouter from "./assets";
import clientsRouter from "./clients";
import portfoliosRouter from "./portfolios";
import riskRouter from "./risk";
import complianceRouter from "./compliance";
import insightsRouter from "./insights";
import { getHealth } from "./health";

const router = Router();

// Health check endpoint
router.get("/health", getHealth);

// API routes
router.use("/assets", assetsRouter);
router.use("/clients", clientsRouter);
router.use("/portfolios", portfoliosRouter);
router.use("/risk", riskRouter);
router.use("/compliance", complianceRouter);
// Mount insights routes without a prefix since they have their own paths
router.use(insightsRouter);

export default router;
