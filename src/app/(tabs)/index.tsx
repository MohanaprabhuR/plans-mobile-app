import { Feather, Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";

const healthIcon = require("../../../assets/images/health.png");
const autoIcon = require("../../../assets/images/auto.png");
const homeIcon = require("../../../assets/images/home.png");
const familyIcon = require("../../../assets/images/family.png");
const carelogo = require("../../../assets/images/care-logo.png");

const premiumItems = [
  {
    label: "Health",
    count: 2,
    amount: "$3,000",
    icon: healthIcon,
    tint: "#7C5CFF",
  },
  {
    label: "Auto",
    count: 1,
    amount: "$1,000",
    icon: autoIcon,
    tint: "#FF5E9A",
  },
  {
    label: "Life",
    count: 3,
    amount: "$5,000",
    icon: familyIcon,
    tint: "#F8E108",
  },
  {
    label: "Home",
    count: 1,
    amount: "$1,000",
    icon: homeIcon,
    tint: "#F8E108",
  },
];

const claims = [
  {
    id: "1",
    label: "Treatment Surgery Expenses",
    amount: "$250",
    date: "12 Oct",
    status: "Pending",
    icon: healthIcon,
    tint: "#7C5CFF",
  },
  {
    id: "2",
    label: "Accidental Damage Repair",
    amount: "$120",
    date: "08 Oct",
    status: "Approved",
    icon: autoIcon,
    tint: "#FF5E9A",
  },
];

export default function HomeScreen() {
  return (
    <ScreenLayout style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: "https://mockmind-api.uifaces.co/content/human/80.jpg",
              }}
              style={styles.avatarImage}
            />
          </View>
          <Feather name="chevron-down" size={16} color="#383838" />
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton}>
            <Feather name="bell" size={20} color="#383838" />
          </Pressable>
          <Pressable style={styles.addButton}>
            <Feather name="plus" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
      <View style={styles.greeting}>
        <Text style={styles.greetingName}>Hi Mohanaprabhu</Text>
        <Text style={styles.greetingSub}>Good Morning</Text>
      </View>

      <View style={styles.heroCard}>
        <View style={{ zIndex: 2, position: "relative" }}>
          <View style={styles.heroTop}>
            <View style={styles.heroTitleRow}>
              <View style={styles.heroIconWrap}>
                <Feather name="plus" size={18} color="#383838" />
              </View>
              <View>
                <Text style={styles.heroTitle}>Health Insurance</Text>
                <Text style={styles.heroSubtitle}>Care Health</Text>
              </View>
            </View>
            <Image
              source={carelogo}
              style={styles.careLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Feather name="shield" size={20} color="#555555" />
              <Text style={styles.heroStatText}>$5500</Text>
            </View>
            <View style={styles.heroStat}>
              <Feather name="calendar" size={20} color="#555555" />
              <Text style={styles.heroStatText}>$250/Year</Text>
            </View>
            <View style={styles.heroStat}>
              <Feather name="users" size={20} color="#555555" />
              <Text style={styles.heroStatText}>3 Members</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.riskCovered}>Risk Covered: 8</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Feather name="alert-circle" size={20} color="#555555" />
              <Text style={styles.riskCovered}>06/2026</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: 260,
            height: 260,
            backgroundColor: "#FFFFFF",
            opacity: 0.3,
            transform: [{ rotate: "45deg" }],
            position: "absolute",
            top: -130,
            right: -130,
          }}
        ></View>
        <View
          style={{
            width: 160,
            height: 160,
            backgroundColor: "#FFFFFF",
            opacity: 0.3,
            transform: [{ rotate: "45deg" }],
            position: "absolute",
            bottom: -80,
            right: -80,
          }}
        ></View>
      </View>

      <View style={styles.actionRow}>
        {[
          { label: "View", icon: "eye" as const },
          { label: "Claims", icon: "file-text" as const },
          { label: "Renewal", icon: "refresh-cw" as const },
        ].map((action) => (
          <Pressable key={action.label} style={styles.actionCard}>
            <Feather name={action.icon} size={20} color="#383838" />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.riskCard}>
        <View style={styles.riskBadge}>
          <Text style={styles.riskBadgeText}>35</Text>
        </View>
        <View style={styles.riskInfo}>
          <Text style={styles.riskTitle}>Risk Overview</Text>
          <Text style={styles.riskLevel}>Medium</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#FFFFFF" />
      </Pressable>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {[
            { label: "Network Hospitals", icon: "home" as const },
            { label: "Blacklisted Hospitals", icon: "slash" as const },
            { label: "AI Policy Assistant", icon: "cpu" as const },
          ].map((action) => (
            <Pressable key={action.label} style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Feather name={action.icon} size={20} color="#383838" />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.premiumHeader}>
          <View>
            <Text style={styles.premiumLabel}>Total Yearly Premium</Text>
            <Text style={styles.premiumAmount}>$10,000</Text>
          </View>
          <View style={styles.premiumShield}>
            <Ionicons name="shield-checkmark" size={22} color="#F9B233" />
          </View>
        </View>

        {premiumItems.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.premiumRow,
              index < premiumItems.length - 1 && styles.premiumRowBorder,
            ]}
          >
            <View
              style={[
                styles.premiumIcon,
                { backgroundColor: `${item.tint}18` },
              ]}
            >
              <Image source={item.icon} style={styles.premiumIconImage} />
            </View>
            <View style={styles.premiumInfo}>
              <Text style={styles.premiumName}>
                {item.label} ({item.count})
              </Text>
              <Text style={styles.premiumValue}>{item.amount}/Year</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Claims</Text>
        {claims.map((claim, index) => (
          <View
            key={claim.id}
            style={[
              styles.claimRow,
              index < claims.length - 1 && styles.claimRowBorder,
            ]}
          >
            <View
              style={[styles.claimIcon, { backgroundColor: `${claim.tint}18` }]}
            >
              <Image source={claim.icon} style={styles.claimIconImage} />
            </View>
            <View style={styles.claimInfo}>
              <Text style={styles.claimTitle}>{claim.label}</Text>
              <Text style={styles.claimMeta}>
                {claim.amount} · {claim.date}
              </Text>
            </View>
            <View
              style={[
                styles.claimStatus,
                claim.status === "Pending" && styles.claimStatusPending,
              ]}
            >
              <Text
                style={[
                  styles.claimStatusText,
                  claim.status === "Pending" && styles.claimStatusTextPending,
                ]}
              >
                {claim.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F7F3",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#E8E6E1",
    overflow: "hidden",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    objectFit: "cover",
  },
  greeting: {
    marginVertical: 16,
  },
  greetingName: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.1,
    fontWeight: "700",
    color: "#383838",
  },
  greetingSub: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555555",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#FF5E00",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    backgroundColor: "#F8E108",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    position: "relative",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  heroTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heroIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#555555",
    lineHeight: 16,
  },
  careLogo: {
    width: 78,
    height: 40,
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginVertical: 43,
  },
  heroStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heroStatText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#383838",
  },
  riskCovered: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#383838",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#383838",
  },
  riskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#383838",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 14,
  },
  riskBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F9B233",
    alignItems: "center",
    justifyContent: "center",
  },
  riskBadgeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#383838",
  },
  riskInfo: {
    flex: 1,
  },
  riskTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  riskLevel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F8F7F3",
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#383838",
    textAlign: "center",
    lineHeight: 15,
  },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE8",
  },
  premiumLabel: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  premiumAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#383838",
    marginTop: 4,
  },
  premiumShield: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  premiumRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  premiumRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE8",
  },
  premiumIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  premiumIconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  premiumInfo: {
    flex: 1,
  },
  premiumName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#383838",
  },
  premiumValue: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  claimRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  claimRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE8",
  },
  claimIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  claimIconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  claimInfo: {
    flex: 1,
  },
  claimTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#383838",
  },
  claimMeta: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  claimStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#F0EDE8",
  },
  claimStatusPending: {
    backgroundColor: "#FFF0E6",
  },
  claimStatusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#757575",
  },
  claimStatusTextPending: {
    color: "#FF5E00",
  },
});
