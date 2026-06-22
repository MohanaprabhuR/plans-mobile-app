import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF5E00",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="policies"
        options={{
          title: "Policies",
          tabBarIcon: ({ color }) => (
            <Feather name="file-text" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="fab"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.fab}>
              <Text style={styles.fabText}>0</Text>
            </View>
          ),
          tabBarButton: (props) => (
            <Pressable {...props} style={styles.fabButton} />
          ),
        }}
      />
      <Tabs.Screen
        name="coverage"
        options={{
          title: "Coverage",
          tabBarIcon: ({ color }) => (
            <Feather name="shield" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    height: 80,
    paddingTop: 8,
    paddingBottom: 14,
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  fabButton: {
    top: -18,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF5E00",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5E00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
