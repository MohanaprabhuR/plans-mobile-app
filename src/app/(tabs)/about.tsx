import { StyleSheet, Text, View } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";

export default function AboutScreen() {
  return (
    <ScreenLayout
      contentContainerStyle={styles.content}
      edges={TAB_SCREEN_EDGES}
    >
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
