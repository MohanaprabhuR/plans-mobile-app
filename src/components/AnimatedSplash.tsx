/* eslint-disable react-hooks/refs -- RN Animated.Value refs are read during render by design */
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const splashImage = require("../../assets/images/splash-icon.png");

type AnimatedSplashProps = {
  onFinish: () => void;
};

/**
 * Renders on top of the app at launch, matching the native splash
 * (orange background + white "plans" wordmark), zooms the logo in,
 * then fades the whole overlay away to reveal the app.
 */
export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    // Swap out the static native splash for this animated one.
    SplashScreen.hideAsync().catch(() => {});

    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.08,
        damping: 12,
        stiffness: 120,
        useNativeDriver: true,
      }),
      Animated.delay(250),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onFinishRef.current();
    });
  }, [scale, opacity]);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.Image
        source={splashImage}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    backgroundColor: "#FF5E00",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
