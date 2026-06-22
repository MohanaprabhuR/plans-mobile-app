import * as LucideIcons from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { RiskItem } from "../constants/riskData";

// Convert kebab-case to PascalCase: 'dollar-sign' → 'DollarSign'
function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

export default function RiskCell({ item }: { item: RiskItem }) {
  const iconName = toPascalCase(item.icon) as keyof typeof LucideIcons;
  const IconComponent = LucideIcons[iconName] as React.ElementType;

  return (
    <View style={styles.cell}>
      <View style={styles.iconCircle}>
        {IconComponent && <IconComponent size={20} color="#E8863C" />}
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
