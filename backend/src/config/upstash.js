// Import Redis client from Upstash (serverless Redis service)
import { Redis } from '@upstash/redis';
// Import Ratelimit class from Upstash for rate limiting functionality
import { Ratelimit } from '@upstash/ratelimit';

// Load environment variables from .env file
import 'dotenv/config';

// Create a new rate limit instance with Redis backend
const ratelimit = new Ratelimit({
    // Initialize Redis connection using environment variables (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN)
    redis: Redis.fromEnv(),
    // Configure sliding window: allow 100 requests per 60 seconds
    limiter: Ratelimit.slidingWindow(100, '60 s'),
});


// Export the rate limiter instance as default export
export default ratelimit;