/**
 * Re-exports safe-area APIs from the package source.
 * Avoids broken package `types` entry (`lib/typescript/src/index.d.ts`).
 */
export {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context/src/index";
export type {
  Edge,
  EdgeInsets,
  Metrics,
  Rect,
} from "react-native-safe-area-context/src/SafeArea.types";
