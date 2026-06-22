import { StyleSheet, Text, View } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";

export default function PoliciesScreen() {
  return (
    <ScreenLayout contentContainerStyle={styles.container}>
      <Text style={styles.title}>Policies</Text>
      <Text style={styles.subtitle}>Your policies will appear here.</Text>
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
