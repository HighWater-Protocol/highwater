import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { Client } from "@highwater/types";
import { ClientResponse } from "../types/api";

const router = Router();

interface ClientsRequest extends Request {
  query: {
    page?: string;
    limit?: string;
  };
}

// Get all clients with pagination
const getClients: RequestHandler = async (req: ClientsRequest, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    
    // TODO: Implement actual client retrieval logic
    const clients: Client[] = [];
    const total = 0;
    const totalPages = Math.ceil(total / limit);

    const response: ClientResponse = {
      success: true,
      data: clients,
      total,
      page,
      totalPages
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

router.get("/", getClients);

export default router;
