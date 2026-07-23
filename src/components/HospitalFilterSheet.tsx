/* eslint-disable react-hooks/refs -- Animated.Value + PanResponder refs are read by RN during render by design */
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";

import { useSafeAreaInsets } from "@/lib/safe-area";
import {
  DISTANCE_OPTIONS,
  DistanceFilter,
  HospitalFilters,
  RATING_OPTIONS,
  defaultHospitalFilters,
  filtersAreEqual,
} from "@/constants/hospitalFilters";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.58;
const DISMISS_DISTANCE = SHEET_HEIGHT * 0.22;

type HospitalFilterSheetProps = {
  visible: boolean;
  appliedFilters: HospitalFilters;
  onClose: () => void;
  onApply: (filters: HospitalFilters) => void;
};

type ExpandedSection = "distance" | "ratings" | null;

export default function HospitalFilterSheet({
  visible,
  appliedFilters,
  onClose,
  onApply,
}: HospitalFilterSheetProps) {
  const insets = useSafeAreaInsets();
  const [draftFilters, setDraftFilters] =
    useState<HospitalFilters>(appliedFilters);
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const [rendered, setRendered] = useState(visible);
  const [prevVisible, setPrevVisible] = useState(visible);

  const [translateY] = useState(() => new Animated.Value(SHEET_HEIGHT));
  const [backdropOpacity] = useState(() => new Animated.Value(0));
  const dragOriginY = useRef(0);
  const sheetY = useRef(SHEET_HEIGHT);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const onApplyRef = useRef(onApply);

  onCloseRef.current = onClose;
  onApplyRef.current = onApply;

  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) {
      setRendered(true);
      setDraftFilters(appliedFilters);
      setExpandedSection(null);
      closingRef.current = false;
      sheetY.current = SHEET_HEIGHT;
      translateY.setValue(SHEET_HEIGHT);
      backdropOpacity.setValue(0);
    }
  }

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        damping: 24,
        stiffness: 260,
        mass: 0.7,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        sheetY.current = 0;
      }
    });
  }, [visible, translateY, backdropOpacity]);

  const animateClose = useRef((afterClose?: () => void) => {
    if (closingRef.current) return;
    closingRef.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) {
        closingRef.current = false;
        return;
      }
      sheetY.current = SHEET_HEIGHT;
      setRendered(false);
      afterClose?.();
      onCloseRef.current();
      closingRef.current = false;
    });
  }).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dy) > 4 &&
        Math.abs(gesture.dy) >= Math.abs(gesture.dx),
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: () => {
        dragOriginY.current = sheetY.current;
      },
      onPanResponderMove: (_, gesture) => {
        const next = Math.max(
          0,
          Math.min(SHEET_HEIGHT, dragOriginY.current + gesture.dy),
        );
        sheetY.current = next;
        translateY.setValue(next);
      },
      onPanResponderRelease: (_, gesture) => {
        const current = Math.max(
          0,
          Math.min(SHEET_HEIGHT, dragOriginY.current + gesture.dy),
        );
        sheetY.current = current;
        translateY.setValue(current);

        const shouldDismiss = current > DISMISS_DISTANCE || gesture.vy > 1.1;

        if (shouldDismiss) {
          animateClose();
          return;
        }

        Animated.spring(translateY, {
          toValue: 0,
          damping: 24,
          stiffness: 260,
          mass: 0.7,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            sheetY.current = 0;
          }
        });
      },
    }),
  ).current;

  const hasSelections =
    draftFilters.distance !== null || draftFilters.ratings.length > 0;
  const hasChanges = !filtersAreEqual(draftFilters, appliedFilters);
  const canApply = hasSelections || hasChanges;

  const toggleSection = (section: ExpandedSection) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection((current) => (current === section ? null : section));
  };

  const selectDistance = (value: DistanceFilter) => {
    setDraftFilters((current) => ({
      ...current,
      distance: current.distance === value ? null : value,
    }));
  };

  const toggleRating = (value: number) => {
    setDraftFilters((current) => {
      const exists = current.ratings.includes(value);
      return {
        ...current,
        ratings: exists
          ? current.ratings.filter((rating) => rating !== value)
          : [...current.ratings, value].sort((a, b) => a - b),
      };
    });
  };

  const handleReset = () => {
    onApplyRef.current(defaultHospitalFilters);
    animateClose();
  };

  const handleApply = () => {
    onApplyRef.current(draftFilters);
    animateClose();
  };

  if (!rendered) {
    return null;
  }

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => animateClose()}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => animateClose()}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, 24),
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.dragRegion} {...panResponder.panHandlers}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <Pressable
              onPress={() => animateClose()}
              style={styles.closeButton}
              accessibilityLabel="Close filters"
            >
              <Feather name="x" size={16} color="#383838" />
            </Pressable>
            <Text style={styles.title}>Filters</Text>
            <Pressable
              onPress={handleReset}
              hitSlop={8}
              style={styles.resetButton}
              accessibilityLabel="Reset filters"
            >
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.sectionsScroll}
            contentContainerStyle={styles.sections}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            <View style={styles.section}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection("distance")}
              >
                <Text style={styles.sectionTitle}>Distance</Text>
                <Feather
                  name={
                    expandedSection === "distance"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                  color="#383838"
                />
              </Pressable>

              {expandedSection === "distance" ? (
                <View style={styles.options}>
                  {DISTANCE_OPTIONS.map((option) => {
                    const selected = draftFilters.distance === option.value;
                    return (
                      <Pressable
                        key={option.label}
                        style={styles.optionRow}
                        onPress={() => selectDistance(option.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                      >
                        <Text style={styles.optionLabel}>{option.label}</Text>
                        <View
                          style={[
                            styles.radioOuter,
                            selected && styles.radioOuterSelected,
                          ]}
                        >
                          {selected ? (
                            <Feather name="check" size={12} color="#FFFFFF" />
                          ) : null}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <View style={styles.section}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection("ratings")}
              >
                <Text style={styles.sectionTitle}>Ratings</Text>
                <Feather
                  name={
                    expandedSection === "ratings"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                  color="#383838"
                />
              </Pressable>

              {expandedSection === "ratings" ? (
                <View style={styles.options}>
                  {RATING_OPTIONS.map((option) => {
                    const selected = draftFilters.ratings.includes(
                      option.value,
                    );
                    return (
                      <Pressable
                        key={option.label}
                        style={styles.optionRow}
                        onPress={() => toggleRating(option.value)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: selected }}
                      >
                        <Text style={styles.optionLabel}>{option.label}</Text>
                        <View
                          style={[
                            styles.checkboxOuter,
                            selected && styles.checkboxOuterSelected,
                          ]}
                        >
                          {selected ? (
                            <Feather name="check" size={12} color="#FFFFFF" />
                          ) : null}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              ) : null}
            </View>
          </ScrollView>

          <Pressable
            style={[
              styles.applyButton,
              canApply ? styles.applyButtonActive : styles.applyButtonDisabled,
            ]}
            disabled={!canApply}
            onPress={handleApply}
          >
            <Text style={styles.applyText}>Apply Filters</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(56, 56, 56, 0.5)",
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
  },
  dragRegion: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 14,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D4D2CD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
    pointerEvents: "none",
  },
  resetButton: {
    minWidth: 32,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  resetText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#FF5E00",
  },
  sectionsScroll: {
    flex: 1,
  },
  sections: {
    paddingBottom: 8,
    flexGrow: 1,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  options: {
    paddingBottom: 8,
    gap: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  optionLabel: {
    fontSize: 15,
    lineHeight: 24,
    color: "#383838",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D4D2CD",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#FF5E00",
    backgroundColor: "#FF5E00",
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D4D2CD",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOuterSelected: {
    borderColor: "#FF5E00",
    backgroundColor: "#FF5E00",
  },
  applyButton: {
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  applyButtonActive: {
    backgroundColor: "#FF5E00",
  },
  applyButtonDisabled: {
    backgroundColor: "#FFD8BF",
  },
  applyText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
