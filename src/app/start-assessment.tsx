import Button from "@/components/Button";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
const riskFactorImage = require("../../assets/images/risk-factors.png");
const timeIcon = require("../../assets/images/icon-time.png");
export default function StartAssessment() {
  return (
    <ScreenLayout contentContainerStyle={styles.screen}>
      <Image
        source={riskFactorImage}
        style={{ width: 295, height: 295, marginTop: 80, marginBottom: 40 }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Let's Build Your Risk Profile</Text>
        <Text style={styles.subtitle}>
          Answer a few quick questions. We'll show where you may be at risk.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Continue"
          theme="primary"
          onPress={() => {
            router.push("/questionnaire");
          }}
        />
        <View style={styles.footerInfo}>
          <Image source={timeIcon} style={{ width: 24, height: 24 }} />
          <Text style={styles.footerText}>Takes less than 2 minutes</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
    maxWidth: 255,
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "600",
    width: "100%",
    textTransform: "capitalize",
    paddingBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    color: "#383838",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    width: "100%",
  },
  footerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingTop: 16,
  },
  footerText: {
    color: "#757575",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
  },
});
