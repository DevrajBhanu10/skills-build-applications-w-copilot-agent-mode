import express, { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router: Router = express.Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: `Get activity ${id}`, data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Create new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, distance, duration } = req.body;
    const activity = new Activity({ userId, type, distance, duration });
    await activity.save();
    res.status(201).json({
      message: 'Activity created',
      data: activity
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Activity ${id} updated`, data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.status(204).json({ message: `Activity ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

// Get activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ userId }).populate('userId');
    res.json({ message: `Get activities for user ${userId}`, data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

export default router;
