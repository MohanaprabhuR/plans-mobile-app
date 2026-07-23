import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingViewProps = {
  error?: string | null;
};

export default function LoadingView({ error }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ActivityIndicator size="small" color="#FF5E00" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
  },
});
