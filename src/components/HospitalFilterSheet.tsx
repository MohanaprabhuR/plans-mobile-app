import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  DISTANCE_OPTIONS,
  DistanceFilter,
  HospitalFilters,
  RATING_OPTIONS,
  countActiveFilters,
  defaultHospitalFilters,
  filtersAreEqual,
} from "@/constants/hospitalFilters";

const SHEET_HEIGHT = Dimensions.get("window").height * 0.72;

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
  const [draftFilters, setDraftFilters] =
    useState<HospitalFilters>(appliedFilters);
  const [expandedSection, setExpandedSection] =
    useState<ExpandedSection>(null);

  useEffect(() => {
    if (visible) {
      setDraftFilters(appliedFilters);
      setExpandedSection(null);
    }
  }, [visible, appliedFilters]);

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
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Pressable onPress={onClose} hitSlop={8}>
              <Feather name="x" size={20} color="#383838" />
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
                  name={expandedSection === "distance" ? "chevron-up" : "chevron-down"}
                  size={18}
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
                        <View
                          style={[
                            styles.radioOuter,
                            selected && styles.radioOuterSelected,
                          ]}
                        >
                          {selected ? <View style={styles.radioInner} /> : null}
                        </View>
                        <Text style={styles.optionLabel}>{option.label}</Text>
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
                  name={expandedSection === "ratings" ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#383838"
                />
              </Pressable>

              {expandedSection === "ratings" ? (
                <View style={styles.options}>
                  {RATING_OPTIONS.map((option) => {
                    const selected = draftFilters.ratings.includes(option.value);
                    return (
                      <Pressable
                        key={option.label}
                        style={styles.optionRow}
                        onPress={() => toggleRating(option.value)}
                      >
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
                        <Text style={styles.optionLabel}>{option.label}</Text>
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
            <Text
              style={[
                styles.applyText,
                canApply ? styles.applyTextActive : styles.applyTextDisabled,
              ]}
            >
              Apply Filters
              {countActiveFilters(draftFilters) > 0
                ? ` (${countActiveFilters(draftFilters)})`
                : ""}
            </Text>
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
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(56, 56, 56, 0.45)",
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
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
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  resetText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#FF5E00",
  },
  sections: {
    flex: 1,
    gap: 12,
  },
  section: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: "#EDEDED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#383838",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D4D2CD",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#FF5E00",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF5E00",
  },
  checkboxOuter: {
    width: 20,
    height: 20,
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
    borderRadius: 16,
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
  },
  applyTextActive: {
    color: "#FFFFFF",
  },
  applyTextDisabled: {
    color: "#FFFFFF",
    opacity: 0.8,
  },
});
