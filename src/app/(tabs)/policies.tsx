import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { fetchPolicies } from "@/api/insuranceApi";
import BackButton from "@/components/BackButton";
import LoadingView from "@/components/LoadingView";
import PolicyCard from "@/components/PolicyCard";
import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";
import { useApi } from "@/hooks/useApi";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type StatusFilter = "active" | "inactive";

export default function PolicyScreen() {
  const [status, setStatus] = useState<StatusFilter>("active");
  const [hintVisible, setHintVisible] = useState(true);
  const { data: policies, loading, error } = useApi(fetchPolicies, []);

  const filteredPolicies = (policies ?? []).filter(
    (policy) => policy.status === status,
  );

  return (
    <ScreenLayout
      scrollable={false}
      style={styles.screen}
      edges={TAB_SCREEN_EDGES}
    >
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.title}>My Policies</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.toggle}>
        <Pressable
          style={[styles.toggleOption, status === "active" && styles.toggleOptionActive]}
          onPress={() => setStatus("active")}
        >
          <Text
            style={[
              styles.toggleLabel,
              status === "active" && styles.toggleLabelActive,
            ]}
          >
            Active
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleOption,
            status === "inactive" && styles.toggleOptionActive,
          ]}
          onPress={() => setStatus("inactive")}
        >
          <Text
            style={[
              styles.toggleLabel,
              status === "inactive" && styles.toggleLabelActive,
            ]}
          >
            Inactive
          </Text>
        </Pressable>
      </View>

      {hintVisible ? (
        <View style={styles.hint}>
          <Feather name="repeat" size={14} color="#757575" />
          <Text style={styles.hintText}>Swipe left to View Details</Text>
          <Pressable
            onPress={() => setHintVisible(false)}
            hitSlop={8}
            style={styles.hintClose}
          >
            <Feather name="x" size={14} color="#757575" />
          </Pressable>
        </View>
      ) : null}

      {loading || error ? (
        <LoadingView error={error} />
      ) : (
        <FlatList
          data={filteredPolicies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/policy-details",
                  params: { policyId: item.id },
                })
              }
            >
              <PolicyCard item={item} style={styles.card} />
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No {status} policies to show.
            </Text>
          }
        />
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F7F3",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerSpacer: {
    width: 32,
  },
  title: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  toggleOptionActive: {
    backgroundColor: "#383838",
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
  hint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
    marginBottom: 16,
  },
  hintText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#757575",
    fontWeight: "500",
  },
  hintClose: {
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 24,
    gap: 16,
  },
  card: {
    minHeight: 190,
  },
  emptyText: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginTop: 40,
  },
});
