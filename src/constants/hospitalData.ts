export type Hospital = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
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

const streets = [
  "Fannin Street",
  "Main Street",
  "Westheimer Road",
  "Richmond Avenue",
  "Kirby Drive",
  "Bissonnet Street",
  "Memorial Drive",
  "Bellaire Boulevard",
];

function buildHospitals(prefix: string, count: number): Hospital[] {
  return Array.from({ length: count }, (_, index) => {
    const name = hospitalNames[index % hospitalNames.length];
    const city = cities[index % cities.length];
    const street = streets[index % streets.length];
    const streetNumber = 1200 + index * 37;

    return {
      id: `${prefix}-${index + 1}`,
      name: index < hospitalNames.length ? name : `${name} ${Math.floor(index / hospitalNames.length) + 1}`,
      city,
      state: "TX",
      address: `${streetNumber} ${street}, ${city}, TX ${77000 + (index % 900)}`,
      phone: `(713) ${String(200 + (index % 800)).padStart(3, "0")}-${String(1000 + index).slice(-4)}`,
      rating: Number(Math.max(1, 5 - (index % 5) * 0.8 + (index % 3) * 0.1).toFixed(1)),
      distance: Number((2.5 + (index % 24) * 3.8).toFixed(1)),
    };
  });
}

export const networkHospitals = buildHospitals("network", 80);

export const blacklistedHospitals = buildHospitals("blocked", 60);
