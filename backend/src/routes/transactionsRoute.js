// Import Express framework
import express from 'express';

// Import all transaction controller functions
import { 
    // Function to create a new transaction
    createTransaction,
    // Function to delete a transaction
    deleteTransaction,
    // Function to get financial summary for a user
    getSummaryByUserId,
    // Function to get all transactions for a user
    getTransactionsByUserId,
    
} from '../controllers/transactionsController.js';


// Create a new Express router instance
const router = express.Router();

// GET route to fetch all transactions for a specific user
router.get("/:user_id", getTransactionsByUserId);


// POST route to create a new transaction
router.post("/", createTransaction);


// DELETE route to delete a transaction by ID
router.delete("/:id", deleteTransaction);

// GET route to fetch financial summary (balance, income, expenses) for a user
router.get("/summary/:user_id", getSummaryByUserId);


// Export the router as default export
export default router;


