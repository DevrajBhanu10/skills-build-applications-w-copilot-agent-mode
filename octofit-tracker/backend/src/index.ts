import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app: Express = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit';

// Codespaces-aware API URL support
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

const API_URL = getApiUrl();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Backend is running',
    apiUrl: API_URL,
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on ${API_URL}`);
  console.log(`MongoDB connected to: ${MONGODB_URI}`);
});
