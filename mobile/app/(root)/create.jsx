// Import React Native UI components (View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator)
import { View, Text, Alert,
TouchableOpacity,
TextInput,

ActivityIndicator

 } from 'react-native'
// Import useRouter from expo-router for navigation
import { useRouter } from 'expo-router';
// Import useUser hook from Clerk for current user information
import { useUser } from '@clerk/clerk-expo';
// Import useState hook for state management
import { useState } from 'react';
// Import API base URL
import { API_URL } from "@/constants/api";
// Import create screen styles
import { styles } from "@/assets/styles/create.styles";
// Import Ionicons for displaying icons
import { Ionicons } from '@expo/vector-icons';
// Import color constants
import { COLORS } from "@/constants/colors";

// Array of transaction categories with associated icons
const CATEGORIES = [
  // Food & drinks category
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  // Shopping category
  { id: "shopping", name: "Shopping", icon: "cart" },
  // Transportation category
  { id: "transportation", name: "Transportation", icon: "car" },
  // Entertainment category
  { id: "entertainment", name: "Entertainment", icon: "film" },
  // Bills category
  { id: "bills", name: "Bills", icon: "receipt" },
  // Income category
  { id: "income", name: "Income", icon: "cash" },
  // Other category
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

// Define CreateScreen component for adding new transactions
const CreateScreen = () => {
    // Get router for navigation
    const router = useRouter();
    // Get current user from Clerk
    const {user} = useUser()

    // State for transaction title/description
    const [title, setTitle] = useState("");
    // State for transaction amount
    const [amount, setAmount] = useState("");
    // State for selected category
    const [selectedCategory, setSelectedCategory] = useState("");
    // State for transaction type (true = expense, false = income)
    const [isExpense, setIsExpense] = useState(true);
    // State for tracking if transaction is being created
    const [isLoading, setIsLoading] = useState(false);

    // Handle creating a new transaction
    const handleCreate = async () => {
      // Validation: check if title is not empty
      if (!title.trim()) return Alert.alert("Error", "Please enter a transaction title");
      // Validation: check if amount is valid and positive
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        Alert.alert("Error", "Please enter a valid amount");
        return;
      }
      // Validation: check if category is selected
      if (!selectedCategory) {
        Alert.alert("Error", "Please select a category");
      }
      // Set loading state to true
      setIsLoading(true);
      try {
          // Format the amount (negative for expenses, positive for income)
          const formatedAmount = isExpense ? -Math.abs(parseFloat(amount))
           : Math.abs(parseFloat(amount));

          // Make POST request to create transaction
          const response = await fetch(`${API_URL}/transactions`, {
            // Use POST method
            method: "POST",
            // Set content type header
            headers: {
              "Content-Type": "application/json",
            },
            // Send transaction data as JSON
            body: JSON.stringify({
              // Current user's ID
              user_id: user.id, 
              // Transaction title
              title,
              // Formatted amount
              amount: formatedAmount,
              // Selected category
              category: selectedCategory,
             
            }),
          });

          // Check if response was successful
          if(!response.ok) {
            // Parse error response
            const errorData = await response.json();
            // Throw error with message
            throw new Error(errorData.error || "Failed to create transaction");
          }

          // Show success message
          Alert.alert("Success", "Transaction created successfully");
          // Navigate back to previous screen
          router.back();
        
        
      
      } catch (error) {
        // Show error message
        Alert.alert("Error", error.message || "Failed to create transaction");  
        // Log error for debugging
        console.error("Error creating transaction:", error);
        
      } finally {
        // Set loading state to false
        setIsLoading(false);
      }
    };

    return (
      // Main container view
      <View style={styles.container}>
        // HEADER SECTION
        <View style={styles.header}>
          // Back button
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            // Back arrow icon
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          // Header title
          <Text style={styles.headerTitle}>New Transaction</Text>
          // Save button
          <TouchableOpacity
            style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
            onPress={handleCreate}
            disabled={isLoading}
          >
            // Save button text (changes to "Saving..." when loading)
            <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
            // Show checkmark icon if not loading
            {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
          </TouchableOpacity>
        </View>

        // Transaction form card
        <View style={styles.card}>
          // Type selector (Expense/Income toggle)
          <View style={styles.typeSelector}>
              // EXPENSE SELECTOR BUTTON
              <TouchableOpacity
                style={[styles.typeButton, isExpense && styles.typeButtonActive]}
                onPress={() => setIsExpense(true)}
              >
                // Down arrow icon for expense
                <Ionicons
                  name="arrow-down-circle"
                  size={22}
                  color={isExpense ? COLORS.white : COLORS.expense}
                  style={styles.typeIcon}
                />
                // "Expense" text
                <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
                  Expense
                </Text>
              </TouchableOpacity>

              // INCOME SELECTOR BUTTON
              <TouchableOpacity
                style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
                onPress={() => setIsExpense(false)}
              >
                // Up arrow icon for income
                <Ionicons
                  name="arrow-up-circle"
                  size={22}
                  color={!isExpense ? COLORS.white : COLORS.income}
                  style={styles.typeIcon}
                />
                // "Income" text
                <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
                  Income
                </Text>
              </TouchableOpacity>
            </View>

           // AMOUNT INPUT CONTAINER
            <View style={styles.amountContainer}>
              // Currency symbol ($)
              <Text style={styles.currencySymbol}>$</Text>
              // Amount input field
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textLight}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>

            // TRANSACTION TITLE INPUT CONTAINER
            <View style={styles.inputContainer}>
              // Create/edit icon
              <Ionicons
                name="create-outline"
                size={22}
                color={COLORS.textLight}
                style={styles.inputIcon}
              />
              // Title input field
              <TextInput
                style={styles.input}
                placeholder="Transaction Title"
                placeholderTextColor={COLORS.textLight}
                value={title}
                onChangeText={setTitle}
              />
            </View>

           // CATEGORY SELECTION SECTION
            <Text style={styles.sectionTitle}>
              // Price tag icon
              <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
            </Text>

            // Category grid container
            <View style={styles.categoryGrid}>
              // Loop through each category and render a button
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    // Highlight selected category
                    selectedCategory === category.name && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  // Category icon
                  <Iconics
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                    style={styles.categoryIcon}
                  />
                  // Category name text
                  <Text
                    style={[
                      styles.categoryButtonText,
                      // Highlight selected category text
                      selectedCategory === category.name && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}

            </View>

          </View>
          
          // Show loading spinner overlay when creating transaction
          {isLoading && (
            <View style={styles.loadingContainer}>
              // Loading spinner
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          )}
        </View>
      );
    };

// Export CreateScreen component as default
export default CreateScreen;