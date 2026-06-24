import HospitalCard from "@/components/HospitalCard";
import { Hospital } from "@/constants/hospitalData";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SHEET_HEIGHT = Dimensions.get("window").height * 0.88;

type HospitalBottomSheetProps = {
  visible: boolean;
  title: string;
  hospitals: Hospital[];
  regionLabel?: string;
  onClose: () => void;
};

export default function HospitalBottomSheet({
  visible,
  title,
  hospitals,
  regionLabel = "Texas",
  onClose,
}: HospitalBottomSheetProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!visible) {
      setSearch("");
    }
  }, [visible]);

  const filteredHospitals = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return hospitals;

    return hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(query) ||
        hospital.city.toLowerCase().includes(query) ||
        hospital.state.toLowerCase().includes(query),
    );
  }, [hospitals, search]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.overlayBackdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <LinearGradient
            colors={["#FFE8D6", "#FFFFFF", "#FFFFFF"]}
            locations={[0, 0.35, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Feather name="x" size={20} color="#383838" />
            </Pressable>
          </View>

          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#757575" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for a hospital"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.filtersRow}>
            <Text style={styles.matchCount}>
              {filteredHospitals.length} Matches Found in {regionLabel}
            </Text>
            <View style={styles.filterActions}>
              <Pressable style={styles.filterChip}>
                <Text style={styles.filterLabel}>Distance</Text>
                <Feather name="chevron-down" size={14} color="#383838" />
              </Pressable>
              <Pressable style={styles.filterChip}>
                <Text style={styles.filterLabel}>Ratings</Text>
                <Feather name="chevron-down" size={14} color="#383838" />
              </Pressable>
            </View>
          </View>

          <FlatList
            data={filteredHospitals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HospitalCard hospital={item} />}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          />
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
  overlayBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(56, 56, 56, 0.45)",
  },
  sheet: {
    height: SHEET_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
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
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#383838",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#383838",
    padding: 0,
  },
  filtersRow: {
    gap: 12,
    marginBottom: 16,
  },
  matchCount: {
    fontSize: 13,
    lineHeight: 20,
    color: "#757575",
  },
  filterActions: {
    flexDirection: "row",
    gap: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: "#383838",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  listSeparator: {
    height: 12,
  },
});
