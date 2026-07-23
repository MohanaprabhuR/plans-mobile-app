import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const NewAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const isFilled = useMemo(() => {
    return (
      email.trim() !== "" && password.trim() !== "" && mobile.trim() !== ""
    );
  }, [email, password, mobile]);
  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => router.back()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Create a New Account</Text>
        <View style={styles.formgroup}>
          <View>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              autoFocus
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              returnKeyType="done"
              placeholder="Enter Email"
              placeholderTextColor="#999999"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              keyboardType="default"
              returnKeyType="done"
              placeholder="Enter Password"
              placeholderTextColor="#999999"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              autoCapitalize="none"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              returnKeyType="done"
              placeholder="Enter Mobile Number"
              placeholderTextColor="#999999"
              style={styles.input}
            />
          </View>
        </View>
        <Button
          label="Continue"
          theme="primary"
          disabled={!isFilled}
          style={{ marginTop: 16, opacity: isFilled ? 1 : 0.6 }}
          onPress={() => router.push("/createAccount/verify-otp")}
        />
      </View>
    </ScreenLayout>
  );
};

export default NewAccount;

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
    paddingBottom: 32,
    width: "100%",
    maxWidth: 285,
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    borderRadius: 16,
    color: "#383838",
    fontSize: 15,
    fontWeight: "400",
  },
  formgroup: {
    width: "100%",
    flexDirection: "column",
    gap: 24,
  },
});
