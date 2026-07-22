import { Feather } from "@expo/vector-icons";

export type CoveredMember = {
  id: string;
  name: string;
  relation: string;
  avatar: string;
};

export type CoverageItem = {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
};

export type PolicyDetail = {
  planName: string;
  proposerName: string;
  policyNumber: string;
  policyType: string;
  policyTerm: string;
  startDate: string;
  renewalDate: string;
  applicationNumber: string;
  cashlessHospitals: string;
  coverageAmount: string;
  premiumAmount: string;
  preExistingDisease: string;
  maternity: string;
  roomRentLimit: string;
  coPay: string;
  restorationBenefit: string;
  coveredMembers: CoveredMember[];
  covered: CoverageItem[];
  notCovered: CoverageItem[];
};

export const policyDetails: Record<string, PolicyDetail> = {
  health: {
    planName: "Care Health Supreme",
    proposerName: "Herman Mavoe",
    policyNumber: "0239886484",
    policyType: "Family Floater",
    policyTerm: "1 Year",
    startDate: "20 May 2026",
    renewalDate: "20 May 2027",
    applicationNumber: "149422263",
    cashlessHospitals: "12000+",
    coverageAmount: "$25000",
    premiumAmount: "$850/Year",
    preExistingDisease: "Covered",
    maternity: "Not Included",
    roomRentLimit: "$250/Day",
    coPay: "10%",
    restorationBenefit: "Available",
    coveredMembers: [
      {
        id: "member-1",
        name: "Herman Mavoe",
        relation: "Self",
        avatar: "https://mockmind-api.uifaces.co/content/human/80.jpg",
      },
      {
        id: "member-2",
        name: "Emily Davis",
        relation: "Spouse",
        avatar: "https://mockmind-api.uifaces.co/content/human/45.jpg",
      },
      {
        id: "member-3",
        name: "Emma Mavoe",
        relation: "Child",
        avatar: "https://mockmind-api.uifaces.co/content/human/12.jpg",
      },
    ],
    covered: [
      {
        id: "hospitalization",
        icon: "activity",
        title: "Hospitalization",
        description:
          "Hospitalisation over 24 hrs covered up to sum insured as per policy terms.",
      },
      {
        id: "family-definition",
        icon: "users",
        title: "Family Definition",
        description:
          "Covers you and your family up to the sum insured during the policy term.",
      },
      {
        id: "day-care",
        icon: "sun",
        title: "Day Care Treatments",
        description:
          "Covers short-stay treatments such as cataract or angiography.",
      },
      {
        id: "room-rent-limit",
        icon: "home",
        title: "Room Rent Limit",
        description:
          "ICU room rent covered up to 4% and normal room rent up to 2% of the sum insured.",
      },
      {
        id: "co-pay",
        icon: "percent",
        title: "Co-Pay",
        description:
          "Co-payment means you share part of the medical cost with your insurer.",
      },
      {
        id: "maternity",
        icon: "heart",
        title: "Maternity",
        description:
          "Covers up to $50,000 for first two deliveries, including Normal/C-Section.",
      },
    ],
    notCovered: [
      {
        id: "consumables",
        icon: "scissors",
        title: "Consumables",
        description:
          "Covers disposable items such as gowns, gloves, syringes, and masks.",
      },
      {
        id: "foreign-treatment",
        icon: "globe",
        title: "Foreign Treatment",
        description:
          "Expenses for treatment outside India are not covered under the policy.",
      },
      {
        id: "opd",
        icon: "clipboard",
        title: "OPD",
        description:
          "OPD care excluded unless it needs 24-hr stay or qualifies as daycare.",
      },
      {
        id: "external-congenital",
        icon: "alert-circle",
        title: "External Congenital",
        description:
          "External congenital not covered except in cases of life-threatening conditions.",
      },
      {
        id: "infertility",
        icon: "eye-off",
        title: "Infertility Treatments",
        description:
          "Infertility treatments such as IVF and surrogacy will not be covered.",
      },
      {
        id: "homecare",
        icon: "home",
        title: "Homecare Treatment",
        description:
          "Expenses for non-hospitalised homecare treatments are not covered.",
      },
    ],
  },
  auto: {
    planName: "Safe Auto Complete",
    proposerName: "Herman Mavoe",
    policyNumber: "0417736201",
    policyType: "Comprehensive",
    policyTerm: "1 Year",
    startDate: "12 Jun 2026",
    renewalDate: "12 Jun 2027",
    applicationNumber: "882014455",
    cashlessHospitals: "3500+ Garages",
    coverageAmount: "$3500",
    premiumAmount: "$150/Year",
    preExistingDisease: "Not Applicable",
    maternity: "Not Applicable",
    roomRentLimit: "Not Applicable",
    coPay: "5%",
    restorationBenefit: "Not Available",
    coveredMembers: [
      {
        id: "member-1",
        name: "Herman Mavoe",
        relation: "Owner",
        avatar: "https://mockmind-api.uifaces.co/content/human/80.jpg",
      },
    ],
    covered: [
      {
        id: "accidental-damage",
        icon: "truck",
        title: "Accidental Damage",
        description: "Covers repair costs from collisions and accidents.",
      },
      {
        id: "theft",
        icon: "lock",
        title: "Theft Protection",
        description: "Covers total loss of the vehicle due to theft.",
      },
      {
        id: "third-party",
        icon: "users",
        title: "Third-Party Liability",
        description: "Covers damages caused to a third party's vehicle or property.",
      },
    ],
    notCovered: [
      {
        id: "wear-tear",
        icon: "tool",
        title: "Wear and Tear",
        description: "Normal wear and tear or mechanical breakdown is not covered.",
      },
      {
        id: "unauthorized-driver",
        icon: "user-x",
        title: "Unauthorized Driver",
        description: "Damage caused while driven by an unlisted driver is excluded.",
      },
    ],
  },
  home: {
    planName: "Smart Home Shield",
    proposerName: "Herman Mavoe",
    policyNumber: "0568821390",
    policyType: "Structure + Contents",
    policyTerm: "1 Year",
    startDate: "03 Feb 2026",
    renewalDate: "03 Feb 2027",
    applicationNumber: "664102938",
    cashlessHospitals: "Not Applicable",
    coverageAmount: "$3500",
    premiumAmount: "$350/Year",
    preExistingDisease: "Not Applicable",
    maternity: "Not Applicable",
    roomRentLimit: "Not Applicable",
    coPay: "10%",
    restorationBenefit: "Available",
    coveredMembers: [
      {
        id: "member-1",
        name: "Herman Mavoe",
        relation: "Owner",
        avatar: "https://mockmind-api.uifaces.co/content/human/80.jpg",
      },
    ],
    covered: [
      {
        id: "fire",
        icon: "alert-triangle",
        title: "Fire & Lightning",
        description: "Covers structural damage caused by fire or lightning strikes.",
      },
      {
        id: "burglary",
        icon: "shield",
        title: "Burglary & Theft",
        description: "Covers loss of home contents due to burglary or theft.",
      },
      {
        id: "natural-disaster",
        icon: "cloud-rain",
        title: "Natural Disasters",
        description: "Covers damage from storms, floods, and earthquakes.",
      },
    ],
    notCovered: [
      {
        id: "wear-tear-home",
        icon: "tool",
        title: "Wear and Tear",
        description: "Gradual deterioration of the property is not covered.",
      },
      {
        id: "unoccupied",
        icon: "home",
        title: "Unoccupied Property",
        description: "Damage while the home is unoccupied beyond 60 days is excluded.",
      },
    ],
  },
  life: {
    planName: "FamilyCare Term Plan",
    proposerName: "Herman Mavoe",
    policyNumber: "0791456623",
    policyType: "Term Life",
    policyTerm: "20 Years",
    startDate: "01 Dec 2020",
    renewalDate: "01 Dec 2040",
    applicationNumber: "220144789",
    cashlessHospitals: "Not Applicable",
    coverageAmount: "$50000",
    premiumAmount: "$600/Year",
    preExistingDisease: "Disclosed at Inception",
    maternity: "Not Applicable",
    roomRentLimit: "Not Applicable",
    coPay: "Not Applicable",
    restorationBenefit: "Not Applicable",
    coveredMembers: [
      {
        id: "member-1",
        name: "Herman Mavoe",
        relation: "Self",
        avatar: "https://mockmind-api.uifaces.co/content/human/80.jpg",
      },
    ],
    covered: [
      {
        id: "death-benefit",
        icon: "heart",
        title: "Death Benefit",
        description: "Pays the sum assured to nominees in case of death during the term.",
      },
      {
        id: "terminal-illness",
        icon: "activity",
        title: "Terminal Illness",
        description: "Accelerated payout on diagnosis of a terminal illness.",
      },
    ],
    notCovered: [
      {
        id: "suicide-clause",
        icon: "alert-circle",
        title: "Suicide Clause",
        description: "Death by suicide within 12 months of policy start is excluded.",
      },
      {
        id: "non-disclosure",
        icon: "eye-off",
        title: "Non-Disclosure",
        description: "Claims may be denied for undisclosed pre-existing conditions.",
      },
    ],
  },
};
