import express, { Request, Response } from 'express';
import {
  createPortfolioController,
  getPortfoliosController,
  updatePortfolioController,
  deletePortfolioController,
} from '../controllers/portfoliosController';
import { authenticateJWT } from '../auth/authMiddleware';

const router = express.Router();

// In-memory UI/UX design for consistency with the web app
const baseStyles = `
  body { font-family: Arial, sans-serif; background: #f7f9fb; margin: 0; }
  .container { max-width: 700px; margin: 3rem auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 2rem; }
  h2 { color: #2d72d9; }
  nav { margin-bottom: 2rem; }
  nav a { color: #2d72d9; text-decoration: none; margin-right: 1.5rem; font-weight: 600; }
  nav a:hover { text-decoration: underline; }
  table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
  th, td { padding: 0.75rem 1rem; border-bottom: 1px solid #eee; text-align: left; }
  th { background: #f3f6fa; }
  .actions { white-space: nowrap; }
  .btn { color: #fff; background: #2d72d9; border: none; border-radius: 4px; padding: 0.4rem 1rem; font-weight: 600; cursor: pointer; margin-right: 0.5rem; }
  .btn:hover { background: #1a4e96; }
`;

// Portfolios dashboard with mock data for UI/UX
router.get('/api/v1/portfolios', async (req: Request, res: Response) => {
  // TODO: Replace with actual DB call
  const portfolios = [
    { id: '1', name: 'Growth Portfolio', clientId: '1', assets: 5 },
    { id: '2', name: 'Income Portfolio', clientId: '2', assets: 7 },
  ];
  res.send(`
    <html>
      <head>
        <title>Portfolios</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <nav>
            <a href="/">Dashboard</a>
            <a href="/profile">Profile</a>
            <a href="/api/v1/clients">Clients</a>
            <a href="/logout">Log Out</a>
          </nav>
          <h2>Portfolios</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Client ID</th><th># Assets</th><th class="actions">Actions</th></tr>
            </thead>
            <tbody>
              ${portfolios.map(p => `
                <tr>
                  <td>${p.name}</td>
                  <td>${p.clientId}</td>
                  <td>${p.assets}</td>
                  <td class="actions">
                    <button class="btn" disabled>Edit</button>
                    <button class="btn" disabled>Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <button class="btn" style="margin-top:2rem;" disabled>Add Portfolio</button>
        </div>
      </body>
    </html>
  `);
});

// API endpoints (if needed)
// router.post('/', authenticateJWT, createPortfolioController);
// router.get('/', authenticateJWT, getPortfoliosController);
// router.put('/:id', authenticateJWT, updatePortfolioController);
// router.delete('/:id', authenticateJWT, deletePortfolioController);

export default router;
