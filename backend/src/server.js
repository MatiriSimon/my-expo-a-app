// Import Express framework for creating HTTP server
import express from 'express'
// Import dotenv to load environment variables from .env file
import dotenv from 'dotenv';
// Import database initialization function
import {initDB} from "./config/db.js";
// Import rate limiter middleware to prevent abuse
import rateLimiter from './middleware/rateLimiter.js';
// Import cron job for periodic tasks
import job from "./config/cron.js";

// Import transactions API routes
import transactionsRoute from "./routes/transactionsRoute.js";

// Load environment variables from .env file into process.env
dotenv.config();

// Create an Express application instance
const app = express();

// Check if running in production environment and start the cron job if true
if(process.env.NODE_ENV === "production") job.start();


// Add rate limiting middleware to limit API requests
app.use(rateLimiter);
// Middleware to automatically parse incoming JSON request bodies
app.use(express.json());

// Get the port from environment variables or use default port 5001
const PORT = process.env.PORT || 5001;

// Create a health check endpoint that returns 'ok' status
app.get("/api/health", (req, res) => {
  // Send 200 status with JSON response indicating server is healthy
  res.status(200).json({ status: "ok" });
});


// Mount transactions routes at /api/transactions path
app.use("/api/transactions", transactionsRoute);

// Initialize database, then start listening for incoming requests
initDB().then(() => {
    // Start Express server on specified PORT
    app.listen(PORT, () => {
        // Log message confirming server is running
        console.log('Server is up and running on PORT:', PORT);

    });    
});


