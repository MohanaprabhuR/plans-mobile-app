import BackButton from "@/components/BackButton";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      const enteredOtp = updatedOtp.join("");

      // Example valid OTP
      if (enteredOtp === "123456") {
        setTimeout(() => {
          router.push("/createAccount/profile");
        }, 300);
      } else {
        Alert.alert("Invalid OTP");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }
  };
  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => router.back()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Your Mobile</Text>
        <Text style={styles.subtitle}>
          Enter the SMS verification code we sent to the number{" "}
          <Text style={styles.phoneNumber}>9940292234</Text>
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              value={digit}
              autoCapitalize="none"
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={index === 0}
              style={[styles.otpInput, digit && styles.activeOtpInput]}
            />
          ))}
        </View>

        <Pressable onPress={() => Alert.alert("Resend OTP")}>
          {({ pressed }) => (
            <Text
              style={[
                styles.resendText,
                {
                  color: pressed ? "#FF5E00" : "#383838",
                },
              ]}
            >
              Resend OTP
            </Text>
          )}
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    padding: 16,
  },
  backButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 44,
    height: 44,
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 38,
    letterSpacing: -0.5,
    fontWeight: "700",
    paddingTop: 16,
    paddingBottom: 12,
    width: "100%",
    maxWidth: 285,
  },
  subtitle: {
    color: "#555555",
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: "400",
    width: "100%",
    maxWidth: 285,
  },
  phoneNumber: {
    color: "#383838",
    fontWeight: "700",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    paddingTop: 32,
    paddingBottom: 24,
  },

  otpInput: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    color: "#383838",
  },

  activeOtpInput: {
    borderColor: "#FF5E00",
  },
  resendText: {
    color: "#383838",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
