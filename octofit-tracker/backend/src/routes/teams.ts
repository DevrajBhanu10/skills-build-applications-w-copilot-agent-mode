import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Get all teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams', data: [] });
});

// Get team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get team ${id}`, data: {} });
});

// Create new team
router.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  res.status(201).json({ message: 'Team created', data: { name, description } });
});

// Update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Team ${id} updated`, data: {} });
});

// Delete team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({ message: `Team ${id} deleted` });
});

// Add member to team
router.post('/:id/members', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(201).json({ message: `Member added to team ${id}` });
});

export default router;
