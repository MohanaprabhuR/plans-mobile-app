import { FontAwesome5 } from "@expo/vector-icons";

export type RiskGroup = "personal" | "asset";

export type CoverageGapCategory = {
  id: string;
  group: RiskGroup;
  title: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  iconBackground: string;
  headerBackground: string;
  gaps: string[];
  coveredBy: string;
  brandLabel: string;
  brandColor: string;
  suggestion: string;
};

export const coverageGapCategories: CoverageGapCategory[] = [
  {
    id: "health",
    group: "personal",
    title: "Health Insurance",
    icon: "plus",
    iconBackground: "#F9B233",
    headerBackground: "#FDF6DF",
    gaps: ["Cosmetic Surgery", "Vision Care", "Dental Care"],
    coveredBy: "Care Health Supreme",
    brandLabel: "care",
    brandColor: "#2B5DA7",
    suggestion:
      "Upgrade your plan to add on these cosmetic, vision and dental.",
  },
  {
    id: "life",
    group: "personal",
    title: "Life Insurance",
    icon: "heart",
    iconBackground: "#EF4444",
    headerBackground: "#FDEBEA",
    gaps: ["Accidental Death", "Critical Illness"],
    coveredBy: "FamilyCare Term Plan",
    brandLabel: "FamilyCare",
    brandColor: "#7C3AED",
    suggestion:
      "Add accidental death and critical illness riders to your term plan.",
  },
  {
    id: "home",
    group: "asset",
    title: "Home Insurance",
    icon: "home",
    iconBackground: "#0EA5E9",
    headerBackground: "#E3F4FB",
    gaps: ["Earthquake", "Windstorm"],
    coveredBy: "Smart Home",
    brandLabel: "Smart Home",
    brandColor: "#0B74C1",
    suggestion: "Add earthquake and windstorm cover to protect your home.",
  },
  {
    id: "auto",
    group: "asset",
    title: "Auto Insurance",
    icon: "car",
    iconBackground: "#22C55E",
    headerBackground: "#E5F8ED",
    gaps: ["Engine Protection", "Roadside Assistance"],
    coveredBy: "SafeAuto",
    brandLabel: "SAFEAUTO",
    brandColor: "#1F2937",
    suggestion:
      "Add engine protection and roadside assistance to your auto policy.",
  },
];
