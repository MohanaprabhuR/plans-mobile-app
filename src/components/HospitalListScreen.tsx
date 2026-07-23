import BackButton from "@/components/BackButton";
import HospitalCard from "@/components/HospitalCard";
import HospitalFilterSheet from "@/components/HospitalFilterSheet";
import { Hospital } from "@/constants/hospitalData";
import {
  HospitalFilters,
  countActiveFilters,
  defaultHospitalFilters,
} from "@/constants/hospitalFilters";
import { filterHospitals } from "@/utils/filterHospitals";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "@/lib/safe-area";

type HospitalListScreenProps = {
  title: string;
  hospitals: Hospital[];
  regionLabel?: string;
};

export default function HospitalListScreen({
  title,
  hospitals,
  regionLabel = "Texas",
}: HospitalListScreenProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<HospitalFilters>(
    defaultHospitalFilters,
  );
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);

  const filteredHospitals = useMemo(
    () => filterHospitals(hospitals, search, filters),
    [hospitals, search, filters],
  );

  const activeFilterCount = countActiveFilters(filters);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} iconSize={8} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {filteredHospitals.length} Results Found in {regionLabel}
        </Text>

        <View style={styles.searchBar}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search Hospitals"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            returnKeyType="search"
          />
          <Ionicons name="search" size={24} color="#757575" />
        </View>

        <FlatList
          data={filteredHospitals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HospitalCard hospital={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No hospitals found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or filters
              </Text>
            </View>
          }
        />

        <Pressable
          style={styles.filterFab}
          onPress={() => setFilterSheetVisible(true)}
          accessibilityLabel="Open filters"
        >
          <Feather name="sliders" size={20} color="#FFFFFF" />
          {activeFilterCount > 0 ? (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <HospitalFilterSheet
        visible={filterSheetVisible}
        appliedFilters={filters}
        onClose={() => setFilterSheetVisible(false)}
        onApply={setFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F7F3",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: "600",
    color: "#757575",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    boxShadow: "0px 1px 2px 0px rgba(56, 56, 56, 0.09)",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: "#383838",
    padding: 0,
  },
  listContent: {
    paddingBottom: 96,
    gap: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#757575",
    textAlign: "center",
  },
  filterFab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#383838",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF5E00",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  filterBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
