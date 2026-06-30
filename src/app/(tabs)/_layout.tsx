import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";

type CustomTabBarProps = ComponentProps<typeof CustomTabBar>;

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <CustomTabBar
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation as CustomTabBarProps["navigation"]}
        />
      )}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FAF8F4",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="policies" options={{ title: "Policies" }} />
      <Tabs.Screen name="coverage" options={{ title: "Coverage" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen
        name="about"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
