export type Option = {
  id: string;
  label: string;
};

export type QuestionType = "single" | "text" | "multiple";

export type Question = {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: Option[];
};

export type Section = {
  id: string;
  section: string;
  heading: string;
  subtitle: string;
  questions: Question[];
};

export const QUESTIONNAIRE: Section[] = [
  {
    id: "personal",
    section: "Personal Information",
    heading: "About Yourself",
    subtitle: "This helps us personalize your protection profile.",
    questions: [
      {
        id: "gender",
        prompt: "What's your gender?",
        type: "single",
        options: [
          { id: "male", label: "Male" },
          { id: "female", label: "Female" },
        ],
      },
      {
        id: "age",
        prompt: "What's your age group?",
        type: "single",
        options: [
          { id: "18-30", label: "18 - 30" },
          { id: "31-45", label: "31 - 45" },
          { id: "46-60", label: "46 - 60" },
          { id: "61+", label: "61+" },
        ],
      },
      {
        id: "employment",
        prompt: "What's your employment type?",
        type: "single",
        options: [
          { id: "fulltime", label: "Full Time" },
          { id: "parttime", label: "Part Time" },
          { id: "self-employed", label: "Self-Employed" },
          { id: "student", label: "Student" },
        ],
      },
      {
        id: "dependents",
        prompt: "Do you have any dependents?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "insured",
        prompt: "Are you currently insured?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "insurance-for",
        prompt: "Who is this insurance for?",
        type: "single",
        options: [
          { id: "myself", label: "Myself" },
          { id: "family", label: "Family" },
          { id: "dependents", label: "Dependents" },
        ],
      },
      {
        id: "coverage",
        prompt: "What type of coverage do you have?",
        type: "single",
        options: [
          { id: "health", label: "Health" },
          { id: "life", label: "Life" },
          { id: "both", label: "Both" },
          { id: "none", label: "None" },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    section: "Lifestyle",
    heading: "About Lifestyle",
    subtitle: "Your daily habits help us understand your risk exposure.",
    questions: [
      {
        id: "smoke",
        prompt: "Do you smoke?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "alcohol",
        prompt: "Do you consume alcohol?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "exercise",
        prompt: "Do you exercise regularly?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "travel",
        prompt: "How often do you travel?",
        type: "single",
        options: [
          { id: "never", label: "Never" },
          { id: "occasionally", label: "Occasionally" },
          { id: "frequently", label: "Frequently" },
        ],
      },
      {
        id: "lifestyle_level",
        prompt: "How would you rate your lifestyle?",
        type: "single",
        options: [
          { id: "active", label: "Active" },
          { id: "moderate", label: "Moderate" },
          { id: "sedentary", label: "Sedentary" },
        ],
      },
    ],
  },
  {
    id: "health",
    section: "Medical History",
    heading: "About Health",
    subtitle: "This helps us assess your health-related risks accurately.",
    questions: [
      {
        id: "pre-existing",
        prompt: "Do you have any pre-existing conditions?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "conditions",
        prompt: "Any known medical conditions?",
        type: "multiple",
        options: [
          { id: "diabetes", label: "Diabetes" },
          { id: "hypertension", label: "Hypertension" },
          { id: "heart", label: "Heart Disease" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "hospitalized",
        prompt: "Hospitalized in the last 3 years?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "medication",
        prompt: "Are you on ongoing medications?",
        type: "single",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
    ],
  },
];

export const ALL_STEPS = QUESTIONNAIRE.flatMap((section) =>
  section.questions.map((question) => ({
    ...question,
    sectionId: section.id,
    section: section.section,
    heading: section.heading,
    subtitle: section.subtitle,
  })),
);

export const TOTAL_STEPS = ALL_STEPS.length;
