// Import the neon function from Neon serverless database library
import {neon} from '@neondatabase/serverless'
// Load environment variables from .env file
import "dotenv/config";

// Create and export a SQL query function using the DATABASE_URL environment variable
export const sql = neon(process.env.DATABASE_URL);

// Define async function to initialize the database and create tables
export async function initDB(){
    // Try block to handle potential database errors
    try{
        // Execute SQL query to create transactions table if it doesn't already exist
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            // Auto-incrementing primary key for unique identification
            id SERIAL PRIMARY KEY,
            // User ID field to associate transactions with specific users
            user_id VARCHAR(255) NOT NULL,
            // Transaction title/description (up to 255 characters)
            title VARCHAR(255) NOT NULL,
            // Transaction amount with 2 decimal places for currency
            amount DECIMAL(10, 2) NOT NULL,
            // Category of transaction (e.g., food, shopping, etc.)
            category VARCHAR(255) NOT NULL,
            // Date when transaction was created (defaults to current date)
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        // Log success message when table is created
        console.log("Table created successfully");
    // Catch block to handle any database errors
    }catch(error){
        // Log error message with details
        console.error("Error initializing DB:", error);
        // Exit process with status code 1 (failure), 0 means success
        process.exit(1);

    }
};