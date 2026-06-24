export type Hospital = {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  distance: number;
};

const hospitalNames = [
  "Methodist Hospital",
  "Texas Medical Center",
  "Memorial Hermann",
  "Baylor St. Luke's",
  "Houston Methodist",
  "Kindred Hospital",
  "HCA Houston Healthcare",
  "CHI St. Luke's Health",
  "Texas Children's Hospital",
  "MD Anderson Cancer Center",
  "Harris Health System",
  "Park Plaza Hospital",
  "West Houston Medical Center",
  "Clear Lake Regional",
  "Kingwood Medical Center",
  "Cypress Fairbanks Medical",
  "Memorial City Medical Center",
  "Texas Orthopedic Hospital",
  "River Oaks Hospital",
  "St. Joseph Medical Center",
  "East Houston Regional",
  "Northwest Texas Healthcare",
  "Pearland Medical Center",
  "Conroe Regional Medical",
];

const cities = [
  "Houston",
  "Sugar Land",
  "Pasadena",
  "Pearland",
  "Katy",
  "The Woodlands",
  "Conroe",
  "Clear Lake",
];

function buildHospitals(prefix: string): Hospital[] {
  return hospitalNames.map((name, index) => ({
    id: `${prefix}-${index + 1}`,
    name,
    city: cities[index % cities.length],
    state: "TX",
    rating: Number((4.9 - index * 0.02).toFixed(1)),
    distance: Number((2.5 + index * 0.4).toFixed(1)),
  }));
}

export const networkHospitals = buildHospitals("network");

export const blacklistedHospitals = buildHospitals("blocked");
