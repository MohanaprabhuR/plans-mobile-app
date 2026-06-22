import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function RiskLoadingScreen() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();

    const timer = setTimeout(() => {
      router.replace("/start-assement");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScreenLayout contentContainerStyle={styles.screen}>
      <Text style={styles.heading}>Just a Moment...</Text>

      <Animated.View style={[styles.spinnerWrap, { transform: [{ rotate }] }]}>
        <View style={styles.spinner} />
      </Animated.View>

      <Text style={styles.subtext}>
        We'll ask a few quick questions to{"\n"}
        identify areas where you may need{"\n"}
        better protection.
      </Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 40,
    textAlign: "center",
  },
  spinnerWrap: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  spinner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "#F0EDE8",
    borderTopColor: "#E8863C",
  },
  subtext: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
  },
});
