import express from "express";
import cors from "cors";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger API docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount all routes
app.use("/api/v1", routes);

export default app;
