import { Router } from "express";
import { Client } from "@highwater/types";

const router = Router();

// Example: GET /clients
router.get("/", (req, res) => {
  const clients: Client[] = [];
  res.json(clients);
});

export default router;
