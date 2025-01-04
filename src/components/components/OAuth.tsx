
import { Alert, Image, Text, View, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import CustomButton from "./CustomButton";

const OAuth = () => {
  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await googleOAuth(startOAuthFlow);

  //     if (result.code === "session_exists") {
  //       Alert.alert("Success", "Session exists. Redirecting to home screen.");
  //       router.replace("/(root)/(tabs)/home");
  //       return; // Exit early after redirect
  //     }

  //     Alert.alert(result.success ? "Success" : "Error", result.message);
  //   } catch (error) {
  //     Alert.alert("Error", "An unexpected error occurred. Please try again.");
  //     console.error(error); // Log the error for debugging
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.separator} />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={styles.icon}
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        // onPress={handleGoogleSignIn}
        accessible={true}
        accessibilityLabel="Log in with Google"
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0', // Update to your general color
  },
  orText: {
    fontSize: 18,
    color: '#333', // Adjust text color if needed
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
});

export default OAuth;
