import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

import { PolicyCardData } from "@/constants/policyData";

type PolicyCardProps = {
  item: PolicyCardData;
  style?: ViewStyle;
};

function ProviderBrand({ item }: { item: PolicyCardData }) {
  if (item.logo) {
    return (
      <Image source={item.logo} style={styles.careLogo} resizeMode="contain" />
    );
  }

  if (item.brandLabel) {
    return (
      <View style={styles.brandWrap}>
        {item.id === "auto" ? (
          <View style={styles.safeAutoBadge}>
            <Text style={styles.safeAutoInitials}>SA</Text>
          </View>
        ) : null}
        <Text
          style={[
            styles.brandLabel,
            item.id === "home" && styles.brandLabelHome,
            item.id === "auto" && styles.brandLabelAuto,
          ]}
        >
          {item.brandLabel}
        </Text>
      </View>
    );
  }

  return null;
}

export default function PolicyCard({ item, style }: PolicyCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: item.bgColor }, style]}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.titleRow}>
            <View style={styles.iconWrap}>
              <Image
                source={item.icon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.titleText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.provider}</Text>
            </View>
          </View>
          <ProviderBrand item={item} />
        </View>

        <View style={styles.statsRow}>
          {item.stats.map((stat) => (
            <View key={`${item.id}-${stat.value}`} style={styles.stat}>
              <Feather name={stat.icon} size={20} color="#555555" />
              <Text style={styles.statText} numberOfLines={1}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            Risk Covered: {item.riskCovered}
          </Text>
          <View style={styles.expiryRow}>
            <Feather name="info" size={16} color="#555555" />
            <Text style={styles.footerText}>{item.expiry}</Text>
          </View>
        </View>
      </View>

      <View style={styles.patternLarge} />
      <View style={styles.patternSmall} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    overflow: "hidden",
    position: "relative",
    minHeight: 190,
  },
  content: {
    zIndex: 2,
    position: "relative",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 22,
    height: 22,
  },
  titleText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 16,
    color: "#555555",
  },
  careLogo: {
    width: 78,
    height: 40,
  },
  brandWrap: {
    alignItems: "flex-end",
    gap: 4,
  },
  safeAutoBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1F9D55",
    alignItems: "center",
    justifyContent: "center",
  },
  safeAutoInitials: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  brandLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#383838",
  },
  brandLabelHome: {
    fontSize: 15,
    color: "#0B74C1",
  },
  brandLabelAuto: {
    fontSize: 12,
    letterSpacing: 0.4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 36,
    marginBottom: 36,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  statText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#383838",
    flexShrink: 1,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expiryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#383838",
  },
  patternLarge: {
    width: 260,
    height: 260,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    top: -130,
    right: -130,
  },
  patternSmall: {
    width: 160,
    height: 160,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    bottom: -80,
    right: -80,
  },
});
