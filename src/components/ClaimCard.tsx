import { Image, StyleSheet, Text, View } from "react-native";

import { getCategoryColor } from "@/constants/categoryColors";
import { ClaimCardData, claimStatusColors } from "@/constants/dashboardData";

type ClaimCardProps = {
  item: ClaimCardData;
};

const categoryLabels: Record<ClaimCardData["category"], string> = {
  health: "Health",
  auto: "Auto",
  life: "Life",
  home: "Home",
};

export default function ClaimCard({ item }: ClaimCardProps) {
  const footerColor = getCategoryColor(item.category);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View
          style={[
            styles.logoWrap,
            { backgroundColor: item.logoBackgroundColor },
          ]}
        >
          <Image source={item.logo} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.info}>
          <Text style={styles.meta}>
            {categoryLabels[item.category]} • {item.claimId}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>

        <Text style={styles.amount}>${item.amount}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{item.date}</Text>
        <Text
          style={[styles.footerText, { color: claimStatusColors[item.status] }]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  meta: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    color: "#555555",
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: "#383838",
  },
  amount: {
    fontSize: 21,
    lineHeight: 32,
    fontWeight: "600",
    color: "#383838",
    letterSpacing: -0.5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFAE5",
  },
  footerText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    color: "#555555",
  },
});
