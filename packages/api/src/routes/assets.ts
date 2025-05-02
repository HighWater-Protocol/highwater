import { Router } from "express";
import { Asset } from "@highwater/types";

const router = Router();

// Example: GET /assets
router.get("/", (req, res) => {
  const assets: Asset[] = [];
  res.json(assets);
});

export default router;
