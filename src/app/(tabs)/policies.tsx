import { StyleSheet, Text } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";

export default function PolicyScreen() {
  return (
    <ScreenLayout contentContainerStyle={styles.container} edges={TAB_SCREEN_EDGES}>
      <Text style={styles.title}>Policy</Text>
      <Text style={styles.subtitle}>Your policy details will appear here.</Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F3",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#383838",
  },
  subtitle: {
    fontSize: 14,
    color: "#757575",
    marginTop: 8,
  },
});
