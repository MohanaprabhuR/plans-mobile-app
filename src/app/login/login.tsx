import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import ScreenLayout from "@/components/ScreenLayout";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFilled = email.trim().length > 0 && password.trim().length > 0;

  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => router.back()} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>Enter Your Email or Mobile Number</Text>
            <TextInput
              autoFocus
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="Enter Your Email or Mobile Number"
              placeholderTextColor="#999999"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, email.length > 0 && styles.activeInput]}
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              keyboardType="default"
              returnKeyType="done"
              placeholder="Password"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, password.length > 0 && styles.activeInput]}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>
        <Pressable onPress={() => router.push("/login/reset-password")}>
          {({ pressed }) => (
            <Text
              style={[
                styles.resendText,
                {
                  color: pressed ? "#FF5E00" : "#383838",
                },
              ]}
            >
              I don't know my password
            </Text>
          )}
        </Pressable>
        <Button
          label="Continue"
          theme="primary"
          disabled={!isFilled}
          style={{
            marginTop: 32,
            opacity: isFilled ? 1 : 0.5,
          }}
          onPress={() => router.push("/welcome")}
        />
      </View>
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

  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 34,
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
    paddingBottom: 32,
  },

  formContainer: {
    gap: 24,
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    color: "#383838",
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: "600",
    paddingBottom: 8,
  },

  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    borderRadius: 16,
    color: "#383838",
    fontSize: 15,
    fontWeight: "400",
  },

  activeInput: {
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
