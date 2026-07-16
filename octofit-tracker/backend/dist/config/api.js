"use strict";
/**
 * API Configuration utility for Codespaces and localhost support
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.getMongoDbUri = exports.getApiUrl = void 0;
const PORT = 8000;
/**
 * Get the API base URL based on the environment
 * - Codespaces: https://${CODESPACE_NAME}-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
exports.getApiUrl = getApiUrl;
/**
 * Get MongoDB connection URI
 */
const getMongoDbUri = () => {
    return process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
};
exports.getMongoDbUri = getMongoDbUri;
/**
 * Configuration object
 */
exports.config = {
    port: PORT,
    apiUrl: (0, exports.getApiUrl)(),
    mongoDbUri: (0, exports.getMongoDbUri)(),
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isCodespaces: !!process.env.CODESPACE_NAME,
    codespaceName: process.env.CODESPACE_NAME
};
exports.default = exports.config;
