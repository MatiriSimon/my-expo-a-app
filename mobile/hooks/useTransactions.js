// react custom hook file for managing transaction data

// Import useCallback hook for memoized callback functions
import { useCallback, useState } from "react";
// Import Alert component from React Native for showing alerts
import { Alert } from "react-native";
// Import API base URL
import { API_URL } from "../constants/api";

// Export custom hook for managing transactions
export const useTransactions = (userId) => {
  // State for storing array of transactions
  const [transactions, setTransactions] = useState([]);
  // State for storing financial summary (balance, income, expenses)
  const [summary, setSummary] = useState({
    // Total balance of all transactions
    balance: 0,
    // Total income from positive transactions
    income: 0,
    // Total expenses from negative transactions
    expenses: 0,
  });
  // State for tracking loading state
  const [isLoading, setIsLoading] = useState(true);

  // useCallback is used for performance reasons, it will memoize the function
  // Fetch all transactions for the current user
  const fetchTransactions = useCallback(async () => {
    try {
      // Fetch transactions from API
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      // Parse response as JSON
      const data = await response.json();
      // Update transactions state
      setTransactions(data);
    } catch (error) {
      // Log any errors during fetch
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  // Fetch financial summary for the current user
  const fetchSummary = useCallback(async () => {
    try {
      // Fetch summary from API
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      // Parse response as JSON
      const data = await response.json();
      // Update summary state
      setSummary(data);
    } catch (error) {
      // Log any errors during fetch
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  // Load both transactions and summary data
  const loadData = useCallback(async () => {
    // Return early if no userId is provided
    if (!userId) return;

    // Set loading state to true
    setIsLoading(true);
    try {
      // Run both fetch operations in parallel for better performance
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      // Log any errors during data loading
      console.error("Error loading data:", error);
    } finally {
      // Set loading state to false after fetching completes
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  // Delete a specific transaction by ID
  const deleteTransaction = async (id) => {
    try {
      // Send DELETE request to remove transaction
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      // Check if delete was successful
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      // Show success alert
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      // Log any errors during deletion
      console.error("Error deleting transaction:", error);
      // Show error alert to user
      Alert.alert("Error", error.message);
    }
  };

  // Return hook's public API
  return { transactions, summary, isLoading, loadData, deleteTransaction };
};