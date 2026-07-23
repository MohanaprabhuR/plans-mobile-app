import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";

import { fetchCoverageReport } from "@/api/insuranceApi";
import BackButton from "@/components/BackButton";
import LoadingView from "@/components/LoadingView";
import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";
import {
  CoverageGapCategory,
  RiskGroup,
} from "@/constants/coverageScoreData";
import { CoverageScoreBand } from "@/constants/riskOverviewData";
import { useApi } from "@/hooks/useApi";

const GAUGE_SIZE = 220;
const GAUGE_STROKE = 14;
const GAUGE_RADIUS = (GAUGE_SIZE - GAUGE_STROKE) / 2;

function ScoreGauge({
  score,
  band,
}: {
  score: number;
  band: CoverageScoreBand;
}) {

  return (
    <View style={styles.gaugeWrap}>
      <Svg width={GAUGE_SIZE} height={GAUGE_SIZE}>
        <Defs>
          <SvgLinearGradient id="gaugeGradient" x1="0" y1="0.5" x2="1" y2="0.5">
            <Stop offset="0" stopColor="#DC2626" />
            <Stop offset="0.5" stopColor="#FF5E00" />
            <Stop offset="1" stopColor="#F9B233" />
          </SvgLinearGradient>
        </Defs>
        <Circle
          cx={GAUGE_SIZE / 2}
          cy={GAUGE_SIZE / 2}
          r={GAUGE_RADIUS}
          stroke="url(#gaugeGradient)"
          strokeWidth={GAUGE_STROKE}
          strokeDasharray="2 4.5"
          fill="none"
        />
      </Svg>
      <View style={styles.gaugeInner}>
        <Text style={styles.gaugeScore}>{score}</Text>
        <Text style={styles.gaugeOutOf}>Out of 100</Text>
        <Text style={[styles.gaugeBand, { color: band.color }]}>
          {band.label}
        </Text>
      </View>
    </View>
  );
}

function GapCategoryCard({ category }: { category: CoverageGapCategory }) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.cardHeader,
          { backgroundColor: category.headerBackground },
        ]}
      >
        <View
          style={[
            styles.categoryIconWrap,
            { backgroundColor: category.iconBackground },
          ]}
        >
          <FontAwesome5 name={category.icon} size={18} color="#FFFFFF" />
        </View>
        <View style={styles.categoryTextWrap}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.gapsBadge}>
            <Feather name="alert-circle" size={11} color="#FFFFFF" />
            <Text style={styles.gapsBadgeText}>
              {category.gaps.length} Gaps
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.riskGapsTitle}>Risk Gaps</Text>
        <View style={styles.gapsRow}>
          {category.gaps.map((gap) => (
            <View key={gap} style={styles.gapItem}>
              <View style={styles.gapIconWrap}>
                <Feather name="x" size={11} color="#FFFFFF" />
              </View>
              <Text style={styles.gapLabel}>{gap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.coveredByRow}>
        <Text style={styles.coveredByText}>
          Covered by <Text style={styles.coveredByName}>{category.coveredBy}</Text>
        </Text>
        <Text style={[styles.brandLabel, { color: category.brandColor }]}>
          {category.brandLabel}
        </Text>
      </View>

      <View style={styles.suggestionWrap}>
        <Text style={styles.suggestionText}>
          <Text style={styles.suggestionLead}>Suggestion: </Text>
          {category.suggestion}{" "}
          <Text
            style={styles.getQuoteLink}
            onPress={() => router.push("/(tabs)/policies")}
          >
            Get Quote
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default function CoverageScreen() {
  const [group, setGroup] = useState<RiskGroup>("personal");
  const { data, loading, error } = useApi(fetchCoverageReport, []);

  if (loading || error || !data) {
    return (
      <ScreenLayout
        scrollable={false}
        contentContainerStyle={styles.screen}
        edges={TAB_SCREEN_EDGES}
      >
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Coverage Score</Text>
          <View style={styles.headerSpacer} />
        </View>
        <LoadingView error={error} />
      </ScreenLayout>
    );
  }

  const categories = data.gapCategories.filter(
    (category) => category.group === group,
  );

  return (
    <ScreenLayout
      scrollable={false}
      contentContainerStyle={styles.screen}
      edges={TAB_SCREEN_EDGES}
    >
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Coverage Score</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScoreGauge score={data.score} band={data.band} />

        <View style={styles.messagePill}>
          <Text style={styles.messageText}>
            You still have some gaps. Fix them to improve your protection
          </Text>
        </View>

        <View style={styles.toggle}>
          <Pressable
            style={[
              styles.toggleOption,
              group === "personal" && styles.toggleOptionActive,
            ]}
            onPress={() => setGroup("personal")}
          >
            <Text
              style={[
                styles.toggleLabel,
                group === "personal" && styles.toggleLabelActive,
              ]}
            >
              Personal Risk
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleOption,
              group === "asset" && styles.toggleOptionActive,
            ]}
            onPress={() => setGroup("asset")}
          >
            <Text
              style={[
                styles.toggleLabel,
                group === "asset" && styles.toggleLabelActive,
              ]}
            >
              Asset Risk
            </Text>
          </Pressable>
        </View>

        {categories.map((category) => (
          <GapCategoryCard key={category.id} category={category} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  headerSpacer: {
    width: 32,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  gaugeWrap: {
    alignSelf: "center",
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  gaugeInner: {
    position: "absolute",
    width: GAUGE_SIZE - GAUGE_STROKE * 2 - 24,
    height: GAUGE_SIZE - GAUGE_STROKE * 2 - 24,
    borderRadius: (GAUGE_SIZE - GAUGE_STROKE * 2 - 24) / 2,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F9B233",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  gaugeScore: {
    fontSize: 44,
    lineHeight: 52,
    fontWeight: "700",
    color: "#383838",
    letterSpacing: -1,
  },
  gaugeOutOf: {
    fontSize: 13,
    lineHeight: 18,
    color: "#757575",
    marginTop: 2,
  },
  gaugeBand: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 6,
  },
  messagePill: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 20,
    maxWidth: 300,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#555555",
    textAlign: "center",
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 4,
    marginBottom: 16,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  toggleOptionActive: {
    backgroundColor: "#F8F7F3",
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  toggleLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  toggleLabelActive: {
    color: "#383838",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTextWrap: {
    flex: 1,
    gap: 6,
  },
  categoryTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: "#383838",
  },
  gapsBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#383838",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  gapsBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  riskGapsTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#383838",
    textDecorationLine: "underline",
    marginBottom: 12,
  },
  gapsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 24,
    rowGap: 12,
  },
  gapItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gapIconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#9CA3AF",
    alignItems: "center",
    justifyContent: "center",
  },
  gapLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#383838",
  },
  coveredByRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F2EE",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  coveredByText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#555555",
  },
  coveredByName: {
    fontWeight: "700",
    color: "#383838",
  },
  brandLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  suggestionWrap: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  suggestionText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#555555",
  },
  suggestionLead: {
    fontWeight: "700",
    color: "#383838",
  },
  getQuoteLink: {
    color: "#FF5E00",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
