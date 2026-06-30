import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
const successImage = require("../../../assets/images/success.png");

const profileAccount = () => {
  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => router.back()} />
      </View>
      <View style={styles.container}>
        <Image source={successImage} style={styles.successimage} />
        <Text style={styles.title}>Account Created Successfully</Text>
        <Text style={styles.subtitle}>
          Now let’s check your risk profile and see how well you’re protected.
        </Text>
        <Button
          label="Continue"
          theme="primary"
          onPress={() => router.push("/welcome")}
          style={{
            width: 129,
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default profileAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 38,
    letterSpacing: -0.5,
    fontWeight: "700",
    paddingTop: 8,
    paddingBottom: 12,
    textAlign: "center",
  },

  successimage: {
    width: 85,
    height: 85,
  },
  subtitle: {
    color: "#555555",
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: "400",
    width: "100%",
    maxWidth: 285,
    paddingBottom: 16,
    textAlign: "center",
  },
});
