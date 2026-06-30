import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

type BackButtonProps = {
  onPress: () => void;
  accessibilityLabel?: string;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
};

export default function BackButton({
  onPress,
  accessibilityLabel = "Go back",
  iconSize = 8,
  iconColor = "#383838",
  style,
}: BackButtonProps) {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <LeftArrowIcon size={iconSize} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
