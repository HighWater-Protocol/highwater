import { Router } from "express";
import assetsRouter from "./assets";
import clientsRouter from "./clients";
import portfoliosRouter from "./portfolios";
import riskRouter from "./risk";
import complianceRouter from "./compliance";

const router: Router = Router();

router.use("/assets", assetsRouter);
router.use("/clients", clientsRouter);
router.use("/portfolios", portfoliosRouter);
router.use("/risk", riskRouter);
router.use("/compliance", complianceRouter);

export default router;
