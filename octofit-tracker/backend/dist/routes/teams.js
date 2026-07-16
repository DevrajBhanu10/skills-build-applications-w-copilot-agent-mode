"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Team_1 = require("../models/Team");
const router = express_1.default.Router();
// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members').populate('leader');
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findById(id).populate('members').populate('leader');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Get team ${id}`, data: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// Create new team
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const team = new Team_1.Team({ name, description });
        await team.save();
        res.status(201).json({ message: 'Team created', data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// Update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `Team ${id} updated`, data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// Delete team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Team_1.Team.findByIdAndDelete(id);
        res.status(204).json({ message: `Team ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
// Add member to team
router.post('/:id/members', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const team = await Team_1.Team.findByIdAndUpdate(id, { $addToSet: { members: userId } }, { new: true });
        res.status(201).json({ message: `Member added to team ${id}`, data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add member' });
    }
});
exports.default = router;
