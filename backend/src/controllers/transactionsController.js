// Import the SQL query function from database configuration
import { sql } from '../config/db.js';

// Export async function to fetch all transactions for a specific user
export async function getTransactionsByUserId(req, res) {
    // Try block to handle potential database errors
    try {
        // Extract user_id from URL parameters (e.g., /api/transactions/user123)
        const { user_id } = req.params;
        // Query database to get all transactions for this user, ordered by date (newest first)
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${user_id} order by created_at DESC`;
    
        // Send 200 status with transactions array as JSON response
        res.status(200).json(transactions);
    // Catch block to handle any database or query errors
    } catch (error) {
        // Log error details to console for debugging
        console.log("Error getting the transactions:", error);
        // Send 500 Internal Server Error status with error message
        res.status(500).json({ message: "Internal Server Error" });

    }
};


// Export async function to create a new transaction
export async function createTransaction(req, res) {

    // Try block to safely handle transaction creation
    try {
        // Destructure transaction data from request body
        const { title, amount, category, user_id } = req.body;

        // Validate that all required fields are provided
        if(!title || !user_id || !category || amount===undefined){
            // Send 400 Bad Request status if any field is missing
            return res.status(400).json({ message: "All fields are required" });
        }

        // Insert new transaction into database and return the created record
        const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
            `
        // Log the created transaction to console
        console.log(transaction)
        // Send 201 Created status with the newly created transaction as JSON response
        res.status(201).json(transaction[0])

    // Catch block to handle any errors during transaction creation
    } catch (error) {
        // Log error details to console for debugging
        console.log("Error creating the transactions:", error);
        // Send 500 Internal Server Error status with error message
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Export async function to delete a transaction
export async function deleteTransaction(req, res)  {

    // Try block to safely handle transaction deletion
    try {
        // Extract transaction ID from URL parameters
        const { id } = req.params;

        // Validate that ID is a valid number
        if(isNaN(parseInt(id))){
            // Send 400 Bad Request status if ID is not a valid number
            return res.status(400).json({ message: "Invalid transaction ID" });
        }

        // Delete the transaction from database and return the deleted record
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

        // Check if a transaction was found and deleted
        if (result.length === 0) {
            // Send 404 Not Found status if no transaction with this ID exists
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Send 200 OK status with success message and deleted transaction
        res.status(200).json({ message: "Transaction deleted successfully", transaction: result[0] });
    // Catch block to handle any errors during deletion
    } catch (error) {
        // Log error details to console for debugging
        console.log("Error deleting the transaction:", error);
        // Send 500 Internal Server Error status with error message
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Export async function to get financial summary (balance, income, expenses) for a user
export async function getSummaryByUserId(req, res) {
    // Try block to safely handle summary calculation
    try {
        // Extract user_id from URL parameters
        const { user_id } = req.params;
        // Query database to calculate total balance (sum of all transactions)
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${user_id}
        `

        // Query database to calculate total income (sum of positive amounts only)
        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${user_id} AND amount > 0
        `

        // Query database to calculate total expenses (sum of negative amounts only)
        const expensesResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${user_id} AND amount < 0
        `

        // Send 200 OK status with balance, income, and expenses summary
        res.status(200).json({
            // Total balance (all transactions combined)
            balance: balanceResult[0].balance,
            // Total income (all positive transactions)
            income: incomeResult[0].income,
            // Total expenses (all negative transactions)
            expenses: expensesResult[0].expenses
        });


    // Catch block to handle any errors during summary calculation
    }catch(error) {
        // Log error details to console for debugging
        console.log("Error getting the transaction summary:", error);
        // Send 500 Internal Server Error status with error message
        res.status(500).json({ message: "Internal Server Error" });
    }
};