"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Leaderboard_1 = require("../models/Leaderboard");
const router = express_1.default.Router();
// Get global leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ activityType: 'overall' })
            .populate('userId')
            .sort({ score: -1 })
            .limit(100);
        res.json({
            message: 'Get global leaderboard',
            data: {
                leaderboard
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// Get team leaderboard
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard_1.Leaderboard.find({ teamId, activityType: 'overall' })
            .populate('userId')
            .sort({ score: -1 });
        res.json({
            message: `Get leaderboard for team ${teamId}`,
            data: { leaderboard }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// Get leaderboard by activity type
router.get('/type/:activityType', async (req, res) => {
    try {
        const { activityType } = req.params;
        const leaderboard = await Leaderboard_1.Leaderboard.find({ activityType: activityType })
            .populate('userId')
            .sort({ score: -1 })
            .limit(100);
        res.json({
            message: `Get ${activityType} leaderboard`,
            data: { leaderboard }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity leaderboard' });
    }
});
// Get user rank
router.get('/rank/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userRank = await Leaderboard_1.Leaderboard.findOne({ userId, activityType: 'overall' });
        res.json({
            message: `Get rank for user ${userId}`,
            data: {
                rank: userRank?.rank || 0,
                score: userRank?.score || 0
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user rank' });
    }
});
exports.default = router;
