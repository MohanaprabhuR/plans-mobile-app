import "../../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#F8F7F3" }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="get-started" />
          <Stack.Screen name="login" />
          <Stack.Screen name="verify-otp" />
          <Stack.Screen name="new-account" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="risk-screen" />
          <Stack.Screen name="risk-category" />
          <Stack.Screen name="reset-password" />
          <Stack.Screen name="star-assessment" />
          <Stack.Screen name="risk-loading-screen" />
          <Stack.Screen name="questionnaire" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
