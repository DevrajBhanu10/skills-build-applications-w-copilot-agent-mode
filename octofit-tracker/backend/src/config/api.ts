/**
 * API Configuration utility for Codespaces and localhost support
 */

const PORT = 8000;

/**
 * Get the API base URL based on the environment
 * - Codespaces: https://${CODESPACE_NAME}-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */
export const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

/**
 * Get MongoDB connection URI
 */
export const getMongoDbUri = (): string => {
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
};

/**
 * Configuration object
 */
export const config = {
  port: PORT,
  apiUrl: getApiUrl(),
  mongoDbUri: getMongoDbUri(),
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isCodespaces: !!process.env.CODESPACE_NAME,
  codespaceName: process.env.CODESPACE_NAME
};

export default config;
