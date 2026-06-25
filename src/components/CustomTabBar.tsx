import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

const TAB_BAR_HEIGHT = 64;
const FAB_SIZE = 58;
const NOTCH_RADIUS = 36;
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

function TabBarBackground({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const centerX = width / 2;
  const notchStart = centerX - NOTCH_RADIUS - 14;
  const notchEnd = centerX + NOTCH_RADIUS + 14;

  const path = `
    M 0 ${height}
    L 0 0
    L ${notchStart} 0
    C ${centerX - NOTCH_RADIUS - 4} 0 ${centerX - NOTCH_RADIUS} 26 ${centerX} 28
    C ${centerX + NOTCH_RADIUS} 26 ${centerX + NOTCH_RADIUS + 4} 0 ${notchEnd} 0
    L ${width} 0
    L ${width} ${height}
    Z
  `;

  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Path d={path} fill={TAB_BG} />
    </Svg>
  );
}

function CenterFab({
  focused,
  onPress,
  bottom,
}: {
  focused: boolean;
  onPress: () => void;
  bottom: number;
}) {
  return (
    <View style={[styles.fabWrapper, { bottom }]}>
      <Svg
        width={FAB_SIZE + 16}
        height={FAB_SIZE + 16}
        style={styles.fabRing}
        pointerEvents="none"
      >
        <Circle
          cx={(FAB_SIZE + 16) / 2}
          cy={(FAB_SIZE + 16) / 2}
          r={FAB_SIZE / 2 + 5}
          stroke="rgba(255, 94, 0, 0.35)"
          strokeWidth={2}
          strokeDasharray="4 4"
          fill="none"
        />
      </Svg>

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        style={styles.fabPressable}
      >
        <LinearGradient
          colors={["#FF7A29", "#FF5E00", "#E04E00"]}
          locations={[0, 0.55, 1]}
          style={styles.fab}
        >
          <Text style={styles.fabText}>0</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

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
    if (!route) return <View style={styles.tabSlot} />;

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

    if (!config) return <View style={styles.tabSlot} />;

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

  const fabRoute = state.routes.find((route) => route.name === "fab");
  const fabIndex = fabRoute ? state.routes.indexOf(fabRoute) : -1;
  const fabFocused = fabIndex === state.index;

  const onFabPress = () => {
    if (!fabRoute) return;

    const event = navigation.emit({
      type: "tabPress",
      target: fabRoute.key,
      canPreventDefault: true,
    });

    if (!fabFocused && !event.defaultPrevented) {
      navigation.navigate(fabRoute.name, fabRoute.params);
    }
  };

  return (
    <View style={[styles.container, { height: barHeight, width }]}>
      <TabBarBackground width={width} height={barHeight} />

      <View style={[styles.tabsRow, { paddingBottom: insets.bottom }]}>
        {renderTab("index")}
        {renderTab("policies")}
        <View style={styles.fabSlot} />
        {renderTab("coverage")}
        {renderTab("search")}
      </View>

      <CenterFab
        focused={fabFocused}
        onPress={onFabPress}
        bottom={insets.bottom + 18}
      />
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
  fabSlot: {
    width: FAB_SIZE + 24,
  },
  fabWrapper: {
    position: "absolute",
    alignSelf: "center",
    width: FAB_SIZE + 16,
    height: FAB_SIZE + 16,
    alignItems: "center",
    justifyContent: "center",
  },
  fabRing: {
    position: "absolute",
  },
  fabPressable: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    boxShadow: "0px 6px 16px 0px rgba(255, 94, 0, 0.35)",
  },
  fab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
});
