// Import useState hook for state management
import {useState} from 'react'
// Import React Native UI components (Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform)
import { Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
// Import useSignUp hook from Clerk authentication
import { useSignUp } from '@clerk/clerk-expo'
// Import useRouter from expo-router for navigation
import { useRouter } from 'expo-router'
// Import authentication screen styles
import { styles } from '@/assets/styles/auth.styles.js'
// Import Ionicons for displaying icons
import { Ionicons } from '@expo/vector-icons'
// Import color constants
import { COLORS } from '../../constants/colors'
// Import Image component from expo-image for optimized image rendering
import { Image } from 'expo-image'


// Export default sign-up screen component
export default function SignUpScreen() {
  // Get isLoaded, signUp, and setActive from Clerk authentication
  const { isLoaded, signUp, setActive } = useSignUp()
  // Get router for navigation
  const router = useRouter()

  // State for storing email input value
  const [emailAddress, setEmailAddress] = useState('')
  // State for storing password input value
  const [password, setPassword] = useState('')
  // State for tracking if email verification is pending
  const [pendingVerification, setPendingVerification] = useState(false)
  // State for storing verification code input value
  const [code, setCode] = useState('')
  // State for storing error messages
  const [error, setError] = useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    // Return early if authentication is not loaded
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      // Create sign-up session with email and password
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form and capture OTP code
      setPendingVerification(true)
     // Catch errors during sign-up
     } catch (err) {
      // Check if error is that email already exists
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("That email address is already in use. Please try another.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(err);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    // Return early if authentication is not loaded
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // If pending verification, show verification code input screen
  if (pendingVerification) {
    return (
      // Verification container view
      <View style={styles.verificationContainer}>
        // Verification title
        <Text style={styles.verificationTitle}>Verify your email</Text>
        
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
        
        // Verification code input field
        <TextInput
        style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        // Verify button to submit verification code
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      
       </View>
    );
  }

  // Return sign-up form if not pending verification
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
         <Image source={require("../../assets/images/revenue-i2.png")} style={styles.illustration} />
      
        // Display create account title
        <Text style={styles.title}>Create Account</Text>

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
          placeholderTextColor="#9A8478"
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
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

        // Sign up button
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>


        // Footer with link to sign-in page
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          // Link back to sign-in page
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        </View>
    </ScrollView>
</KeyboardAvoidingView>
  )
}


