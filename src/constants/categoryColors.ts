export type PolicyCategory = "health" | "auto" | "life" | "home";

export const categoryColors: Record<PolicyCategory, string> = {
  health: "#F5F3FF",
  auto: "#FDF4FF",
  life: "#FFF2F3",
  home: "#FFFBEB",
};

export function getCategoryColor(category: PolicyCategory): string {
  return categoryColors[category];
}
