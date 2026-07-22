/* eslint-disable react-hooks/refs -- RN Animated.Value refs are read during render by design */
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";

const PlaceholderImage = require("../../assets/images/welcome-image.png");

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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
  }, [fadeAnim, scaleAnim]);
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Image
            source={PlaceholderImage}
            style={styles.image}
            contentFit="contain"
          />
        </Animated.View>

        <Text style={styles.title}>
          Manage All Your Insurance Policies at One Place
        </Text>

        <Button
          theme="primary"
          label="Get started"
          onPress={() => router.push("/createAccount/get-started")}
        />
        <Button
          theme="primary"
          label="Log In"
          backgroundColor="#ffffff"
          textColor="#383838"
          onPress={() => router.push("/login/login")}
          style={{
            marginTop: 16,
            boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.08)",
          }}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 311,
    height: 325,
    marginTop: 70,
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 70,
    paddingBottom: 32,
    width: "100%",
    maxWidth: 285,
  },
});
