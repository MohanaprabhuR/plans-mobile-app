import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const ProfileAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const isFilled = useMemo(() => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      dateOfBirth.trim() !== ""
    );
  }, [firstName, lastName, dateOfBirth]);
  return (
    <ScreenLayout>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => router.back()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Please provide your details as they appear on your government ID
        </Text>
        <View style={styles.formgroup}>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              autoFocus
              autoCapitalize="none"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              returnKeyType="done"
              placeholder="First Name"
              placeholderTextColor="#999999"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              autoFocus
              autoCapitalize="none"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              returnKeyType="done"
              placeholder="Last Name"
              placeholderTextColor="#999999"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              autoFocus
              autoCapitalize="none"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              keyboardType="default"
              returnKeyType="done"
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#999999"
              style={styles.input}
            />
          </View>
        </View>
        <Text style={[styles.subtitle, styles.privacyText]}>
          By continuing, I agree to the{" "}
          <Text style={styles.highlight}>Terms of Service</Text> and{" "}
          <Text style={styles.highlight}>Privacy Policy</Text>.
        </Text>
        <Button
          label="Continue"
          theme="primary"
          disabled={!isFilled}
          style={{ marginTop: 0, opacity: isFilled ? 1 : 0.6 }}
          onPress={() => router.push("/createAccount/success")}
        />
      </View>
    </ScreenLayout>
  );
};

export default ProfileAccount;

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
  highlight: {
    color: "#383838",
    fontWeight: "700",
  },
  privacyText: {
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    width: "100%",
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 275,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
