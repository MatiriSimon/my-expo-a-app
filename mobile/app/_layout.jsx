// Import Slot component from expo-router for rendering child routes
import { Slot } from "expo-router";
// Import custom SafeScreen component for safe area handling
import SafeScreen from "@/components/SafeScreen";
// Import ClerkProvider for authentication setup
import { ClerkProvider } from "@clerk/clerk-expo";
// Import tokenCache for storing authentication tokens securely
import { tokenCache } from '@clerk/clerk-expo/token-cache';
// Import StatusBar component for controlling system status bar appearance
import { StatusBar } from "expo-status-bar";

// Export default root layout component
export default function RootLayout() {
  return (
      // Wrap entire app with ClerkProvider for authentication
      <ClerkProvider tokenCache={tokenCache}>
        // Wrap with SafeScreen to handle safe area insets
        <SafeScreen>
          // Render child route components
          <Slot />
        </SafeScreen>
        // Set status bar style to dark color
        <StatusBar style="dark" />
      </ClerkProvider>
    );
}
