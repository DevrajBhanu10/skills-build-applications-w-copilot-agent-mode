"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Codespaces-aware API URL support
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const API_URL = getApiUrl();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Backend is running',
        apiUrl: API_URL,
        environment: process.env.NODE_ENV || 'development'
    });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${API_URL}`);
    console.log(`MongoDB connected to: ${MONGODB_URI}`);
});
