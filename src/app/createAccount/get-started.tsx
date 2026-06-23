import { router } from "expo-router";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Button from "@/components/Button";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import ScreenLayout from "@/components/ScreenLayout";
import { useEffect, useRef, useState } from "react";
const PlaceholderImage = require("../../../assets/images/plans-logo.png");

export default function GetStarted() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [email, setEmail] = useState("");
  const isFilled = email.length > 0;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <LeftArrowIcon color="#383838" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Image source={PlaceholderImage} style={styles.image} />
        </Animated.View>
        <Text style={styles.title}>Let’s Get Started</Text>
        <Text style={styles.label}>Enter Your Email or Mobile Number</Text>
        <TextInput
          autoFocus
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="done"
          placeholder="Enter Your Email or Mobile Number"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, isFilled && styles.activeInput]}
        />
        <Button
          label="Continue"
          theme="primary"
          disabled={!isFilled}
          style={{ marginTop: 20 }}
          onPress={() => router.push("/createAccount/new-account")}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    padding: 16,
  },
  backButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 44,
    height: 44,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.08)",
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    fontWeight: "700",
    paddingTop: 16,
    paddingBottom: 32,
    width: "100%",
    maxWidth: 285,
  },
  label: {
    fontSize: 15,
    color: "#383838",
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: "600",
    paddingBottom: 8,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    borderRadius: 16,
    color: "#383838",
    fontSize: 15,
    fontWeight: "400",
  },
  activeInput: {
    borderColor: "#FF5E00",
  },
});
