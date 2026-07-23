import { Hospital } from "@/constants/hospitalData";
import { HospitalFilters } from "@/constants/hospitalFilters";

export function filterHospitals(
  hospitals: Hospital[],
  search: string,
  filters: HospitalFilters,
): Hospital[] {
  const query = search.trim().toLowerCase();
  let result = hospitals;

  if (query) {
    result = result.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(query) ||
        hospital.city.toLowerCase().includes(query) ||
        hospital.state.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query),
    );
  }

  if (filters.distance) {
    result = result.filter(
      (hospital) => hospital.distance <= filters.distance!,
    );
  }

  if (filters.ratings.length > 0) {
    result = result.filter((hospital) =>
      filters.ratings.includes(Math.round(hospital.rating)),
    );
  }

  return [...result].sort((a, b) => a.distance - b.distance);
}
