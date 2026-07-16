"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Workout_1 = require("../models/Workout");
const router = express_1.default.Router();
// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('userId');
        res.json({ message: 'Get all workouts', data: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findById(id).populate('userId');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: `Get workout ${id}`, data: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// Create new workout
router.post('/', async (req, res) => {
    try {
        const { userId, name, exercises, duration } = req.body;
        const workout = new Workout_1.Workout({ userId, name, exercises, duration });
        await workout.save();
        res.status(201).json({
            message: 'Workout created',
            data: workout
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// Update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `Workout ${id} updated`, data: workout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// Delete workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Workout_1.Workout.findByIdAndDelete(id);
        res.status(204).json({ message: `Workout ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
// Get personalized workout suggestions
router.get('/suggestions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const suggestions = await Workout_1.Workout.find({ userId }).populate('userId');
        res.json({
            message: `Get workout suggestions for user ${userId}`,
            data: { suggestions }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch suggestions' });
    }
});
exports.default = router;
