import ScreenLayout from "@/components/ScreenLayout";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const suceessShield = require("../../assets/images/success-shield.png");
const IMAGE_WIDTH = 311;

const DOT_SIZE = 8;
const ACTIVE_DOT_WIDTH = 16;
const DOT_SLOT_WIDTH = ACTIVE_DOT_WIDTH;
const DOT_GAP = 2;

const slides = [
  {
    id: 1,
    title: "Medical Emergencies Can Happen Anytime",
    image: require("../../assets/images/health.png"),
    category: "Health",
    amount: "$4.8K",
    description: "ICU + Surgery + Medicine",
    color: "#F9B233",
    cardlabel: "Hospital Bill",
    icon: "heartbeat" as const,
  },
  {
    id: 2,
    title: "Accidents Can Lead to Unexpected Expenses",
    image: require("../../assets/images/auto.png"),
    category: "Auto",
    amount: "$745",
    description: "Repairs + Body Damage",
    color: "#8B5CF6",
    cardlabel: "Unexpected Repair",
    icon: "car-crash" as const,
  },
  {
    id: 3,
    title: "Home Damage Can Cause Big Losses",
    image: require("../../assets/images/home.png"),
    category: "Home",
    amount: "$2.8K",
    description: "Roof + Interiors + Electrical",
    color: "#0EA5E9",
    cardlabel: "Estimated Loss",
    icon: "home" as const,
  },
  {
    id: 4,
    title: "Income Loss Affect Your Family's Future",
    image: require("../../assets/images/family.png"),
    category: "Family",
    amount: "$820",
    description: "EMI + School Fees",
    color: "#EC4899",
    cardlabel: "Monthly Expenses",
    icon: "users" as const,
  },
];

export default function RiskScreen() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const carouselRef = useRef<ICarouselInstance>(null);
  const isAnimatingRef = useRef(false);
  const isLastSlide = index === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setShowModal(true);
      return;
    }
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const nextIndex = index + 1;
    setIndex(nextIndex);
    carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
  };

  const handleContinue = () => {
    setShowModal(false);
    router.push("/risk-category");
  };

  const goToSlide = (slideIndex: number) => {
    if (slideIndex === index || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIndex(slideIndex);
    carouselRef.current?.scrollTo({ index: slideIndex, animated: true });
  };

  return (
    <ScreenLayout contentContainerStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.tag}>Life is Unpredictable</Text>
        <Text style={styles.title}>
          Understanding Risks is the First Step to Protection.
        </Text>
      </View>

      <View style={styles.carouselWrapper}>
        <Carousel
          ref={carouselRef}
          width={SCREEN_WIDTH}
          height={460}
          data={slides}
          loop={false}
          pagingEnabled
          scrollAnimationDuration={300}
          onSnapToItem={(snapIndex) => {
            isAnimatingRef.current = false;
            setIndex(snapIndex);
          }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.imageCard}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <BlurView intensity={30} tint="light" style={styles.amountCard}>
                  <Text style={styles.cardlabel}>{item.cardlabel}</Text>
                  <Text style={styles.amount}>{item.amount}</Text>
                  <Text style={styles.amountDescription}>
                    {item.description}
                  </Text>
                </BlurView>
                <View style={styles.badgeWrapper}>
                  <View style={[styles.badge, { backgroundColor: item.color }]}>
                    <FontAwesome5 name={item.icon} size={14} color="#FFF" />
                    <Text style={styles.badgeText}>{item.category}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <Pressable
            key={i}
            onPress={() => goToSlide(i)}
            style={styles.dotSlot}
            accessibilityLabel={`Go to slide ${i + 1}`}
            accessibilityRole="button"
            hitSlop={8}
          >
            <View style={[styles.dot, index === i && styles.activeDot]} />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </Pressable>

      <View style={styles.footer}>
        <FontAwesome5 name="info-circle" size={14} color="#383838" />
        <Text style={styles.footerText}>
          These are situations many people face.
        </Text>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowModal(false)}
            accessibilityLabel="Close modal"
          />
          <View style={styles.modalCard}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Risks are a Part of Life But You Can be Prepared
              </Text>
              <Text style={styles.modalSubtitle}>
                Let&apos;s check how prepared you are in key areas
              </Text>

              <View style={styles.shieldContainer}>
                <Image source={suceessShield} style={styles.shield} />
              </View>
            </View>

            <Text style={styles.modalNote}>
              This is not to scare you, it&apos;s to help you stay prepared.
            </Text>
            <View style={{ width: "100%", paddingHorizontal: 16 }}>
              <Pressable style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tag: {
    color: "#FF5E00",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
    marginBottom: 8,
  },
  title: {
    color: "#383838",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.5,
    fontWeight: "700",
    paddingBottom: 24,
  },
  carouselWrapper: {
    width: "100%",
    alignItems: "center",
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  imageCard: {
    width: IMAGE_WIDTH,
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: IMAGE_WIDTH,
    height: 360,
  },
  amountCard: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(56, 56, 56, 0.4)",
    padding: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardlabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  amount: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
  },
  amountDescription: {
    color: "#FFF",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
    fontWeight: "600",
  },
  badgeWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  badgeText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
  },
  cardTitle: {
    textAlign: "center",
    paddingTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#383838",
    lineHeight: 28,
    letterSpacing: -0.1,
    width: IMAGE_WIDTH,
    alignSelf: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: DOT_GAP,
    marginBottom: 24,
    alignSelf: "center",
  },
  dotSlot: {
    width: DOT_SLOT_WIDTH,
    height: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#D1D5DB",
  },
  activeDot: {
    width: ACTIVE_DOT_WIDTH,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#383838",
  },
  nextButton: {
    marginHorizontal: 16,
    backgroundColor: "#FF5E00",
    borderRadius: 30,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    padding: 8,
  },
  footerText: {
    color: "#383838",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    textAlign: "center",
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
    maxWidth: 343,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: "center",
  },
  modalContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    color: "#383838",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    color: "#555555",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
    maxWidth: 225,
  },
  shieldContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  shield: {
    width: 221,
    height: 217,
    objectFit: "contain",
  },

  modalNote: {
    color: "##555555",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#FF5E00",
    borderRadius: 30,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
