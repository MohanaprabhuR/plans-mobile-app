import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <ScreenLayout contentContainerStyle={styles.content}>
        <View style={styles.container}>
          <Link href="/(tabs)" style={styles.button}>
            Go back to Home screen!
          </Link>
        </View>
      </ScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
