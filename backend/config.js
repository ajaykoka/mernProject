const crypto = require('crypto');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const generateSecretKey = () => {
  const secretLength = 64; // Length of the secret key in bytes
  return crypto.randomBytes(secretLength).toString('hex');
};

// Generate the secret key if not already set in the environment
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = generateSecretKey();
}

// Export the JWT secret key from the environment
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET
};
