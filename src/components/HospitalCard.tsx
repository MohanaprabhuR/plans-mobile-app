import { Feather } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { Hospital } from "@/constants/hospitalData";

type HospitalCardProps = {
  hospital: Hospital;
};

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const handleDirections = () => {
    const query = encodeURIComponent(
      `${hospital.name}, ${hospital.city}, ${hospital.state}`,
    );
    Linking.openURL(`https://maps.google.com/?q=${query}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.info}>
          <Text style={styles.name}>{hospital.name}</Text>
          <Text style={styles.location}>
            {hospital.city}, {hospital.state}
          </Text>
        </View>
        <View style={styles.ratingBadge}>
          <Feather name="star" size={12} color="#FF5E00" />
          <Text style={styles.ratingText}>{hospital.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.distanceRow}>
          <Feather name="navigation" size={14} color="#757575" />
          <Text style={styles.distanceText}>{hospital.distance} Miles</Text>
        </View>
        <Pressable style={styles.directionsButton} onPress={handleDirections}>
          <Text style={styles.directionsText}>Get Directions</Text>
          <Feather name="arrow-up-right" size={14} color="#FF5E00" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDEDED",
    padding: 16,
    gap: 16,
    boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.06)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  location: {
    fontSize: 13,
    lineHeight: 16,
    color: "#757575",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF3EB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#383838",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  distanceText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#757575",
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  directionsText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#FF5E00",
  },
});
