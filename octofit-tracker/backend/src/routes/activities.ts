import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Get all activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities', data: [] });
});

// Get activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get activity ${id}`, data: {} });
});

// Create new activity
router.post('/', (req: Request, res: Response) => {
  const { userId, type, distance, duration } = req.body;
  res.status(201).json({
    message: 'Activity created',
    data: { userId, type, distance, duration }
  });
});

// Update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Activity ${id} updated`, data: {} });
});

// Delete activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({ message: `Activity ${id} deleted` });
});

// Get activities by user
router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({ message: `Get activities for user ${userId}`, data: [] });
});

export default router;
