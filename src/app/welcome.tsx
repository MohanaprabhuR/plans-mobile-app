import Button from "@/components/Button";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
const chartImage = require("../../assets/images/chart.png");

export default function WelcomeScreen() {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>Welcome Herman!</Text>
          <Text style={styles.title}>
            Let’s quickly check how protected you are
          </Text>
          <Text style={styles.subtitle}>
            Unexpected events can affect your health, family, and assets.
          </Text>
          <Button
            label="Check Your Risk"
            onPress={() => router.push("/risk-screen")}
            style={styles.button}
          ></Button>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={chartImage}
            style={styles.chartimage}
            resizeMode="cover"
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    position: "relative",
  },
  content: {
    paddingHorizontal: 16,
    maxWidth: 350,
  },
  name: {
    color: "#FF5E00",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
    paddingBottom: 8,
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.5,
    fontWeight: "700",
    width: "100%",
    textTransform: "capitalize",
    paddingBottom: 12,
  },
  subtitle: {
    color: "#383838",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    paddingBottom: 16,
  },
  button: {
    width: 169,
    marginBottom: 98,
  },
  imageContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
  },

  chartimage: {
    width: "100%",
    height: 310,
  },
});
