"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./config/api"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default
    .connect(api_1.default.mongoDbUri)
    .then(() => {
    console.log('✅ Connected to MongoDB');
})
    .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});
// Health check route with API URL info
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Backend is running',
        apiUrl: api_1.default.apiUrl,
        environment: api_1.default.environment,
        isCodespaces: api_1.default.isCodespaces
    });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Start Server
app.listen(api_1.default.port, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║        🏋️  OctoFit Tracker Backend Started             ║
╚════════════════════════════════════════════════════════╝

📍 API URL: ${api_1.default.apiUrl}
🌍 Environment: ${api_1.default.environment}
📊 MongoDB: ${api_1.default.mongoDbUri}
${api_1.default.isCodespaces ? `🚀 Codespace: ${api_1.default.codespaceName}` : ''}

Available Endpoints:
  • GET  /api/health           - Server health check
  • GET  /api/users            - Get all users
  • POST /api/users            - Create new user
  • GET  /api/teams            - Get all teams
  • POST /api/teams            - Create new team
  • GET  /api/activities       - Get all activities
  • POST /api/activities       - Log new activity
  • GET  /api/leaderboard      - Get global leaderboard
  • GET  /api/workouts         - Get all workouts
  • POST /api/workouts         - Create new workout

📚 API Documentation: ${api_1.default.apiUrl}/api/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
