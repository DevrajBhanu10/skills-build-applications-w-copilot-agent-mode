"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Activity_1 = require("../models/Activity");
const router = express_1.default.Router();
// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('userId');
        res.json({ message: 'Get all activities', data: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findById(id).populate('userId');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `Get activity ${id}`, data: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// Create new activity
router.post('/', async (req, res) => {
    try {
        const { userId, type, distance, duration } = req.body;
        const activity = new Activity_1.Activity({ userId, type, distance, duration });
        await activity.save();
        res.status(201).json({
            message: 'Activity created',
            data: activity
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
// Update activity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `Activity ${id} updated`, data: activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
// Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Activity_1.Activity.findByIdAndDelete(id);
        res.status(204).json({ message: `Activity ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
// Get activities by user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const activities = await Activity_1.Activity.find({ userId }).populate('userId');
        res.json({ message: `Get activities for user ${userId}`, data: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user activities' });
    }
});
exports.default = router;
