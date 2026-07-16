import express, { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router: Router = express.Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('userId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Get workout ${id}`, data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, exercises, duration } = req.body;
    const workout = new Workout({ userId, name, exercises, duration });
    await workout.save();
    res.status(201).json({
      message: 'Workout created',
      data: workout
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Workout ${id} updated`, data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.status(204).json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// Get personalized workout suggestions
router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const suggestions = await Workout.find({ userId }).populate('userId');
    res.json({
      message: `Get workout suggestions for user ${userId}`,
      data: { suggestions }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

export default router;
