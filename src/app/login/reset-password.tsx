import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Button from "@/components/Button";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import ScreenLayout from "@/components/ScreenLayout";

type Step = "email" | "otp" | "password";

const OTP_LENGTH = 6;

export default function LoginScreen() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const isEmailFilled = email.trim().length > 0;
  const isOtpFilled = otp.every((digit) => digit.length === 1);
  const isPasswordFilled = password.trim().length > 0;

  const description = useMemo(() => {
    if (step === "otp") {
      return "We sent a verification code to your registered email or mobile number. Please enter the code below to continue.";
    }
    if (step === "password") {
      return "Please enter your new password and make sure it is sufficiently strong. This protects your account from unauthorized access.";
    }
    return null;
  }, [step]);

  const handleOtpChange = (value: string, inputIndex: number) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[inputIndex] = sanitizedValue;
    setOtp(nextOtp);

    if (sanitizedValue && inputIndex < OTP_LENGTH - 1) {
      otpRefs.current[inputIndex + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (
    key: string,
    inputIndex: number,
    currentValue: string,
  ) => {
    if (key === "Backspace" && !currentValue && inputIndex > 0) {
      otpRefs.current[inputIndex - 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (step === "email") {
      setStep("otp");
      return;
    }
    if (step === "otp") {
      setStep("password");
      return;
    }
    setShowSuccess(true);
  };

  const canContinue =
    step === "email"
      ? isEmailFilled
      : step === "otp"
        ? isOtpFilled
        : isPasswordFilled;

  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <LeftArrowIcon color="#383838" />
        </Pressable>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          {step === "password" ? "Set New Password" : "Reset Password"}
        </Text>

        {description ? <Text style={styles.subtitle}>{description}</Text> : null}

        {step === "email" ? (
          <View>
            <Text style={styles.label}>Enter Your Email</Text>
            <View style={[styles.inputWrapper, email.length > 0 && styles.activeInput]}>
              <TextInput
                autoFocus
                keyboardType="email-address"
                returnKeyType="done"
                placeholder="Enter Your Email"
                placeholderTextColor="#999999"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <Feather name="mail" size={18} color="#9CA3AF" />
            </View>
          </View>
        ) : null}

        {step === "otp" ? (
          <View>
            <Text style={styles.label}>Enter OTP</Text>
            <View style={styles.otpRow}>
              {otp.map((digit, inputIndex) => (
                <TextInput
                  key={inputIndex}
                  ref={(ref) => {
                    otpRefs.current[inputIndex] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, inputIndex)}
                  onKeyPress={({ nativeEvent }) =>
                    handleOtpKeyPress(nativeEvent.key, inputIndex, digit)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  style={[styles.otpInput, digit && styles.activeInput]}
                />
              ))}
            </View>
          </View>
        ) : null}

        {step === "password" ? (
          <View>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                password.length > 0 && styles.activeInput,
              ]}
            >
              <TextInput
                autoFocus
                secureTextEntry
                returnKeyType="done"
                placeholder="Password"
                placeholderTextColor="#999999"
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <Ionicons name="eye-off-outline" size={18} color="#9CA3AF" />
            </View>
          </View>
        ) : null}

        <Button
          label="Continue"
          theme="primary"
          disabled={!canContinue}
          style={styles.button}
          onPress={handleContinue}
        />
      </View>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowSuccess(false)}
          />
          <View style={styles.modalCard}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Success</Text>
            <Text style={styles.successSubtitle}>
              Your new password has been successfully updated.
            </Text>
            <Button
              label="Login"
              theme="primary"
              style={styles.modalButton}
              onPress={() => {
                setShowSuccess(false);
                router.push("/login/login");
              }}
            />
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    padding: 16,
  },

  backButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  backButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#383838",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    fontWeight: "700",
    paddingTop: 16,
    paddingBottom: 32,
    width: "100%",
    maxWidth: 285,
  },
  subtitle: {
    color: "#555555",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
    paddingBottom: 24,
    width: "100%",
    maxWidth: 320,
  },

  label: {
    fontSize: 15,
    color: "#383838",
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: "600",
    paddingBottom: 8,
  },
  inputWrapper: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    borderRadius: 16,
    color: "#383838",
    fontSize: 15,
    fontWeight: "400",
  },
  input: {
    flex: 1,
    color: "#383838",
    fontSize: 15,
    fontWeight: "400",
  },

  activeInput: {
    borderColor: "#FF5E00",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  otpInput: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    color: "#383838",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    marginTop: 24,
    opacity: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(56, 56, 56, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  successTitle: {
    color: "#383838",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  successSubtitle: {
    color: "#555555",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 20,
    maxWidth: 240,
  },
  modalButton: {
    width: "100%",
  },
});
