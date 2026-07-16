import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users', data: [] });
});

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get user ${id}`, data: {} });
});

// Create new user
router.post('/', (req: Request, res: Response) => {
  const { email, name } = req.body;
  res.status(201).json({ message: 'User created', data: { email, name } });
});

// Update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id} updated`, data: {} });
});

// Delete user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({ message: `User ${id} deleted` });
});

export default router;
