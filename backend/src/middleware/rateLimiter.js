// Import the rate limiter instance configured with Upstash
import ratelimit from "../config/upstash.js";

// Define rate limiter middleware function (async because it calls rate limit check)
const rateLimiter = async (req, res, next) => {
    // Try block to handle rate limit check safely
    try {
        // Call the rate limiter and destructure the success status
        const { success } = await ratelimit.limit(`my-rate-limit`);

        // Check if the rate limit was exceeded (success = false)
        if (!success) {
            // Return 429 Too Many Requests status with error message
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }

        // If within rate limit, call next() to proceed to the next middleware/route handler
        next();
    
    // Catch block to handle any errors during rate limit checking
    } catch (error) {
        // Log the error to console
        console.log("Rate limit error:", error);
        // Pass error to Express error handler
        next(error);
    }
};

// Export the rate limiter middleware as default export
export default rateLimiter;