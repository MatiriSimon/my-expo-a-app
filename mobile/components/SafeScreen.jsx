// Import View component from React Native
import { View, } from 'react-native'

// Import useSafeAreaInsets hook for getting safe area insets
import {useSafeAreaInsets} from 'react-native-safe-area-context'

// Import color constants
import {COLORS} from  "@/constants/colors";

// Define SafeScreen component that wraps children with safe area padding
const SafeScreen = ({children}) => {
  // Get safe area insets (top, bottom, left, right padding needed for notch/bottom bar)
  const insets = useSafeAreaInsets();
  return (
    // View with padding applied for safe area
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: COLORS.background}}>
      // Render children components
      {children}
    </View>
  );
};



// Export SafeScreen component as default export
export default SafeScreen;

