import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import { askPolicyAssistant } from "@/api/insuranceApi";
import ScreenLayout from "@/components/ScreenLayout";
import { TAB_SCREEN_EDGES } from "@/constants/tabScreen";
import {
  suggestedQuestions,
  uploadCompleteMessage,
  uploadedPolicyQuickQuestions,
} from "@/utils/policyAssistant";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type UploadedFile = {
  name: string;
  sizeLabel: string;
};

const MAX_FILE_BYTES = 25 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function SearchScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);
  const messageIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [messages, isTyping]);

  const nextId = () => {
    messageIdRef.current += 1;
    return `msg-${messageIdRef.current}`;
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const { reply } = await askPolicyAssistant(text);
      if (!mountedRef.current) return;
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", text: reply },
      ]);
    } catch {
      if (!mountedRef.current) return;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      if (mountedRef.current) {
        setIsTyping(false);
      }
    }
  };

  const handleUpload = async () => {
    setUploadError(null);
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled || result.assets.length === 0) return;

    const asset = result.assets[0];
    const isPdf =
      asset.mimeType === "application/pdf" ||
      asset.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setUploadError("Only PDF files are supported.");
      return;
    }
    if (asset.size != null && asset.size > MAX_FILE_BYTES) {
      setUploadError("File is too large. Maximum size is 25MB.");
      return;
    }

    setUploadedFile({
      name: asset.name,
      sizeLabel: asset.size != null ? formatBytes(asset.size) : "PDF",
    });
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "assistant", text: uploadCompleteMessage },
    ]);
  };

  const hasConversation = messages.length > 0;

  return (
    <ScreenLayout
      scrollable={false}
      contentContainerStyle={styles.screen}
      edges={TAB_SCREEN_EDGES}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {!hasConversation ? (
            <View style={styles.hero}>
              <View style={styles.heroIcon}>
                <Feather name="zap" size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.heroTitle}>How Can I Help You Today?</Text>
              <Text style={styles.heroSubtitle}>
                Clear answers. Simple explanations. Anytime, Everytime.
              </Text>
            </View>
          ) : null}

          {uploadedFile || !hasConversation ? (
            <View style={styles.uploadCard}>
              <View style={styles.uploadHeaderRow}>
                <Text style={styles.uploadTitle}>Upload Policy</Text>
                {uploadedFile ? (
                  <View style={styles.uploadStatusRow}>
                    <Feather name="check-circle" size={13} color="#16A34A" />
                    <Text style={styles.uploadStatusDone}>Policy Uploaded</Text>
                  </View>
                ) : (
                  <Text style={styles.uploadStatus}>No Policy Uploaded</Text>
                )}
              </View>

              {uploadedFile ? (
                <View style={styles.uploadedRow}>
                  <View style={styles.uploadedIconWrap}>
                    <Feather name="file-text" size={18} color="#FF5E00" />
                  </View>
                  <View style={styles.uploadedTextWrap}>
                    <Text style={styles.uploadedName} numberOfLines={1}>
                      {uploadedFile.name}
                    </Text>
                    <Text style={styles.uploadedMeta}>
                      PDF · {uploadedFile.sizeLabel}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setUploadedFile(null)}
                    hitSlop={8}
                    accessibilityLabel="Remove uploaded policy"
                  >
                    <Feather name="x" size={18} color="#757575" />
                  </Pressable>
                </View>
              ) : (
                <>
                  <Pressable style={styles.dropZone} onPress={handleUpload}>
                    <View style={styles.dropIconWrap}>
                      <Feather name="upload" size={20} color="#B47B00" />
                    </View>
                    <Text style={styles.dropText}>
                      Tap to <Text style={styles.dropLink}>Upload Policy</Text>
                    </Text>
                    <Text style={styles.dropHint}>Only PDFs, up to 25MB</Text>
                  </Pressable>
                  {uploadError ? (
                    <Text style={styles.uploadErrorText}>{uploadError}</Text>
                  ) : null}
                </>
              )}
            </View>
          ) : null}

          {!hasConversation ? (
            <>
              <Text style={styles.suggestionsTitle}>Try asking</Text>
              <View style={styles.suggestions}>
                {suggestedQuestions.map((question) => (
                  <Pressable
                    key={question}
                    style={styles.suggestionChip}
                    onPress={() => sendMessage(question)}
                  >
                    <Feather name="message-circle" size={14} color="#FF5E00" />
                    <Text style={styles.suggestionText}>{question}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.messages}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.bubble,
                    message.role === "user"
                      ? styles.bubbleUser
                      : styles.bubbleAssistant,
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      message.role === "user" && styles.bubbleTextUser,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              ))}

              {isTyping ? (
                <View style={[styles.bubble, styles.bubbleAssistant]}>
                  <Text style={styles.typingText}>Typing…</Text>
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>

        {uploadedFile ? (
          <View style={styles.quickChipsRow}>
            {uploadedPolicyQuickQuestions.map((question) => (
              <Pressable
                key={question}
                style={styles.quickChip}
                onPress={() => sendMessage(question)}
              >
                <Text style={styles.quickChipText}>{question}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your policies"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
          />
          <Pressable
            style={[
              styles.sendButton,
              (!input.trim() || isTyping) && styles.sendButtonDisabled,
            ]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            accessibilityLabel="Send message"
          >
            <Feather name="arrow-up" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#F8F7F3",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  hero: {
    alignItems: "center",
    marginBottom: 24,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#383838",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "#383838",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#757575",
    textAlign: "center",
  },
  uploadCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  uploadHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#383838",
  },
  uploadStatus: {
    fontSize: 12,
    lineHeight: 16,
    color: "#9CA3AF",
  },
  uploadStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  uploadStatusDone: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#16A34A",
  },
  uploadErrorText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#DC2626",
    marginTop: 8,
    textAlign: "center",
  },
  dropZone: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D2CD",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  dropIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FBE7B5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  dropText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    color: "#383838",
  },
  dropLink: {
    color: "#FF5E00",
    textDecorationLine: "underline",
  },
  dropHint: {
    fontSize: 12,
    lineHeight: 18,
    color: "#9CA3AF",
    marginTop: 4,
  },
  uploadedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF4EC",
    borderRadius: 14,
    padding: 12,
  },
  uploadedIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadedTextWrap: {
    flex: 1,
  },
  uploadedName: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#383838",
  },
  uploadedMeta: {
    fontSize: 12,
    lineHeight: 16,
    color: "#757575",
  },
  suggestionsTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#383838",
    marginBottom: 10,
  },
  suggestions: {
    gap: 8,
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#383838",
    flex: 1,
  },
  messages: {
    gap: 10,
  },
  bubble: {
    maxWidth: "85%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    alignSelf: "flex-end",
    backgroundColor: "#FF5E00",
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#383838",
  },
  bubbleTextUser: {
    color: "#FFFFFF",
  },
  typingText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  quickChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  quickChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  quickChipText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#383838",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F8F7F3",
  },
  input: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#383838",
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FF5E00",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#FFD8BF",
  },
});
