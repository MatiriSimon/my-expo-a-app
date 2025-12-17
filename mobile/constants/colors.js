// constants/colors.js - Color palette definitions for different themes

// Coffee-themed color palette (warm browns and tans)
const coffeeTheme = {
  // Primary brand color
  primary: "#8B593E",
  // Background color for screens
  background: "#FFF8F3",
  // Main text color
  text: "#4A3428",
  // Border color for UI elements
  border: "#E5D3B7",
  // White color for contrasting elements
  white: "#FFFFFF",
  // Lighter text color for secondary text
  textLight: "#9A8478",
  // Color for expense/negative amounts
  expense: "#E74C3C",
  // Color for income/positive amounts
  income: "#2ECC71",
  // Card/surface background color
  card: "#FFFFFF",
  // Shadow color for elevation effects
  shadow: "#000000",
};

// Forest-themed color palette (green tones)
const forestTheme = {
  // Primary brand color
  primary: "#2E7D32",
  // Background color for screens
  background: "#E8F5E9",
  // Main text color
  text: "#1B5E20",
  // Border color for UI elements
  border: "#C8E6C9",
  // White color for contrasting elements
  white: "#FFFFFF",
  // Lighter text color for secondary text
  textLight: "#66BB6A",
  // Color for expense/negative amounts
  expense: "#C62828",
  // Color for income/positive amounts
  income: "#388E3C",
  // Card/surface background color
  card: "#FFFFFF",
  // Shadow color for elevation effects
  shadow: "#000000",
};

// Purple-themed color palette (purple and violet tones)
const purpleTheme = {
  // Primary brand color
  primary: "#6A1B9A",
  // Background color for screens
  background: "#F3E5F5",
  // Main text color
  text: "#4A148C",
  // Border color for UI elements
  border: "#D1C4E9",
  // White color for contrasting elements
  white: "#FFFFFF",
  // Lighter text color for secondary text
  textLight: "#BA68C8",
  // Color for expense/negative amounts
  expense: "#D32F2F",
  // Color for income/positive amounts
  income: "#388E3C",
  // Card/surface background color
  card: "#FFFFFF",
  // Shadow color for elevation effects
  shadow: "#000000",
};

// Ocean-themed color palette (blue and teal tones)
const oceanTheme = {
  // Primary brand color
  primary: "#0277BD",
  // Background color for screens
  background: "#E1F5FE",
  // Main text color
  text: "#01579B",
  // Border color for UI elements
  border: "#B3E5FC",
  // White color for contrasting elements
  white: "#FFFFFF",
  // Lighter text color for secondary text
  textLight: "#4FC3F7",
  // Color for expense/negative amounts
  expense: "#EF5350",
  // Color for income/positive amounts
  income: "#26A69A",
  // Card/surface background color
  card: "#FFFFFF",
  // Shadow color for elevation effects
  shadow: "#000000",
};

// Export all available themes as THEMES object
export const THEMES = {
  // Coffee theme key
  coffee: coffeeTheme,
  // Forest theme key
  forest: forestTheme,
  // Purple theme key
  purple: purpleTheme,
  // Ocean theme key
  ocean: oceanTheme,
};

// 👇 change this to switch theme
// Export currently active colors (coffee theme is selected)
export const COLORS = THEMES.coffee;