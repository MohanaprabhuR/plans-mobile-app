import { ImageSourcePropType } from "react-native";

import { PolicyCategory } from "@/constants/categoryColors";

const healthIcon = require("../../assets/images/health-icon.png");
const autoIcon = require("../../assets/images/auto-icon.png");
const homeIcon = require("../../assets/images/home-icon.png");
const lifeIcon = require("../../assets/images/life-icon.png");
const careLogo = require("../../assets/images/care-logo.png");
const autoLogo = require("../../assets/images/sa-auto.png");

export type PremiumCategoryRow = {
  category: PolicyCategory;
  label: string;
  count: number;
  yearlyPremium: number;
  icon: ImageSourcePropType;
};

export const premiumOverview = {
  totalYearlyPremium: 10000,
  categories: [
    {
      category: "health",
      label: "Health",
      count: 2,
      yearlyPremium: 3000,
      icon: healthIcon,
    },
    {
      category: "auto",
      label: "Auto",
      count: 1,
      yearlyPremium: 2800,
      icon: autoIcon,
    },
    {
      category: "life",
      label: "Life",
      count: 3,
      yearlyPremium: 600,
      icon: lifeIcon,
    },
    {
      category: "home",
      label: "Home",
      count: 1,
      yearlyPremium: 3600,
      icon: homeIcon,
    },
  ] satisfies PremiumCategoryRow[],
};

export type ClaimStatus = "Pending" | "Approved" | "Rejected";

export type ClaimCardData = {
  id: string;
  category: PolicyCategory;
  claimId: string;
  title: string;
  amount: number;
  date: string;
  status: ClaimStatus;
  logo: ImageSourcePropType;
  logoBackgroundColor: string;
};

export const recentClaims: ClaimCardData[] = [
  {
    id: "claim-1",
    category: "health",
    claimId: "CLM-1020",
    title: "Treatment Surgery Expenses",
    amount: 250,
    date: "12 Oct",
    status: "Pending",
    logo: careLogo,
    logoBackgroundColor: "#2DBCB0",
  },
  {
    id: "claim-2",
    category: "auto",
    claimId: "CLM-1021",
    title: "Accidental Damage Repair",
    amount: 120,
    date: "08 Oct",
    status: "Pending",
    logo: autoLogo,
    logoBackgroundColor: "#1E3A5F",
  },
];
