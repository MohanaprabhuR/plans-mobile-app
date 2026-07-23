import "../../global.css";

import AnimatedSplash from "@/components/AnimatedSplash";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaProvider } from "@/lib/safe-area";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "index",
};

// Keep the native splash visible until the animated splash takes over.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#F8F7F3" }}>
          <Stack screenOptions={{ headerShown: false }} />
          {!splashDone ? (
            <AnimatedSplash onFinish={() => setSplashDone(true)} />
          ) : null}
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
