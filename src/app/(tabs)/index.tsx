import HospitalBottomSheet from "@/components/HospitalBottomSheet";
import PolicyCard from "@/components/PolicyCard";
import ScreenLayout from "@/components/ScreenLayout";
import {
  blacklistedHospitals,
  networkHospitals,
} from "@/constants/hospitalData";
import { activePolicyCards } from "@/constants/policyData";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTENT_PADDING = 16;
const PAGINATION_WIDTH = 14;
const SLIDE_GAP = 8;
const CARD_WIDTH = SCREEN_WIDTH - CONTENT_PADDING * 1 - PAGINATION_WIDTH - 8;
const CARD_HEIGHT = 190;
const ACTIONS_HEIGHT = 88;
const SLIDE_HEIGHT = CARD_HEIGHT + 16 + ACTIONS_HEIGHT;

function PolicySlide({ item }: { item: (typeof activePolicyCards)[number] }) {
  return (
    <View style={styles.slide}>
      <PolicyCard item={item} style={styles.carouselCard} />
      <View style={styles.actionsRow}>
        {item.actions.map((action) => (
          <Pressable
            key={action.key}
            style={styles.actionButton}
            onPress={() => router.push(action.href)}
          >
            <Feather name={action.icon} size={20} color="#383838" />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hospitalSheet, setHospitalSheet] = useState<
    "network" | "blacklisted" | null
  >(null);
  const carouselRef = useRef<ICarouselInstance>(null);

  const goToSlide = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
    setActiveIndex(index);
  };

  return (
    <ScreenLayout style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: "https://mockmind-api.uifaces.co/content/human/80.jpg",
              }}
              style={styles.avatarImage}
            />
          </View>
          <Feather name="chevron-down" size={16} color="#383838" />
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton}>
            <Feather name="bell" size={20} color="#383838" />
          </Pressable>
          <Pressable style={styles.addButton}>
            <Feather name="plus" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <View style={styles.greeting}>
        <Text style={styles.greetingName}>Hi Mohanaprabhu</Text>
        <Text style={styles.greetingSub}>Good Morning</Text>
      </View>

      <View style={styles.sliderSection}>
        <View style={styles.sliderRow}>
          <Carousel
            ref={carouselRef}
            width={CARD_WIDTH}
            height={SLIDE_HEIGHT}
            data={activePolicyCards}
            loop={true}
            onSnapToItem={setActiveIndex}
            renderItem={({ item }) => <PolicySlide item={item} />}
          />

          <View style={styles.pagination}>
            {activePolicyCards.map((card, index) => (
              <Pressable key={card.id} onPress={() => goToSlide(index)}>
                <View
                  style={[
                    styles.dot,
                    index === activeIndex
                      ? styles.dotActive
                      : styles.dotInactive,
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.riskCardPressable}>
        <LinearGradient
          colors={["#383838", "#707070"]}
          locations={[0.15, 0.65]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.riskCard}
        >
          <View style={styles.riskScoreBadge}>
            <Text style={styles.riskScoreText}>35</Text>
          </View>
          <View style={styles.riskTextWrap}>
            <Text style={styles.riskTitle}>Risk Overview</Text>
            <Text style={styles.riskSubtitle}>Medium</Text>
          </View>
          <Feather name="arrow-right" size={20} color="#FFFFFF" />
        </LinearGradient>
      </View>
      <View style={styles.quickActionsSection}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionsCard}>
          <Pressable
            style={styles.quickActionsCardItem}
            onPress={() => setHospitalSheet("network")}
          >
            <Feather name="plus-circle" size={24} color="#383838" />
            <Text style={styles.quickActionsCardItemTitle}>
              Network Hospitals
            </Text>
          </Pressable>
          <Pressable
            style={styles.quickActionsCardItem}
            onPress={() => setHospitalSheet("blacklisted")}
          >
            <Feather name="minus-circle" size={24} color="#383838" />
            <Text style={styles.quickActionsCardItemTitle}>
              Blacklisted Hospitals
            </Text>
          </Pressable>
          <Pressable style={styles.quickActionsCardItem}>
            <Feather name="message-square" size={24} color="#383838" />
            <Text style={styles.quickActionsCardItemTitle}>
              AI Policy Assistant
            </Text>
          </Pressable>
        </View>
      </View>

      <HospitalBottomSheet
        visible={hospitalSheet === "network"}
        title="Network Hospitals"
        hospitals={networkHospitals}
        onClose={() => setHospitalSheet(null)}
      />
      <HospitalBottomSheet
        visible={hospitalSheet === "blacklisted"}
        title="Blacklisted Hospitals"
        hospitals={blacklistedHospitals}
        onClose={() => setHospitalSheet(null)}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F7F3",
  },
  content: {
    paddingHorizontal: CONTENT_PADDING,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#E8E6E1",
    overflow: "hidden",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    objectFit: "cover",
  },
  greeting: {
    marginVertical: 16,
  },
  greetingName: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.1,
    fontWeight: "700",
    color: "#383838",
  },
  greetingSub: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555555",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#FF5E00",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderSection: {
    gap: 16,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 0,
  },
  slide: {
    width: CARD_WIDTH,
    paddingRight: SLIDE_GAP,
    gap: 16,
  },
  carouselCard: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH - SLIDE_GAP,
  },
  pagination: {
    width: PAGINATION_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: CARD_HEIGHT,
  },
  dot: {
    borderRadius: 4,
  },
  dotActive: {
    width: 6,
    height: 18,
    backgroundColor: "#555555",
  },
  dotInactive: {
    width: 6,
    height: 6,
    backgroundColor: "#D4D2CD",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    boxShadow: "0px 2px 4px 0px rgba(56, 56, 56, 0.08)",
    width: 68,
    height: 64,
  },
  actionLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: "#383838",
    letterSpacing: -0.1,
  },
  riskCardPressable: {
    marginTop: 32,
    borderRadius: 20,
    overflow: "hidden",
  },
  riskCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 82,
  },
  riskScoreBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  riskScoreText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  riskTextWrap: {
    flex: 1,
    gap: 2,
  },
  riskTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  riskSubtitle: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.75)",
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    marginTop: -62,
  },
  quickActionsTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
  },
  quickActionsCard: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },
  quickActionsCardItem: {
    width: 101,
    height: 96,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 22,
    gap: 8,
  },
  quickActionsCardItemTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: "#383838",
    textAlign: "center",
  },
});
