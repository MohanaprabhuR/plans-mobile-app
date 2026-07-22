import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  DISTANCE_OPTIONS,
  DistanceFilter,
  HospitalFilters,
  RATING_OPTIONS,
  defaultHospitalFilters,
  filtersAreEqual,
} from "@/constants/hospitalFilters";

const SHEET_HEIGHT = Dimensions.get("window").height * 0.58;

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
  const [prevVisible, setPrevVisible] = useState(visible);

  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) {
      setDraftFilters(appliedFilters);
      setExpandedSection(null);
    }
  }

  const hasSelections =
    draftFilters.distance !== null || draftFilters.ratings.length > 0;
  const hasChanges = !filtersAreEqual(draftFilters, appliedFilters);
  const canApply = hasSelections || hasChanges;

  const toggleSection = (section: ExpandedSection) => {
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
    onApply(defaultHospitalFilters);
    onClose();
  };

  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View
          style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24) }]}
        >
          <View style={styles.handle} />

          <View style={styles.header}>
            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Close filters"
            >
              <Feather name="x" size={16} color="#383838" />
            </Pressable>
            <Text style={styles.title}>Filters</Text>
            <Pressable onPress={handleReset} hitSlop={8}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>

          <View style={styles.sections}>
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
          </View>

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
        </View>
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
    minHeight: SHEET_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D4D2CD",
    marginTop: 12,
    marginBottom: 16,
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
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  resetText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#FF5E00",
  },
  sections: {
    flex: 1,
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
    marginTop: 24,
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
