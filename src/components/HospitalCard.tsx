import { Feather, Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { Hospital } from "@/constants/hospitalData";

type HospitalCardProps = {
  hospital: Hospital;
};

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const handleDirections = () => {
    const query = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
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
          <Ionicons name="star" size={12} color="#FF5E00" />
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
    borderRadius: 32,
    padding: 16,
    gap: 8,
    boxShadow: "0px 20px -10px 0px rgba(56, 56, 56, 0.15)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
    letterSpacing: -0.5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
  },
  ratingText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
    color: "#FF5E00",
  },
  distance: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    color: "#555555",
  },
  address: {
    fontSize: 14,
    lineHeight: 24,
    color: "#555555",
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 10,
    boxShadow: "0px 1px 2px 0px rgba(56, 56, 56, 0.09)",
  },
  actionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: "#383838",
  },
});
