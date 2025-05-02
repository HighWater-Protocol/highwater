import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import dotenv from 'dotenv';
import clientsRouter from './routes/clients';
import portfoliosRouter from './routes/portfolios';
import http from "http";

dotenv.config();

const config = {
  authRequired: true, // Require login for all routes
  auth0Logout: true,
  secret: process.env.SESSION_SECRET || 'a long, randomly-generated string stored in env',
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID || 'rAMVd4yqqOCdVuB0SoTJGzXcFuqCNSOX',
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || 'https://dev-l7kprrr7la4wg705.us.auth0.com',
};

const app = express();

// Integrate Auth0 OpenID Connect
app.use(auth(config));

// Example home route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>HighWater Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f7f9fb; margin: 0; }
          .container { max-width: 600px; margin: 3rem auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 2rem; }
          h1 { color: #2d72d9; }
          nav { margin: 2rem 0 1rem; }
          nav a { color: #2d72d9; text-decoration: none; margin-right: 1.5rem; font-weight: 600; }
          nav a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to HighWater</h1>
          <nav>
            <a href="/profile">Profile</a>
            <a href="/api/v1/clients">Clients</a>
            <a href="/api/v1/portfolios">Portfolios</a>
            <a href="/logout">Log Out</a>
          </nav>
          <p>This is your dashboard. Use the navigation above to access your data and profile.</p>
        </div>
      </body>
    </html>
  `);
});

// Styled user profile page
app.get('/profile', requiresAuth(), (req, res) => {
  const user = req.oidc.user || {};
  res.send(`
    <html>
      <head>
        <title>User Profile</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; background: #f7f9fb; }
          .profile-card { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 2rem; max-width: 400px; margin: 2rem auto; text-align: center; }
          .profile-card img { border-radius: 50%; width: 96px; height: 96px; margin-bottom: 1rem; }
          .profile-card h2 { margin: 0.5rem 0 0.2rem; }
          .profile-card p { color: #333; margin: 0.2rem 0; }
          .logout { display: inline-block; margin-top: 1.5rem; color: #fff; background: #2d72d9; padding: 0.5rem 1.5rem; border-radius: 4px; text-decoration: none; font-weight: 600; }
          .logout:hover { background: #1a4e96; }
        </style>
      </head>
      <body>
        <div class="profile-card">
          <img src="${user.picture || ''}" alt="Profile Picture" />
          <h2>${user.name || ''}</h2>
          <p><b>Email:</b> ${user.email || ''}</p>
          <p><b>Nickname:</b> ${user.nickname || ''}</p>
          <a class="logout" href="/logout">Log Out</a>
        </div>
      </body>
    </html>
  `);
});

// Attach routers for main features
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/portfolios', portfoliosRouter);

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`HighWater API listening on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("Received shutdown signal, closing server...");
  server.close(() => {
    console.log("Server closed gracefully.");
    process.exit(0);
  });
  // Force exit if not closed in 10 seconds
  setTimeout(() => {
    console.error("Could not close server in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
