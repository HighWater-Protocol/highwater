import { Request, Response, NextFunction } from "express";
import { createClient, getClients, updateClient, deleteClient } from "../dal/clientsDal";
import { AuthRequest } from '../auth/authMiddleware';

export async function createClientController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { name, email, advisorId, createdAt, updatedAt } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields: name, email" });
    }
    const newClient = await createClient({
      name,
      email,
      advisorId: advisorId || null,
      createdAt: createdAt || undefined,
      updatedAt: updatedAt || undefined,
    });
    res.status(201).json(newClient);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: "Email must be unique" });
    }
    next(err);
  }
}

export async function getClientsController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (err: any) {
    next(err);
  }
}

export async function updateClientController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateClient(id, updates);
    res.json(updated);
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Client not found" });
    }
    next(err);
  }
}

export async function deleteClientController(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deleteClient(id);
    res.status(204).send();
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "Client not found" });
    }
    next(err);
  }
}
