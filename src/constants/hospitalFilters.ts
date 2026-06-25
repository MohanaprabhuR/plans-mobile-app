export type DistanceFilter = 5 | 10 | 25 | 50 | 100 | null;

export type HospitalFilters = {
  distance: DistanceFilter;
  ratings: number[];
};

export const defaultHospitalFilters: HospitalFilters = {
  distance: null,
  ratings: [],
};

export const DISTANCE_OPTIONS: { label: string; value: DistanceFilter }[] = [
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

export function countActiveFilters(filters: HospitalFilters): number {
  return (filters.distance ? 1 : 0) + filters.ratings.length;
}

export function filtersAreEqual(a: HospitalFilters, b: HospitalFilters): boolean {
  if (a.distance !== b.distance) return false;
  if (a.ratings.length !== b.ratings.length) return false;
  return a.ratings.every((rating) => b.ratings.includes(rating));
}
