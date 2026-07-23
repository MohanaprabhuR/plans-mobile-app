import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { fetchPolicyDetail } from "@/api/insuranceApi";
import BackButton from "@/components/BackButton";
import KnowYourCoverageSheet from "@/components/KnowYourCoverageSheet";
import LoadingView from "@/components/LoadingView";
import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";
import { useApi } from "@/hooks/useApi";

type TabKey = "overview" | "coverage";
type CoverageFilter = "covered" | "notCovered";

export default function PolicyDetailsScreen() {
  const { policyId } = useLocalSearchParams<{ policyId?: string }>();
  const [tab, setTab] = useState<TabKey>("overview");
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [coverageSheet, setCoverageSheet] = useState<{
    visible: boolean;
    filter: CoverageFilter;
  }>({ visible: false, filter: "covered" });

  const {
    data: bundle,
    loading,
    error,
  } = useApi(() => fetchPolicyDetail(policyId ?? ""), [policyId], {
    enabled: Boolean(policyId),
  });

  if (loading || error || !bundle) {
    return (
      <ScreenLayout style={styles.screen} edges={TAB_SCREEN_EDGES}>
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.title}>Policy Details</Text>
          <View style={styles.headerSpacer} />
        </View>
        {loading ? (
          <LoadingView error={error} />
        ) : (
          <Text style={styles.emptyText}>{error ?? "Policy not found."}</Text>
        )}
      </ScreenLayout>
    );
  }

  const { policy, detail } = bundle;

  const overviewRows: [string, string][] = [
    ["Proposer Name", detail.proposerName],
    ["Policy Number", detail.policyNumber],
    ["Policy Type", detail.policyType],
    ["Policy Term", detail.policyTerm],
    ["Start Date", detail.startDate],
    ["Renewal Date", detail.renewalDate],
    ["Application Number", detail.applicationNumber],
    ["Cashless Hospitals", detail.cashlessHospitals],
  ];

  const coverageRows: [string, string][] = [
    ["Coverage Amount", detail.coverageAmount],
    ["Premium Amount", detail.premiumAmount],
    ["Pre Existing Disease", detail.preExistingDisease],
    ["Maternity", detail.maternity],
    ["Room Rent Limit", detail.roomRentLimit],
    ["Co-Pay", detail.coPay],
    ["Restoration Benefit", detail.restorationBenefit],
  ];

  const rows = tab === "overview" ? overviewRows : coverageRows;

  return (
    <ScreenLayout
      scrollable={false}
      contentContainerStyle={styles.screen}
      edges={TAB_SCREEN_EDGES}
    >
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.title}>Policy Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.hero, { backgroundColor: policy.bgColor }]}>
          <View style={styles.heroPattern} />
          {policy.logo ? (
            <Image
              source={policy.logo}
              style={styles.heroLogo}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.heroIconWrap}>
              <Image
                source={policy.icon}
                style={styles.heroIcon}
                resizeMode="contain"
              />
            </View>
          )}
          <Text style={styles.heroTitle}>{detail.planName}</Text>
          <View style={styles.heroPillsRow}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>
                {policy.title.replace(" Insurance", "")}
              </Text>
            </View>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>
                {policy.status === "active" ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tabs}>
          <Pressable
            style={[styles.tabOption, tab === "overview" && styles.tabOptionActive]}
            onPress={() => setTab("overview")}
          >
            <Text
              style={[
                styles.tabLabel,
                tab === "overview" && styles.tabLabelActive,
              ]}
            >
              Overview
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tabOption, tab === "coverage" && styles.tabOptionActive]}
            onPress={() => setTab("coverage")}
          >
            <Text
              style={[
                styles.tabLabel,
                tab === "coverage" && styles.tabLabelActive,
              ]}
            >
              Coverage
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          {rows.map(([label, value], index) => (
            <View
              key={label}
              style={[
                styles.detailRow,
                index !== rows.length - 1 && styles.detailRowBorder,
              ]}
            >
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Covered Members ({detail.coveredMembers.length})
          </Text>
          <Pressable>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        <View style={styles.membersRow}>
          {detail.coveredMembers.slice(0, 3).map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
              <Text style={styles.memberName} numberOfLines={1}>
                {member.name}
              </Text>
              <Text style={styles.memberRelation}>{member.relation}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Know Your Coverage</Text>
        <View style={styles.card}>
          <Pressable
            style={[styles.linkRow, styles.detailRowBorder]}
            onPress={() =>
              setCoverageSheet({ visible: true, filter: "covered" })
            }
          >
            <Text style={styles.linkLabel}>What&apos;s Covered?</Text>
            <Feather name="arrow-right" size={18} color="#383838" />
          </Pressable>
          <Pressable
            style={styles.linkRow}
            onPress={() =>
              setCoverageSheet({ visible: true, filter: "notCovered" })
            }
          >
            <Text style={styles.linkLabel}>What&apos;s Not Covered?</Text>
            <Feather name="arrow-right" size={18} color="#383838" />
          </Pressable>
        </View>

        <View style={styles.helpCard}>
          <View style={styles.helpIconWrap}>
            <Feather name="headphones" size={20} color="#383838" />
          </View>
          <View style={styles.helpTextWrap}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpSubtitle}>
              We&apos;re here to help you with your policy and claims
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <Pressable style={styles.actionBarButton}>
          <Text style={styles.actionBarText}>File a Claim</Text>
        </Pressable>
        <View style={styles.actionBarDivider} />
        <Pressable
          style={styles.actionBarButton}
          onPress={() => setDownloadVisible(true)}
        >
          <Text style={styles.actionBarText}>Download Policy</Text>
        </Pressable>
      </View>

      <Modal
        visible={downloadVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDownloadVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setDownloadVisible(false)}
          />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Download{"\n"}Health Cards</Text>
              <Pressable
                onPress={() => setDownloadVisible(false)}
                hitSlop={8}
                style={styles.modalClose}
              >
                <Feather name="x" size={16} color="#383838" />
              </Pressable>
            </View>

            <View style={[styles.ticket, { backgroundColor: policy.bgColor }]}>
              {policy.logo ? (
                <Image
                  source={policy.logo}
                  style={styles.ticketLogo}
                  resizeMode="contain"
                />
              ) : null}
              <Text style={styles.ticketName}>{detail.proposerName}</Text>
              <Text style={styles.ticketNumber}>
                {detail.applicationNumber}
              </Text>

              <View style={styles.ticketDivider} />

              <View style={styles.ticketRow}>
                <View>
                  <Text style={styles.ticketLabel}>POLICY NO</Text>
                  <Text style={styles.ticketValue}>{detail.policyNumber}</Text>
                </View>
              </View>
              <View style={styles.ticketRow}>
                <View>
                  <Text style={styles.ticketLabel}>COVERAGE</Text>
                  <Text style={styles.ticketValue}>
                    {detail.coverageAmount}
                  </Text>
                </View>
                <View>
                  <Text style={styles.ticketLabel}>VALID TILL</Text>
                  <Text style={styles.ticketValue}>{detail.renewalDate}</Text>
                </View>
              </View>

              <View style={styles.ticketAvatarsRow}>
                {detail.coveredMembers.slice(0, 3).map((member) => (
                  <Image
                    key={member.id}
                    source={{ uri: member.avatar }}
                    style={styles.ticketAvatar}
                  />
                ))}
              </View>
            </View>

            <View style={styles.ticketFooterRow}>
              <Text style={styles.ticketFooterLabel}>No Claim Bonus</Text>
              <Text style={styles.ticketFooterValue}>Up to 25%</Text>
            </View>

            <Pressable style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>Download</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <KnowYourCoverageSheet
        visible={coverageSheet.visible}
        detail={detail}
        initialFilter={coverageSheet.filter}
        onClose={() => setCoverageSheet((prev) => ({ ...prev, visible: false }))}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#F8F7F3",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerSpacer: {
    width: 32,
  },
  title: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
  },
  emptyText: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginTop: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  hero: {
    borderRadius: 24,
    padding: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 16,
  },
  heroPattern: {
    position: "absolute",
    width: 220,
    height: 220,
    backgroundColor: "#FFFFFF",
    opacity: 0.25,
    transform: [{ rotate: "45deg" }],
    top: -110,
    right: -110,
  },
  heroLogo: {
    width: 44,
    height: 44,
    marginBottom: 12,
  },
  heroIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroIcon: {
    width: 24,
    height: 24,
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  heroPillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  heroPill: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#383838",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
  },
  tabOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  tabOptionActive: {
    backgroundColor: "#F3F2EE",
  },
  tabLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  tabLabelActive: {
    color: "#383838",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE8",
  },
  detailLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#757575",
  },
  detailValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#383838",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF5E00",
  },
  membersRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  memberItem: {
    alignItems: "center",
    width: 72,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 6,
  },
  memberName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#383838",
  },
  memberRelation: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  linkLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    color: "#383838",
  },
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
  },
  helpIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F2EE",
    alignItems: "center",
    justifyContent: "center",
  },
  helpTextWrap: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 12,
    color: "#757575",
  },
  actionBar: {
    flexDirection: "row",
    backgroundColor: "#FF5E00",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
  },
  actionBarButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  actionBarDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  actionBarText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
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
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#383838",
    letterSpacing: -0.3,
  },
  modalClose: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F2EE",
    alignItems: "center",
    justifyContent: "center",
  },
  ticket: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  ticketLogo: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  ticketName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#383838",
  },
  ticketNumber: {
    fontSize: 13,
    color: "#555555",
    marginTop: 2,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: "rgba(56, 56, 56, 0.15)",
    marginVertical: 16,
  },
  ticketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ticketLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 2,
  },
  ticketValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#383838",
  },
  ticketAvatarsRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  ticketAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#F8E108",
    marginLeft: -8,
  },
  ticketFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  ticketFooterLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  ticketFooterValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#757575",
  },
  downloadButton: {
    backgroundColor: "#FF5E00",
    borderRadius: 30,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
