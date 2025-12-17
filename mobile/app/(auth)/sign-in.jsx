// Import useSignIn hook from Clerk authentication
import { useSignIn } from '@clerk/clerk-expo'
// Import Link and useRouter from expo-router for navigation
import { Link, useRouter } from 'expo-router'
// Import React Native UI components (Text, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform)
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
// Import useState hook for state management
import { useState } from 'react'
// Import authentication screen styles
import { styles } from '@/assets/styles/auth.styles.js'
// Import Ionicons for displaying icons
import { Ionicons } from '@expo/vector-icons'
// Import color constants
import { COLORS } from '../../constants/colors'


// Export default sign-in page component
export default function Page() {
  // Get signIn, setActive, and isLoaded from Clerk authentication
  const { signIn, setActive, isLoaded } = useSignIn()
  // Get router for navigation
  const router = useRouter()

  // State for storing email input value
  const [emailAddress, setEmailAddress] = useState('')
  // State for storing password input value
  const [password, setPassword] = useState('')
  // State for storing error messages
  const [error, setError] = useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    // Return early if authentication is not loaded
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      // Create sign-in session with email and password
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active and redirect the user
      if (signInAttempt.status === 'complete') {
        // Set the session as active
        await setActive({ session: signInAttempt.createdSessionId })
        // Navigate to home page
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
     // Catch errors during sign-in
     } catch (err) {
      // Check if error is incorrect password
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Password is incorrect. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    // Keyboard avoiding view to keep inputs visible when keyboard appears
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
       
    >
      // ScrollView for scrollable content
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

        // Main container view
        <View style={styles.container}>
        // Display illustration image
        <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration} />
        // Display welcome title
        <Text style={styles.title}>Welcome Back</Text>

        // Conditionally render error message box if error exists
        {error ? (
          <View style={styles.errorBox}>
            // Display error icon
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            // Display error message
            <Text style={styles.errorText}>{error}</Text>
            // Close button to dismiss error
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
        

        // Email input field
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      // Password input field
      <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
       // Sign in button
       <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>


      // Footer with link to sign-up page
      <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>

          // Link to sign-up page
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}