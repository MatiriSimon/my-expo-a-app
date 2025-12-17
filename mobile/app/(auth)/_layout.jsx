// Import Redirect and Stack components from expo-router
import { Redirect, Stack } from 'expo-router'
// Import useAuth hook from Clerk for authentication state
import { useAuth } from '@clerk/clerk-expo'

// Export default layout for authentication routes
export default function AuthRoutesLayout() {
  // Get isSignedIn state from Clerk auth
  const { isSignedIn } = useAuth()

  // If user is already signed in, redirect to home page
  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  // Show Stack navigator with hidden header for sign-in/sign-up screens
  return <Stack screenOptions={{ headerShown: false }} />
}