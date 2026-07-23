/**
 * Insurance API service layer.
 *
 * Every screen consumes data ONLY through these async functions, so the
 * app already behaves as if it were talking to a server. Today each
 * function resolves local dummy data after a simulated network delay.
 *
 * To connect a real backend later, replace the body of each function with
 * an HTTP call (keeping the same signature and return type), e.g.:
 *
 *   export async function fetchPolicies(): Promise<PolicyCardData[]> {
 *     const res = await fetch(`${BASE_URL}/policies`);
 *     return res.json();
 *   }
 *
 * Nothing else in the app needs to change.
 */

import {
  ClaimCardData,
  premiumOverview,
  recentClaims,
} from "@/constants/dashboardData";
import {
  Hospital,
  blacklistedHospitals,
  networkHospitals,
} from "@/constants/hospitalData";
import { PolicyCardData, policyCards } from "@/constants/policyData";
import { PolicyDetail, policyDetails } from "@/constants/policyDetails";
import { QUESTIONNAIRE, Section } from "@/constants/questionData";
import {
  CoverageGapCategory,
  coverageGapCategories,
} from "@/constants/coverageScoreData";
import {
  CoverageScoreBand,
  RiskCategory,
  coverageScore,
  coveredRiskCount,
  getCoverageScoreBand,
  riskCategories,
  totalRiskCount,
} from "@/constants/riskOverviewData";
import { getAssistantReply } from "@/utils/policyAssistant";

// export const BASE_URL = "https://api.example.com/v1";

const NETWORK_DELAY_MS = 400;

function simulateRequest<T>(data: T, delay = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

// ---------- Dashboard ----------

export type RiskSummary = {
  score: number;
  label: "Low" | "Medium" | "High";
};

export type DashboardData = {
  activePolicies: PolicyCardData[];
  premiumOverview: typeof premiumOverview;
  recentClaims: ClaimCardData[];
  riskSummary: RiskSummary;
};

/** Dummy risk score shown on the home Risk Overview card. */
const DUMMY_RISK_SUMMARY: RiskSummary = {
  score: 35,
  label: "Medium",
};

export async function fetchDashboard(): Promise<DashboardData> {
  return simulateRequest({
    activePolicies: policyCards.filter((card) => card.status === "active"),
    premiumOverview,
    recentClaims,
    riskSummary: DUMMY_RISK_SUMMARY,
  });
}

// ---------- Policies ----------

export async function fetchPolicies(): Promise<PolicyCardData[]> {
  return simulateRequest(policyCards);
}

export type PolicyBundle = {
  policy: PolicyCardData;
  detail: PolicyDetail;
};

export async function fetchPolicyDetail(
  policyId: string,
): Promise<PolicyBundle | null> {
  const policy = policyCards.find((card) => card.id === policyId);
  const detail = policyDetails[policyId];
  return simulateRequest(policy && detail ? { policy, detail } : null);
}

// ---------- Coverage score ----------

export type CoverageReport = {
  score: number;
  band: CoverageScoreBand;
  gapCategories: CoverageGapCategory[];
};

export async function fetchCoverageReport(): Promise<CoverageReport> {
  return simulateRequest({
    score: coverageScore,
    band: getCoverageScoreBand(coverageScore),
    gapCategories: coverageGapCategories,
  });
}

// ---------- Risk overview ----------

export type RiskOverviewData = {
  categories: RiskCategory[];
  totalRiskCount: number;
  coveredRiskCount: number;
};

export async function fetchRiskOverview(): Promise<RiskOverviewData> {
  return simulateRequest({
    categories: riskCategories,
    totalRiskCount,
    coveredRiskCount,
  });
}

// ---------- Hospitals ----------

export async function fetchNetworkHospitals(): Promise<Hospital[]> {
  return simulateRequest(networkHospitals);
}

export async function fetchBlacklistedHospitals(): Promise<Hospital[]> {
  return simulateRequest(blacklistedHospitals);
}

// ---------- Questionnaire ----------

export async function fetchQuestionnaire(): Promise<Section[]> {
  return simulateRequest(QUESTIONNAIRE);
}

export async function submitQuestionnaire(
  answers: Record<string, string | string[]>,
): Promise<{ success: boolean }> {
  // Real implementation would POST the answers to the backend.
  console.log("Questionnaire submitted:", answers);
  return simulateRequest({ success: true });
}

// ---------- Policy assistant ----------

export async function askPolicyAssistant(
  question: string,
): Promise<{ reply: string }> {
  // Real implementation would call an AI/chat endpoint with the question
  // (and the uploaded policy document as context).
  return simulateRequest({ reply: getAssistantReply(question) }, 900);
}
