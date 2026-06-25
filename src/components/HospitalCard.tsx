import { Feather } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { Hospital } from "@/constants/hospitalData";

type HospitalCardProps = {
  hospital: Hospital;
};

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const handleDirections = () => {
    const query = encodeURIComponent(
      `${hospital.name}, ${hospital.address}`,
    );
    Linking.openURL(`https://maps.google.com/?q=${query}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${hospital.phone.replace(/[^\d+]/g, "")}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{hospital.name}</Text>
        <View style={styles.ratingRow}>
          <Feather name="star" size={14} color="#FF5E00" />
          <Text style={styles.ratingText}>{hospital.rating.toFixed(1)}</Text>
        </View>
      </View>

      <Text style={styles.distance}>{hospital.distance} Miles Away</Text>
      <Text style={styles.address}>{hospital.address}</Text>

      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={handleCall}>
          <Feather name="phone" size={16} color="#383838" />
          <Text style={styles.actionText}>Call Us</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleDirections}>
          <Feather name="navigation" size={16} color="#383838" />
          <Text style={styles.actionText}>Get Directions</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EDEDED",
    padding: 16,
    gap: 8,
    boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.06)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#383838",
  },
  distance: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    color: "#383838",
  },
  address: {
    fontSize: 13,
    lineHeight: 18,
    color: "#757575",
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: "#383838",
  },
});
