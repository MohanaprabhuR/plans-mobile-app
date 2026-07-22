/* eslint-disable react-hooks/immutability -- reanimated shared values are designed to be mutated via `.value` */
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PolicyDetail } from "@/constants/policyDetails";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.92;
const PARTIAL_VISIBLE_HEIGHT = SCREEN_HEIGHT * 0.62;

const SNAP_EXPANDED = 0;
const SNAP_PARTIAL = SHEET_HEIGHT - PARTIAL_VISIBLE_HEIGHT;
const SNAP_CLOSED = SHEET_HEIGHT;

const SPRING_CONFIG = { damping: 24, stiffness: 260, mass: 0.7 };

type Filter = "covered" | "notCovered";

type KnowYourCoverageSheetProps = {
  visible: boolean;
  detail: PolicyDetail;
  initialFilter: Filter;
  onClose: () => void;
};

export default function KnowYourCoverageSheet({
  visible,
  detail,
  initialFilter,
  onClose,
}: KnowYourCoverageSheetProps) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [prevVisible, setPrevVisible] = useState(visible);
  const translateY = useSharedValue(SNAP_CLOSED);
  const dragStartY = useSharedValue(SNAP_PARTIAL);

  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) {
      setFilter(initialFilter);
    }
  }

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(SNAP_PARTIAL, SPRING_CONFIG);
    } else {
      translateY.value = SNAP_CLOSED;
    }
  }, [visible, translateY]);

  const handleDismiss = () => {
    translateY.value = withTiming(SNAP_CLOSED, { duration: 220 }, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      dragStartY.value = translateY.value;
    })
    .onUpdate((event) => {
      const next = dragStartY.value + event.translationY;
      translateY.value = Math.max(SNAP_EXPANDED, Math.min(SNAP_CLOSED, next));
    })
    .onEnd((event) => {
      const current = translateY.value;
      const shouldDismiss =
        current > SNAP_PARTIAL + 80 || event.velocityY > 900;
      const shouldExpand =
        !shouldDismiss &&
        (current < SNAP_PARTIAL / 2 || event.velocityY < -900);

      if (shouldDismiss) {
        translateY.value = withTiming(
          SNAP_CLOSED,
          { duration: 220 },
          (finished) => {
            if (finished) {
              runOnJS(onClose)();
            }
          },
        );
      } else if (shouldExpand) {
        translateY.value = withSpring(SNAP_EXPANDED, SPRING_CONFIG);
      } else {
        translateY.value = withSpring(SNAP_PARTIAL, SPRING_CONFIG);
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const items = filter === "covered" ? detail.covered : detail.notCovered;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleDismiss} />

        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 24) },
            sheetStyle,
          ]}
        >
          <GestureDetector gesture={panGesture}>
            <View style={styles.dragArea}>
              <View style={styles.handle} />
              <Text style={styles.title}>Know Your Coverage</Text>
            </View>
          </GestureDetector>

          <View style={styles.toggle}>
            <Pressable
              style={[
                styles.toggleOption,
                filter === "covered" && styles.toggleOptionCovered,
              ]}
              onPress={() => setFilter("covered")}
            >
              <Feather
                name="check-circle"
                size={16}
                color={filter === "covered" ? "#FFFFFF" : "#9CA3AF"}
              />
              <Text
                style={[
                  styles.toggleLabel,
                  filter === "covered" && styles.toggleLabelActive,
                ]}
              >
                Covered
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.toggleOption,
                filter === "notCovered" && styles.toggleOptionNotCovered,
              ]}
              onPress={() => setFilter("notCovered")}
            >
              <Feather
                name="x-circle"
                size={16}
                color={filter === "notCovered" ? "#FFFFFF" : "#9CA3AF"}
              />
              <Text
                style={[
                  styles.toggleLabel,
                  filter === "notCovered" && styles.toggleLabelActive,
                ]}
              >
                Not Covered
              </Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemIconWrap}>
                  <Feather name={item.icon} size={18} color="#383838" />
                </View>
                <View style={styles.itemTextWrap}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(56, 56, 56, 0.5)",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: "#F8F7F3",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
  },
  dragArea: {
    paddingTop: 12,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D4D2CD",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 16,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  toggleOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleOptionCovered: {
    backgroundColor: "#16A34A",
  },
  toggleOptionNotCovered: {
    backgroundColor: "#DC2626",
  },
  toggleLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  toggleLabelActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 16,
    gap: 20,
  },
  itemRow: {
    flexDirection: "row",
    gap: 12,
  },
  itemIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTextWrap: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#757575",
  },
});
