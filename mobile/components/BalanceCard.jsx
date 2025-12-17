// Import View and Text components from React Native
import { View, Text } from "react-native";
// Import home screen styles
import { styles } from "../assets/styles/home.styles";
// Import color constants
import { COLORS } from "../constants/colors";

// Export BalanceCard component that displays financial summary
export const BalanceCard = ({ summary }) => {
  return (
    // Balance card container
    <View style={styles.balanceCard}>
      // "Total Balance" label
      <Text style={styles.balanceTitle}>Total Balance</Text>
      // Display total balance amount formatted to 2 decimal places
      <Text style={styles.balanceAmount}>${parseFloat(summary.balance).toFixed(2)}</Text>
      // Stats container for income and expenses
      <View style={styles.balanceStats}>
        // Income stats section
        <View style={styles.balanceStatItem}>
          // "Income" label
          <Text style={styles.balanceStatLabel}>Income</Text>
          // Display total income in green color, formatted to 2 decimal places
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${parseFloat(summary.income).toFixed(2)}
          </Text>
        </View>
        // Divider line between income and expenses
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        // Expenses stats section
        <View style={styles.balanceStatItem}>
          // "Expenses" label
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          // Display total expenses in red color, formatted to 2 decimal places (absolute value)
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};