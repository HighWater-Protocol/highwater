import { Request, Response, NextFunction } from 'express';

interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  database: {
    status: 'connected' | 'disconnected';
  };
}

export const getHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthCheck: HealthCheckResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      database: {
        status: 'connected', // In a real app, you would check the database connection here
      },
    };
    // log something
    console.log('Health check:', healthCheck);
    // If any critical services are down, set status to error
    if (healthCheck.database.status !== 'connected') {
      healthCheck.status = 'error';
    }

    res.status(healthCheck.status === 'ok' ? 200 : 503).json(healthCheck);
  } catch (error) {
    next(error);
  }
};
