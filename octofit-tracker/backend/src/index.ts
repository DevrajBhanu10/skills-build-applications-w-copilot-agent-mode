import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config/api';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(config.mongoDbUri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// Health check route with API URL info
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Backend is running',
    apiUrl: config.apiUrl,
    environment: config.environment,
    isCodespaces: config.isCodespaces
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start Server
app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║        🏋️  OctoFit Tracker Backend Started             ║
╚════════════════════════════════════════════════════════╝

📍 API URL: ${config.apiUrl}
🌍 Environment: ${config.environment}
📊 MongoDB: ${config.mongoDbUri}
${config.isCodespaces ? `🚀 Codespace: ${config.codespaceName}` : ''}

Available Endpoints:
  • GET  /api/health           - Server health check
  • GET  /api/users            - Get all users
  • POST /api/users            - Create new user
  • GET  /api/teams            - Get all teams
  • POST /api/teams            - Create new team
  • GET  /api/activities       - Get all activities
  • POST /api/activities       - Log new activity
  • GET  /api/leaderboard      - Get global leaderboard
  • GET  /api/workouts         - Get all workouts
  • POST /api/workouts         - Create new workout

📚 API Documentation: ${config.apiUrl}/api/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
