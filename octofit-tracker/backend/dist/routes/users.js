"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.json({ message: 'Get all users', data: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: `Get user ${id}`, data: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// Create new user
router.post('/', async (req, res) => {
    try {
        const { email, name } = req.body;
        const user = new User_1.User({ email, name });
        await user.save();
        res.status(201).json({ message: 'User created', data: user });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// Update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `User ${id} updated`, data: user });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User_1.User.findByIdAndDelete(id);
        res.status(204).json({ message: `User ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
