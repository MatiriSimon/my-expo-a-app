// Import useClerk hook for accessing Clerk authentication methods
import { useClerk } from '@clerk/clerk-expo'
// Import Linking module from Expo for opening URLs
import * as Linking from 'expo-linking'
// Import Alert and TouchableOpacity components from React Native
import { Alert, Text, TouchableOpacity } from 'react-native'
// Import Ionicons for displaying icons
import { Ionicons } from "@expo/vector-icons";
// Import home screen styles
import { styles } from "../assets/styles/home.styles";

// Export SignOutButton component
export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  // Handle sign-out with confirmation alert
  const handleSignOut = async () => {
   // Show confirmation alert before signing out
   Alert.alert("Logout", "Are you sure you want to logout?", [
      // Cancel button
      { text: "Cancel", style: "cancel" },
      // Logout button that calls signOut function
      {text: "Logout", style: "destructive", onPress:signOut}
   ])
  }
  // Return sign-out button with logout icon
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      // Logout icon
      <Ionicons name="log-out-outline" size={22} color="COLORS.text" />
    </TouchableOpacity>
  )
}