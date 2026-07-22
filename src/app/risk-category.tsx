import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";
import Button from "@/components/Button";
import ScreenLayout from "@/components/ScreenLayout";

const gaugeImage = require("../../assets/images/your-risk.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_PADDING = 16;
const GRID_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP * 2) / 3;

type TabKey = "personal" | "asset";

type CategoryItem = {
  label: string;
  icon: keyof typeof FontAwesome5.glyphMap;
};

const personalCategories: CategoryItem[] = [
  { label: "Health", icon: "heartbeat" },
  { label: "Lifestyle", icon: "utensils" },
  { label: "Income", icon: "hand-holding-usd" },
  { label: "Retirement", icon: "couch" },
  { label: "Family", icon: "users" },
  { label: "Travel", icon: "suitcase" },
  { label: "Savings", icon: "wallet" },
  { label: "Debt", icon: "money-bill-wave" },
  { label: "Disability", icon: "wheelchair" },
];

const assetCategories: CategoryItem[] = [
  { label: "Vehicle", icon: "car" },
  { label: "Property", icon: "home" },
  { label: "Gadgets", icon: "mobile-alt" },
  { label: "Fire", icon: "fire" },
  { label: "Flood", icon: "water" },
  { label: "Theft", icon: "lock" },
  { label: "Valuables", icon: "gem" },
  { label: "Equipment", icon: "tools" },
  { label: "Security", icon: "shield-alt" },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: "personal", label: "Personal Risk" },
  { key: "asset", label: "Asset Risk" },
];

export default function RiskCategory() {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  const categories =
    activeTab === "personal" ? personalCategories : assetCategories;

  return (
    <ScreenLayout contentContainerStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.tag}>Risk Categories</Text>
        <Text style={styles.title}>We’ll Check Your Risks into 2 Areas</Text>
      </View>

      <Image source={gaugeImage} style={styles.gauge} resizeMode="contain" />
      <View style={styles.tabsContainer}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.grid}>
          {categories.map((item) => (
            <View key={item.label} style={styles.card}>
              <FontAwesome5 name={item.icon} size={24} color="#555555" />
              <Text style={styles.cardLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Continue"
          theme="primary"
          onPress={() => router.push("/risk-loading-screen")}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 8,
  },
  tag: {
    color: "#FF5E00",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
    marginBottom: 8,
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.5,
    fontWeight: "700",
    maxWidth: 320,
  },
  gauge: {
    width: 199,
    height: 93,
    alignSelf: "center",
    marginTop: 32,
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
  },

  tabBar: {
    flexDirection: "row",
    marginBottom: 24,
    padding: 6,
    borderRadius: 80,
    backgroundColor: "#E8E6E1",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.08)",
  },
  tabText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
    color: "#757575",
  },
  activeTabText: {
    color: "#383838",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E6E6E6",
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },

  cardLabel: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
    color: "#383838",
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: GRID_PADDING,
    marginTop: "auto",
  },
});
