import { FontAwesome5 } from "@expo/vector-icons";

export type RiskStatus = "Covered" | "Uncovered";

export type RiskItem = {
  id: string;
  title: string;
  description: string;
  status: RiskStatus;
};

export type RiskCategory = {
  id: string;
  title: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  iconColor: string;
  iconBackground: string;
  risks: RiskItem[];
};

export const riskCategories: RiskCategory[] = [
  {
    id: "health",
    title: "Health Insurance",
    icon: "plus",
    iconColor: "#F9B233",
    iconBackground: "#FFFBEB",
    risks: [
      {
        id: "hospitalization",
        title: "Hospitalization",
        description: "Hospital expenses may not be covered.",
        status: "Covered",
      },
      {
        id: "outpatient",
        title: "Outpatient Services",
        description: "Doctor visits and medicines not covered",
        status: "Covered",
      },
      {
        id: "emergency",
        title: "Emergency Care",
        description: "Unexpected emergencies can be costly",
        status: "Uncovered",
      },
      {
        id: "preventive",
        title: "Preventive Health Check",
        description: "Regular screenings help detect issues",
        status: "Uncovered",
      },
      {
        id: "critical",
        title: "Critical Illness",
        description: "Major illness can cause financial burden",
        status: "Uncovered",
      },
    ],
  },
  {
    id: "auto",
    title: "Auto Insurance",
    icon: "car",
    iconColor: "#1F9D55",
    iconBackground: "#ECFDF5",
    risks: [
      {
        id: "collision",
        title: "Collision Damage",
        description: "Repair costs after an accident",
        status: "Covered",
      },
      {
        id: "third-party",
        title: "Third-Party Liability",
        description: "Damage caused to others' property",
        status: "Covered",
      },
      {
        id: "theft",
        title: "Vehicle Theft",
        description: "Total loss due to stolen vehicle",
        status: "Covered",
      },
      {
        id: "natural-damage",
        title: "Natural Calamity Damage",
        description: "Floods and storms can damage your car",
        status: "Uncovered",
      },
    ],
  },
  {
    id: "life",
    title: "Life Insurance",
    icon: "heart",
    iconColor: "#EC4899",
    iconBackground: "#FFF2F3",
    risks: [
      {
        id: "income-loss",
        title: "Income Replacement",
        description: "Family income protection if you pass away",
        status: "Covered",
      },
      {
        id: "terminal",
        title: "Terminal Illness",
        description: "Financial support for terminal diagnosis",
        status: "Covered",
      },
      {
        id: "disability",
        title: "Permanent Disability",
        description: "Loss of income from disability",
        status: "Uncovered",
      },
      {
        id: "debt",
        title: "Outstanding Debt",
        description: "Loans passed on to your family",
        status: "Uncovered",
      },
    ],
  },
  {
    id: "home",
    title: "Home Insurance",
    icon: "home",
    iconColor: "#0EA5E9",
    iconBackground: "#F0F9FF",
    risks: [
      {
        id: "fire",
        title: "Fire Damage",
        description: "Structural damage from fire",
        status: "Covered",
      },
      {
        id: "burglary",
        title: "Burglary & Theft",
        description: "Loss of home contents",
        status: "Covered",
      },
      {
        id: "flood",
        title: "Flood Damage",
        description: "Water damage from natural flooding",
        status: "Covered",
      },
      {
        id: "earthquake",
        title: "Earthquake Damage",
        description: "Structural damage from earthquakes",
        status: "Uncovered",
      },
      {
        id: "liability",
        title: "Home Liability",
        description: "Injuries to visitors on your property",
        status: "Uncovered",
      },
    ],
  },
  {
    id: "pet",
    title: "Pet Insurance",
    icon: "paw",
    iconColor: "#A16207",
    iconBackground: "#FEFCE8",
    risks: [
      {
        id: "vet-visits",
        title: "Vet Visits",
        description: "Routine checkups and consultations",
        status: "Uncovered",
      },
      {
        id: "pet-surgery",
        title: "Surgery & Hospitalization",
        description: "Emergency treatments can be expensive",
        status: "Uncovered",
      },
      {
        id: "pet-medication",
        title: "Ongoing Medication",
        description: "Chronic condition treatment costs",
        status: "Uncovered",
      },
    ],
  },
  {
    id: "travel",
    title: "Travel Insurance",
    icon: "plane",
    iconColor: "#2563EB",
    iconBackground: "#EFF6FF",
    risks: [
      {
        id: "trip-cancellation",
        title: "Trip Cancellation",
        description: "Non-refundable booking losses",
        status: "Uncovered",
      },
      {
        id: "medical-abroad",
        title: "Medical Emergency Abroad",
        description: "Overseas treatment can be very costly",
        status: "Uncovered",
      },
      {
        id: "lost-baggage",
        title: "Lost Baggage",
        description: "Loss of belongings while travelling",
        status: "Uncovered",
      },
    ],
  },
];

export const totalRiskCount = riskCategories.reduce(
  (sum, category) => sum + category.risks.length,
  0,
);

export const coveredRiskCount = riskCategories.reduce(
  (sum, category) =>
    sum + category.risks.filter((risk) => risk.status === "Covered").length,
  0,
);

export const coverageScore = Math.round(
  (coveredRiskCount / totalRiskCount) * 100,
);

export type CoverageScoreBand = {
  label: string;
  color: string;
};

export function getCoverageScoreBand(score: number): CoverageScoreBand {
  if (score >= 70) return { label: "EXCELLENT", color: "#16A34A" };
  if (score >= 40) return { label: "GOOD", color: "#F9B233" };
  return { label: "LOW", color: "#DC2626" };
}
