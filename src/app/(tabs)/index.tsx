import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import ScreenLayout from "@/components/ScreenLayout";

const healthIcon = require("../../../assets/images/health.png");
const autoIcon = require("../../../assets/images/auto.png");
const homeIcon = require("../../../assets/images/home.png");
const familyIcon = require("../../../assets/images/family.png");
const careLogo = require("../../../assets/images/care-logo.png");

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
              source={careLogo}
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
});
