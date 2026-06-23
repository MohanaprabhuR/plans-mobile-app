import { Feather } from "@expo/vector-icons";
import { Href } from "expo-router";
import { ImageSourcePropType } from "react-native";

const healthIcon = require("../../assets/images/health-icon.png");
const autoIcon = require("../../assets/images/auto-icon.png");
const homeIcon = require("../../assets/images/home-icon.png");
const careLogo = require("../../assets/images/care-logo.png");
const autoLogo = require("../../assets/images/sa-auto.png");
const homeLogo = require("../../assets/images/smart-home.png");

export type PolicyStat = {
  icon: keyof typeof Feather.glyphMap;
  value: string;
};

export type PolicyAction = {
  key: "view" | "claims" | "renewal";
  icon: keyof typeof Feather.glyphMap;
  label: string;
  href: Href;
};

export type PolicyCardData = {
  id: string;
  title: string;
  provider: string;
  icon: ImageSourcePropType;
  logo?: ImageSourcePropType;
  brandLabel?: string;
  bgColor: string;
  stats: PolicyStat[];
  riskCovered: number;
  expiry: string;
  status: "active" | "inactive";
  actions: PolicyAction[];
};

function createPolicyActions(policyId: string): PolicyAction[] {
  return [
    {
      key: "view",
      icon: "eye",
      label: "View",
      href: {
        pathname: "/(tabs)/policies",
        params: { policyId },
      },
    },
    {
      key: "claims",
      icon: "file-text",
      label: "Claims",
      href: {
        pathname: "/(tabs)/policies",
        params: { policyId, section: "claims" },
      },
    },
    {
      key: "renewal",
      icon: "refresh-cw",
      label: "Renewal",
      href: {
        pathname: "/(tabs)/coverage",
        params: { policyId },
      },
    },
  ];
}

export const policyCards: PolicyCardData[] = [
  {
    id: "health",
    title: "Health Insurance",
    provider: "Care Health",
    icon: healthIcon,
    logo: careLogo,
    bgColor: "#F8E108",
    stats: [
      { icon: "shield", value: "$5500" },
      { icon: "credit-card", value: "$250/Year" },
      { icon: "users", value: "3 Members" },
    ],
    riskCovered: 8,
    expiry: "06/2026",
    status: "active",
    actions: createPolicyActions("health"),
  },
  {
    id: "auto",
    title: "Auto Insurance",
    provider: "Safe Auto",
    logo: autoLogo,
    icon: autoIcon,
    brandLabel: "SAFEAUTO",
    bgColor: "#83F5CC",
    stats: [
      { icon: "shield", value: "$3500" },
      { icon: "credit-card", value: "$150/Year" },
      { icon: "truck", value: "Toyota Prius" },
    ],
    riskCovered: 4,
    expiry: "06/2026",
    status: "active",
    actions: createPolicyActions("auto"),
  },
  {
    id: "home",
    title: "Home Insurance",
    provider: "Smart Home",
    icon: homeIcon,
    logo: homeLogo,
    brandLabel: "Smart Home",
    bgColor: "#98E2F4",
    stats: [
      { icon: "shield", value: "$3500" },
      { icon: "credit-card", value: "$350/Year" },
      { icon: "home", value: "Built 2015" },
    ],
    riskCovered: 6,
    expiry: "06/2026",
    status: "active",
    actions: createPolicyActions("home"),
  },
  {
    id: "life",
    title: "Life Insurance",
    provider: "FamilyCare",
    icon: require("../../assets/images/family.png"),
    brandLabel: "FamilyCare",
    bgColor: "#E8DEFF",
    stats: [
      { icon: "shield", value: "$50000" },
      { icon: "credit-card", value: "$600/Year" },
      { icon: "users", value: "4 Members" },
    ],
    riskCovered: 4,
    expiry: "12/2025",
    status: "inactive",
    actions: createPolicyActions("life"),
  },
];

export const activePolicyCards = policyCards.filter(
  (card) => card.status === "active",
);
