// Import View, Text, and TouchableOpacity components from React Native
import { View, Text, TouchableOpacity } from "react-native";
// Import Ionicons for displaying icons
import { Ionicons } from "@expo/vector-icons";
// Import home screen styles
import { styles } from "../assets/styles/home.styles";
// Import color constants
import { COLORS } from "../constants/colors";
// Import formatDate utility function
import { formatDate } from "../lib/utils";

// Map category names to their corresponding icon names
const CATEGORY_ICONS = {
  // Food icon for food & drinks category
  "Food & Drinks": "fast-food",
  // Shopping cart icon for shopping category
  Shopping: "cart",
  // Car icon for transportation category
  Transportation: "car",
  // Film icon for entertainment category
  Entertainment: "film",
  // Receipt icon for bills category
  Bills: "receipt",
  // Cash icon for income category
  Income: "cash",
  // More options icon for other category
  Other: "ellipsis-horizontal",
};

// Export TransactionItem component that displays a single transaction
export const TransactionItem = ({ item, onDelete }) => {
  // Check if amount is positive (income) or negative (expense)
  const isIncome = parseFloat(item.amount) > 0;
  // Get icon name from CATEGORY_ICONS map, default to pricetag if not found
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

  return (
    // Transaction card container
    <View style={styles.transactionCard} key={item.id}>
      // Touchable transaction content area
      <TouchableOpacity style={styles.transactionContent}>
        // Category icon container with background
        <View style={styles.categoryIconContainer}>
          // Category icon - colored based on income (green) or expense (red)
          <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
        </View>
        // Left side of transaction info
        <View style={styles.transactionLeft}>
          // Transaction title/description
          <Text style={styles.transactionTitle}>{item.title}</Text>
          // Transaction category
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        // Right side of transaction info
        <View style={styles.transactionRight}>
          // Transaction amount with + for income and - for expenses, colored accordingly
          <Text
            style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
          >
            {isIncome ? "+" : "-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          // Transaction date formatted nicely
          <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
      // Delete button
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        // Trash icon for deleting transaction
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};