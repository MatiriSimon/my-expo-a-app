// Import Clerk authentication hooks and components
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
// Import Link and useRouter from expo-router for navigation
import { Link, useRouter } from 'expo-router'
// Import React Native UI components (Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View)
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
// Import sign-out button component
import { SignOutButton } from '@/components/SignOutButton'
// Import custom hook for fetching transactions
import { useTransactions } from "../../hooks/useTransactions";
// Import useEffect and useState hooks for lifecycle and state management
import { useEffect, useState } from "react";
// Import page loader component
import PageLoader from '../../components/PageLoader';
// Import home screen styles
import { styles } from "../../assets/styles/home.styles";
// Import Ionicons for displaying icons
import { Ionicons } from "@expo/vector-icons";
// Import balance card component for displaying financial summary
import { BalanceCard } from "../../components/BalanceCard";
// Import transaction item component for displaying individual transactions
import { TransactionItem } from "../../components/TransactionItem";
// Import component displayed when no transactions exist
import NoTransactionsFound from "../../components/NoTransactionsFound";

// Export default home page component
export default function Page() {
  // Get current user from Clerk authentication
  const { user } = useUser();
  // Get router for navigation
  const router = useRouter();

  // State for tracking if pull-to-refresh is active
  const [refreshing, setRefreshing] = useState(false);
  // Get transactions, summary, loading state, and data loading function from custom hook
  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user.id);

  // Handler for pull-to-refresh
  const onRefresh = async () => {
      // Set refreshing state to true
      setRefreshing(true);
      // Reload transaction data
      await loadData();
      // Set refreshing state to false
      setRefreshing(false);
  }

  // Load transaction data when component mounts
  useEffect(() => {
        // Load data on component mount
        loadData();
    }, [loadData]);

  // Handle transaction deletion with confirmation alert
  const handleDelete = (id) => {
    // Show confirmation alert
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      // Cancel button
      { text: "Cancel", style: "cancel" },
      // Delete button that calls deleteTransaction function
      { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) },
    ]);
  };

  // Show loading spinner if data is loading and not refreshing
  if (isLoading && !refreshing) return <PageLoader />  


  return (
    // Main container view
    <View style={styles.container}>
    // Content wrapper view
    <View style={styles.content} >
      // HEADER SECTION
      <View style={styles.header}>
        // LEFT SIDE OF HEADER
        <View style={styles.headerLeft}>
          // Display logo image
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.headerLogo}
            resizeMorde="contain"
          />
          // Welcome text container
          <View style={styles.welcomeContainer}>
              // "Welcome," text
              <Text style={styles.welcomeText}>Welcome,</Text>
              // Display username (email before @)
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
         
         </View>
        // RIGHT SIDE OF HEADER
        <View style={styles.headerRight}>
            // Add transaction button
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              // Plus icon
              <Ionicons name="add" size={20} color="#FFF" />
              // "Add" text
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            // Sign out button
            <SignOutButton />
          </View>
        </View>

        // Display balance card with financial summary
        <BalanceCard summary={summary} /> 

        // Transactions header container
        <View style={styles.transactionsHeaderContainer}>
          // Section title for recent transactions
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

        </View>
        </View>


      // FlatList is a performant way to render long lists in React Native.
      // it renders items lazily — only those on the screen.
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        // Data array of transactions to display
        data={transactions}
        // Render each transaction using TransactionItem component
        renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
        // Component to display when list is empty
        ListEmptyComponent={<NoTransactionsFound />}
        // Hide vertical scroll indicator
        showsVerticalScrollIndicator={false}
        // Enable pull-to-refresh functionality
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      </View>
  );
}



