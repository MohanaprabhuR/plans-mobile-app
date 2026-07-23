export type DistanceFilter = 5 | 10 | 25 | 50 | 100 | null;

export type HospitalFilters = {
  distance: DistanceFilter;
  ratings: number[];
};

export const defaultHospitalFilters: HospitalFilters = {
  distance: null,
  ratings: [],
};

export const DISTANCE_OPTIONS: {
  label: string;
  value: Exclude<DistanceFilter, null>;
}[] = [
  { label: "Within 5 Miles", value: 5 },
  { label: "Within 10 Miles", value: 10 },
  { label: "Within 25 Miles", value: 25 },
  { label: "Within 50 Miles", value: 50 },
  { label: "Within 100 Miles", value: 100 },
];

export const RATING_OPTIONS = [
  { label: "1 Star", value: 1 },
  { label: "2 Stars", value: 2 },
  { label: "3 Stars", value: 3 },
  { label: "4 Stars", value: 4 },
  { label: "5 Stars", value: 5 },
];

/** Counts filter categories (distance + ratings), not each selected star. */
export function countActiveFilters(filters: HospitalFilters): number {
  return (filters.distance ? 1 : 0) + (filters.ratings.length > 0 ? 1 : 0);
}

export function filtersAreEqual(
  a: HospitalFilters,
  b: HospitalFilters,
): boolean {
  if (a.distance !== b.distance) return false;
  if (a.ratings.length !== b.ratings.length) return false;
  const sortedA = [...a.ratings].sort((x, y) => x - y);
  const sortedB = [...b.ratings].sort((x, y) => x - y);
  return sortedA.every((rating, index) => rating === sortedB[index]);
}
