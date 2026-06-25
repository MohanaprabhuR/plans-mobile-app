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
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
