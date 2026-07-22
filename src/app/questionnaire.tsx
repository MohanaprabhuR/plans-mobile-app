/* eslint-disable react-hooks/refs -- RN Animated.Value refs are read during render by design */
import BackButton from "@/components/BackButton";
import ScreenLayout from "@/components/ScreenLayout";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from "react-native";

import {
  ALL_STEPS,
  QUESTIONNAIRE,
  TOTAL_STEPS,
} from "../constants/questionData";

type AnswerValue = string | string[];

const ADVANCE_DELAY_MS = 450;
const MULTIPLE_ADVANCE_DELAY_MS = 1200;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function QuestionnaireScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const questionAnim = useRef(new Animated.Value(0)).current;

  const step = ALL_STEPS[currentStep];
  const answer = answers[step.id];

  const sectionIndex = QUESTIONNAIRE.findIndex(
    (section) => section.id === step.sectionId,
  );
  const currentSection = QUESTIONNAIRE[sectionIndex];
  const questionIndex = currentSection.questions.findIndex(
    (question) => question.id === step.id,
  );
  const isLastQuestionInSection =
    questionIndex === currentSection.questions.length - 1;
  const isLastSection = sectionIndex === QUESTIONNAIRE.length - 1;

  const canContinue = useMemo(() => {
    if (step.type === "text") {
      return typeof answer === "string" && answer.trim().length > 0;
    }
    if (step.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return typeof answer === "string" && answer.length > 0;
  }, [answer, step.type]);

  useEffect(() => {
    questionAnim.setValue(0);
    Animated.timing(questionAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, [currentStep, questionAnim]);

  function scheduleAdvance(delay = ADVANCE_DELAY_MS) {
    if (isLastQuestionInSection) return;

    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }
    advanceTimeoutRef.current = setTimeout(() => {
      advanceTimeoutRef.current = null;
      goToNextStep();
    }, delay);
  }

  function goToNextStep() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    router.replace("/(tabs)");
  }

  function handleSectionNext() {
    if (!canContinue) return;
    goToNextStep();
  }

  function handleSingleSelect(optionId: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: optionId }));
    scheduleAdvance();
  }

  function handleMultipleSelect(optionId: string) {
    const current = (answers[step.id] as string[] | undefined) ?? [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    setAnswers((prev) => ({ ...prev, [step.id]: next }));

    if (next.length > 0 && !isLastQuestionInSection) {
      scheduleAdvance(MULTIPLE_ADVANCE_DELAY_MS);
    } else if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  }

  function handleTextChange(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
    if (!isLastQuestionInSection && value.trim().length > 0) {
      scheduleAdvance(600);
    }
  }

  function handleBack() {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    if (currentStep > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  }

  function getSectionProgress(targetSectionIndex: number) {
    if (targetSectionIndex < sectionIndex) return 1;
    if (targetSectionIndex > sectionIndex) return 0;
    return (questionIndex + 1) / currentSection.questions.length;
  }

  return (
    <ScreenLayout scrollable={false} style={styles.screen}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <Text style={styles.sectionLabel}>{step.section}</Text>
        <Text style={styles.stepCount}>
          {questionIndex + 1}/{currentSection.questions.length}
        </Text>
      </View>

      <View style={styles.progressRow}>
        {QUESTIONNAIRE.map((section, targetSectionIndex) => (
          <View key={section.id} style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${getSectionProgress(targetSectionIndex) * 100}%` },
              ]}
            />
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>{step.heading}</Text>
        <Text style={styles.subtitle}>{step.subtitle}</Text>

        <Animated.View
          key={step.id}
          style={[
            styles.card,
            {
              opacity: questionAnim,
              transform: [
                {
                  translateY: questionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.prompt}>{step.prompt}</Text>

          {step.type === "text" ? (
            <TextInput
              value={typeof answer === "string" ? answer : ""}
              onChangeText={handleTextChange}
              placeholder="Type your answer"
              placeholderTextColor="#9CA3AF"
              style={styles.textInput}
              autoCapitalize="words"
              returnKeyType="done"
            />
          ) : (
            <View>
              {step.options?.map((option, optionIndex) => {
                const isSelected =
                  step.type === "multiple"
                    ? Array.isArray(answer) && answer.includes(option.id)
                    : answer === option.id;
                const isLast = optionIndex === (step.options?.length ?? 0) - 1;

                return (
                  <Pressable
                    key={option.id}
                    style={[styles.optionRow, !isLast && styles.optionBorder]}
                    onPress={() =>
                      step.type === "multiple"
                        ? handleMultipleSelect(option.id)
                        : handleSingleSelect(option.id)
                    }
                  >
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {step.type === "multiple" ? (
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                        ]}
                      >
                        {isSelected ? (
                          <Text style={styles.checkmark}>✓</Text>
                        ) : null}
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.radio,
                          isSelected && styles.radioSelected,
                        ]}
                      >
                        {isSelected ? <View style={styles.radioDot} /> : null}
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}
        </Animated.View>
      </View>

      {isLastQuestionInSection ? (
        <View style={styles.footer}>
          <Pressable
            style={[
              styles.nextButton,
              !canContinue && styles.nextButtonDisabled,
            ]}
            onPress={handleSectionNext}
            disabled={!canContinue}
          >
            <Text
              style={[
                styles.nextButtonText,
                !canContinue && styles.nextButtonTextDisabled,
              ]}
            >
              {isLastSection ? "Submit" : "Next"}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F7F3",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 12,
  },
  sectionLabel: {
    fontSize: 15,
    lineHeight: 24,
    color: "#383838",
    fontWeight: "500",
  },
  stepCount: {
    fontSize: 13,
    lineHeight: 18,
    color: "#9CA3AF",
    fontWeight: "500",
    minWidth: 32,
    textAlign: "right",
  },
  progressRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E8E6E1",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#F9B233",
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#383838",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "#757575",
    marginBottom: 24,
    maxWidth: 320,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    shadowColor: "#383838",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  prompt: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#383838",
    marginBottom: 16,
  },
  textInput: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3F2EE",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#383838",
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE8",
  },
  optionLabel: {
    fontSize: 15,
    lineHeight: 22,
    color: "#383838",
    fontWeight: "400",
    flex: 1,
    paddingRight: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: "#F9B233",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F9B233",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: "#F9B233",
    backgroundColor: "#F9B233",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#383838",
    borderRadius: 24,
    paddingHorizontal: 40,
    paddingVertical: 14,
    minWidth: 140,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#E8E6E1",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
  nextButtonTextDisabled: {
    color: "#9CA3AF",
  },
});
