// Import View and ActivityIndicator components from React Native
import { View, ActivityIndicator } from "react-native";
// Import home screen styles
import { styles } from "../assets/styles/home.styles";
// Import color constants
import { COLORS } from "../constants/colors";

// Define PageLoader component for displaying loading spinner
const PageLoader = () => {
  return (
    // Loading container view centered on screen
    <View style={styles.loadingContainer}>
      // Large activity indicator (spinner) with primary color
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
// Export component as default export
export default PageLoader;