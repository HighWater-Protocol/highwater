import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'dev-access-secret';

export interface AuthRequest extends Request {
  user?: {
    sub: string;
    email?: string;
    [key: string]: any;
  };
}

// Middleware to authenticate JWTs (access tokens)
export const authenticateJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    // Only attach non-sensitive claims
    (req as AuthRequest).user = {
      sub: decoded.sub,
      email: decoded.email,
      // Add other non-sensitive claims if needed
    };
    next();
  });
};
