import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import logger from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info({ message: "Incoming request", method: req.method, url: req.url });
  next();
});

// Swagger API docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount all routes
app.use("/api/v1", routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: "Error occurred", error: err });
  res.status(500).json({ error: "Internal server error" });
});

export default app;
