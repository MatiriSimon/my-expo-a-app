// Import useUser hook from Clerk for user authentication state
import {useUser} from '@clerk/clerk-expo';
// Import Redirect component from expo-router for navigation
import {Redirect} from 'expo-router';
// Import Stack navigator from expo-router
import {Stack} from 'expo-router/stack';

// Export default root app layout component
export default function Layout() {
    // Get isSignedIn and isLoaded state from Clerk user
    const {isSignedIn, isLoaded} = useUser();

    // If authentication is still loading, return null to show nothing
    if (!isLoaded) {
        return null; //  This is for a better user experience while loading
    }
    // If user is not signed in, redirect to sign-in page
    if (!isSignedIn) { return <Redirect
         href="/sign-in"/>;
    }
    // If user is signed in, show Stack navigator with hidden header
    return <Stack screenOptions={{headerShown: false}}/>;
}