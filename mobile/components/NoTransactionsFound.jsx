// Import Ionicons for displaying icons
import { Ionicons } from "@expo/vector-icons";
// Import Text, TouchableOpacity, and View components from React Native
import { Text, TouchableOpacity, View } from "react-native";
// Import home screen styles
import { styles } from "../assets/styles/home.styles";
// Import color constants
import { COLORS } from "../constants/colors";
// Import useRouter from expo-router for navigation
import { useRouter } from "expo-router";

// Define NoTransactionsFound component for empty state
const NoTransactionsFound = () => {
  // Get router for navigation
  const router = useRouter();

  return (
    // Empty state container
    <View style={styles.emptyState}>
      // Empty state icon (receipt outline)
      <Ionicons
        name="receipt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      // Empty state title
      <Text style={styles.emptyStateTitle}>No transactions yet</Text>
      // Empty state description text
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction
      </Text>
      // Button to navigate to create transaction page
      <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
        // Plus circle icon
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        // "Add Transaction" button text
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};
// Export component as default export
export default NoTransactionsFound;