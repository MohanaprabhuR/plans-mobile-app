import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label: string;
  theme?: "primary";
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  label,
  theme,
  backgroundColor = "#FF5E00",
  textColor = "#FFFFFF",
  disabled = false,
  onPress,
  style,
}: Props) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          {
            backgroundColor: disabled ? "#F7C9AE" : backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.buttonLabel,
            {
              color: textColor,
              opacity: disabled ? 0.8 : 1,
            },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 58,
    borderRadius: 46,
  },
  shadow: {
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.08)",
  },
  button: {
    flex: 1,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 24,
  },
});
