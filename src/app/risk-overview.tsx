import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

import { fetchRiskOverview } from "@/api/insuranceApi";
import BackButton from "@/components/BackButton";
import LoadingView from "@/components/LoadingView";
import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";
import { RiskCategory, RiskItem } from "@/constants/riskOverviewData";
import { useApi } from "@/hooks/useApi";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function RiskRow({ item, isLast }: { item: RiskItem; isLast: boolean }) {
  const covered = item.status === "Covered";
  return (
    <View style={[styles.riskRow, !isLast && styles.riskRowBorder]}>
      <View style={styles.riskTextWrap}>
        <Text style={styles.riskTitle}>{item.title}</Text>
        <Text style={styles.riskDescription}>{item.description}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          covered ? styles.statusBadgeCovered : styles.statusBadgeUncovered,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            covered ? styles.statusTextCovered : styles.statusTextUncovered,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );
}

function CategoryCard({
  category,
  expanded,
  onToggle,
}: {
  category: RiskCategory;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.cardHeader}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <View
          style={[
            styles.categoryIconWrap,
            { backgroundColor: category.iconBackground },
          ]}
        >
          <FontAwesome5
            name={category.icon}
            size={16}
            color={category.iconColor}
          />
        </View>
        <View style={styles.categoryTextWrap}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.riskCountPill}>
            <Text style={styles.riskCountText}>
              {category.risks.length} Risks
            </Text>
          </View>
        </View>
        <Feather
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#383838"
        />
      </Pressable>

      {expanded ? (
        <View style={styles.cardBody}>
          {category.risks.map((item, index) => (
            <RiskRow
              key={item.id}
              item={item}
              isLast={index === category.risks.length - 1}
            />
          ))}
          <Pressable
            style={styles.improveButton}
            onPress={() => router.push("/(tabs)/coverage")}
          >
            <Text style={styles.improveButtonText}>Improve Coverage</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default function RiskOverviewScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { data, loading, error } = useApi(fetchRiskOverview, []);

  const toggleCategory = (categoryId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((current) => (current === categoryId ? null : categoryId));
  };

  if (loading || error || !data) {
    return (
      <ScreenLayout
        scrollable={false}
        contentContainerStyle={styles.screen}
        edges={TAB_SCREEN_EDGES}
      >
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
        </View>
        <LoadingView error={error} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      scrollable={false}
      contentContainerStyle={styles.screen}
      edges={TAB_SCREEN_EDGES}
    >
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
      </View>

      <Text style={styles.title}>Risk Overview</Text>
      <Text style={styles.subtitle}>{data.totalRiskCount} Risk Found</Text>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {data.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            expanded={expandedId === category.id}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#F8F7F3",
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 8,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#383838",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#757575",
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  categoryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTextWrap: {
    flex: 1,
    gap: 4,
  },
  categoryTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: "#383838",
  },
  riskCountPill: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF4EC",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  riskCountText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    color: "#FF5E00",
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: "#F0EDE8",
    paddingTop: 4,
    paddingBottom: 16,
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 12,
  },
  riskRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F2ED",
  },
  riskTextWrap: {
    flex: 1,
    gap: 2,
  },
  riskTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#383838",
  },
  riskDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#757575",
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  statusBadgeCovered: {
    backgroundColor: "#ECFDF5",
  },
  statusBadgeUncovered: {
    backgroundColor: "#FEF2F2",
  },
  statusText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
  },
  statusTextCovered: {
    color: "#16A34A",
  },
  statusTextUncovered: {
    color: "#DC2626",
  },
  improveButton: {
    backgroundColor: "#FF5E00",
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  improveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
