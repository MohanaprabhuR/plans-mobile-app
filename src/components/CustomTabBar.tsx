import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 64;
const ACTIVE_COLOR = "#FF5E00";
const INACTIVE_COLOR = "#383838";
const TAB_BG = "#FAF8F4";

type TabBarProps = {
  state: {
    index: number;
    routes: { key: string; name: string; params?: object }[];
  };
  descriptors: Record<
    string,
    {
      options: {
        href?: string | null;
        tabBarAccessibilityLabel?: string;
      };
    }
  >;
  navigation: {
    emit: (event: {
      type: "tabPress" | "tabLongPress";
      target: string;
      canPreventDefault?: boolean;
    }) => { defaultPrevented: boolean };
    navigate: (name: string, params?: object) => void;
  };
};

type TabConfig = {
  label: string;
  icon: (color: string, focused: boolean) => ReactNode;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: {
    label: "Home",
    icon: (color) => <Feather name="home" size={22} color={color} />,
  },
  policies: {
    label: "Policies",
    icon: (color) => <Feather name="file-text" size={22} color={color} />,
  },
  coverage: {
    label: "Coverage",
    icon: (color) => (
      <MaterialCommunityIcons name="shield-check" size={22} color={color} />
    ),
  },
  search: {
    label: "Search",
    icon: (color) => <Feather name="search" size={22} color={color} />,
  },
};

const TAB_ORDER = ["index", "policies", "coverage", "search"];

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const insets = useSafeAreaInsets();
  const width = Dimensions.get("window").width;
  const barHeight = TAB_BAR_HEIGHT + insets.bottom;

  const renderTab = (routeName: string) => {
    const route = state.routes.find((item) => item.name === routeName);
    if (!route) return <View key={routeName} style={styles.tabSlot} />;

    const routeIndex = state.routes.indexOf(route);
    const { options } = descriptors[route.key];
    if (options.href === null) return null;

    const isFocused = state.index === routeIndex;
    const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;
    const config = TAB_CONFIG[routeName];

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    if (!config) return <View key={route.key} style={styles.tabSlot} />;

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabSlot}
      >
        {config.icon(color, isFocused)}
        <Text style={[styles.tabLabel, { color }]}>{config.label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { height: barHeight, width }]}>
      <View style={[styles.background, { height: barHeight }]} />

      <View style={[styles.tabsRow, { paddingBottom: insets.bottom }]}>
        {TAB_ORDER.map((routeName) => renderTab(routeName))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: TAB_BG,
  },
  tabsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  tabSlot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 52,
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
  },
});
