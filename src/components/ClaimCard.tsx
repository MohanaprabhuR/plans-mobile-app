import { Image, StyleSheet, Text, View } from "react-native";

import { getCategoryColor } from "@/constants/categoryColors";
import { ClaimCardData } from "@/constants/dashboardData";

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
          style={[styles.logoWrap, { backgroundColor: item.logoBackgroundColor }]}
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

      <View style={[styles.footer, { backgroundColor: footerColor }]}>
        <Text style={styles.footerText}>{item.date}</Text>
        <Text style={styles.footerText}>{item.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 28,
    height: 28,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  meta: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    color: "#757575",
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#383838",
  },
  amount: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    color: "#C97B2B",
  },
});
