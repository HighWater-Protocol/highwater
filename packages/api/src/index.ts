import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';

dotenv.config();

const app = express();
app.use(cors(), express.json());

// Health endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 API Service listening on http://localhost:${port}`);
});
