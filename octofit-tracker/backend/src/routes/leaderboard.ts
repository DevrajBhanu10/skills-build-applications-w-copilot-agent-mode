import express, { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router: Router = express.Router();

// Get global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ activityType: 'overall' })
      .populate('userId')
      .sort({ score: -1 })
      .limit(100);
    res.json({
      message: 'Get global leaderboard',
      data: {
        leaderboard
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId, activityType: 'overall' })
      .populate('userId')
      .sort({ score: -1 });
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      data: { leaderboard }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// Get leaderboard by activity type
router.get('/type/:activityType', async (req: Request, res: Response) => {
  try {
    const { activityType } = req.params;
    const leaderboard = await Leaderboard.find({ activityType: activityType as any })
      .populate('userId')
      .sort({ score: -1 })
      .limit(100);
    res.json({
      message: `Get ${activityType} leaderboard`,
      data: { leaderboard }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity leaderboard' });
  }
});

// Get user rank
router.get('/rank/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userRank = await Leaderboard.findOne({ userId, activityType: 'overall' });
    res.json({
      message: `Get rank for user ${userId}`,
      data: {
        rank: userRank?.rank || 0,
        score: userRank?.score || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
});

export default router;
