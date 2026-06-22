import { StyleSheet, Text, View } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";

export default function AboutScreen() {
  return (
    <ScreenLayout contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <Text style={styles.text}>About screen</Text>
      </View>
    </ScreenLayout>
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
  text: {
    color: "#fff",
  },
});
