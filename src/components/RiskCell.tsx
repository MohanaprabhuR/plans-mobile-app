import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { RiskItem } from "../constants/riskData";

// Maps riskData icon names to MaterialCommunityIcons glyphs.
const ICON_MAP: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  heart: "heart",
  activity: "run",
  "dollar-sign": "currency-usd",
  coffee: "coffee",
  users: "account-group",
  map: "map",
  "piggy-bank": "piggy-bank",
  "credit-card": "credit-card",
  accessibility: "wheelchair-accessibility",
  car: "car",
  home: "home",
  smartphone: "cellphone",
  flame: "fire",
  droplets: "water",
  lock: "lock",
  gem: "diamond-stone",
  wrench: "wrench",
  shield: "shield",
};

export default function RiskCell({ item }: { item: RiskItem }) {
  const iconName = ICON_MAP[item.icon] ?? "help-circle";

  return (
    <View style={styles.cell}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={iconName} size={20} color="#E8863C" />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    margin: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    backgroundColor: "#FAFAFA",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    color: "#444",
    fontWeight: "500",
    textAlign: "center",
  },
});
