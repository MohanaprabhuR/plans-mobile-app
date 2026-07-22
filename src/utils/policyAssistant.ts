import { premiumOverview, recentClaims } from "@/constants/dashboardData";
import { policyCards } from "@/constants/policyData";
import { policyDetails } from "@/constants/policyDetails";
import {
  coverageScore,
  getCoverageScoreBand,
  totalRiskCount,
  coveredRiskCount,
} from "@/constants/riskOverviewData";

const activePolicies = policyCards.filter((card) => card.status === "active");

function coverageAnswer(): string {
  const lines = activePolicies.map((card) => {
    const detail = policyDetails[card.id];
    return `• ${card.title} (${card.provider}): ${detail?.coverageAmount ?? "—"} cover`;
  });
  return `Here's what your active policies cover:\n\n${lines.join(
    "\n",
  )}\n\nAsk about a specific policy for a detailed breakdown of what's included and excluded.`;
}

function renewalAnswer(): string {
  const lines = activePolicies.map((card) => {
    const detail = policyDetails[card.id];
    return `• ${card.title}: renews on ${detail?.renewalDate ?? "—"}`;
  });
  return `Your upcoming renewals:\n\n${lines.join(
    "\n",
  )}\n\nI'd recommend renewing at least 2 weeks early to avoid a coverage gap.`;
}

function premiumAnswer(): string {
  const lines = premiumOverview.categories.map(
    (row) =>
      `• ${row.label} (${row.count} ${row.count === 1 ? "policy" : "policies"}): $${row.yearlyPremium.toLocaleString()}/year`,
  );
  return `You pay $${premiumOverview.totalYearlyPremium.toLocaleString()}/year in total premiums:\n\n${lines.join(
    "\n",
  )}`;
}

function claimAnswer(): string {
  return `To file a claim:\n\n1. Open the policy from My Policies\n2. Tap "File a Claim"\n3. Fill in the incident details and attach documents\n4. Track the status from the Claims section on Home\n\nFor cashless hospital claims, show your health card at any of the 12000+ network hospitals.`;
}

function scoreAnswer(): string {
  const band = getCoverageScoreBand(coverageScore);
  return `Your coverage score is ${coverageScore}/100 (${band.label}). ${coveredRiskCount} of ${totalRiskCount} identified risks are covered.\n\nCheck the Coverage tab to see your gaps and suggestions to improve it.`;
}

function deductibleAnswer(): string {
  const lines = activePolicies
    .map((card) => {
      const detail = policyDetails[card.id];
      if (!detail || detail.coPay === "Not Applicable") return null;
      return `• ${card.title}: ${detail.coPay} co-pay`;
    })
    .filter(Boolean);
  return `Your out-of-pocket share (co-pay) per policy:\n\n${lines.join(
    "\n",
  )}\n\nYour health plan also caps room rent at $250/day — anything above that is paid by you.`;
}

function claimStatusAnswer(): string {
  const lines = recentClaims.map(
    (claim) =>
      `• ${claim.claimId} (${claim.title}): $${claim.amount} — ${claim.status}`,
  );
  return `Your recent claims:\n\n${lines.join(
    "\n",
  )}\n\nYou can track these anytime from the Claims section on Home.`;
}

function hospitalAnswer(): string {
  return `Your health policy gives you cashless treatment at 12000+ network hospitals.\n\nFrom Home → Quick Actions you can browse Network Hospitals near you, and also check the Blacklisted Hospitals list to avoid claim rejections.`;
}

function policySpecificAnswer(policyId: string): string | null {
  const card = policyCards.find((item) => item.id === policyId);
  const detail = policyDetails[policyId];
  if (!card || !detail) return null;

  const covered = detail.covered
    .slice(0, 3)
    .map((item) => `• ${item.title}`)
    .join("\n");
  const notCovered = detail.notCovered
    .slice(0, 3)
    .map((item) => `• ${item.title}`)
    .join("\n");

  return `${detail.planName} (${card.provider})\n\nCoverage: ${detail.coverageAmount} · Premium: ${detail.premiumAmount} · Renews: ${detail.renewalDate}\n\nCovered:\n${covered}\n\nNot covered:\n${notCovered}\n\nOpen the policy in My Policies for the full details.`;
}

export function getAssistantReply(rawInput: string): string {
  const input = rawInput.toLowerCase();

  if (input.includes("health") || input.includes("medical")) {
    return policySpecificAnswer("health") ?? coverageAnswer();
  }
  if (
    input.includes("auto") ||
    input.includes("car") ||
    input.includes("vehicle")
  ) {
    return policySpecificAnswer("auto") ?? coverageAnswer();
  }
  if (input.includes("home") || input.includes("house")) {
    return policySpecificAnswer("home") ?? coverageAnswer();
  }
  if (input.includes("life") || input.includes("term plan")) {
    return policySpecificAnswer("life") ?? coverageAnswer();
  }
  if (input.includes("deductible") || input.includes("co-pay") || input.includes("copay")) {
    return deductibleAnswer();
  }
  if (input.includes("claim") && input.includes("status")) {
    return claimStatusAnswer();
  }
  if (input.includes("claim")) {
    return claimAnswer();
  }
  if (input.includes("renew") || input.includes("expiry") || input.includes("expire")) {
    return renewalAnswer();
  }
  if (input.includes("premium") || input.includes("pay") || input.includes("cost")) {
    return premiumAnswer();
  }
  if (input.includes("score") || input.includes("gap") || input.includes("risk")) {
    return scoreAnswer();
  }
  if (input.includes("hospital") || input.includes("cashless")) {
    return hospitalAnswer();
  }
  if (input.includes("cover")) {
    return coverageAnswer();
  }

  return `I can help you with your policies — try asking about:\n\n• What your policies cover\n• Filing a claim\n• Renewal dates\n• Premium costs\n• Your coverage score and gaps\n• Network hospitals`;
}

export const suggestedQuestions = [
  "What does my health policy cover?",
  "How do I file a claim?",
  "When do my policies renew?",
  "What's my coverage score?",
];

export const uploadCompleteMessage =
  "Upload complete. Ask me anything about your policy — deductibles, coverage, exclusions, renewals, or claim steps.";

export const uploadedPolicyQuickQuestions = [
  "What's my deductible?",
  "Renew policy",
  "Claim status",
];
