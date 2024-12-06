// Hyderabad area coefficients based on real estate market analysis
export const areaCoefficients = {
  'Gachibowli': 1.8,
  'HITEC City': 2.0,
  'Jubilee Hills': 2.5,
  'Banjara Hills': 2.4,
  'Madhapur': 1.9,
  'Kondapur': 1.7,
  'Kukatpally': 1.5,
  'Manikonda': 1.4,
  'Miyapur': 1.3,
  'Nallagandla': 1.6,
  'Financial District': 1.9,
  'Nanakramguda': 1.7
} as const;

export type HyderabadArea = keyof typeof areaCoefficients;

// Base prices in INR for different areas (per sq ft)
export const baseSquareFootPrices = {
  'Gachibowli': 6500,
  'HITEC City': 7000,
  'Jubilee Hills': 12000,
  'Banjara Hills': 11000,
  'Madhapur': 6800,
  'Kondapur': 5500,
  'Kukatpally': 4500,
  'Manikonda': 4200,
  'Miyapur': 4000,
  'Nallagandla': 5000,
  'Financial District': 6800,
  'Nanakramguda': 5800
};

// Average property sizes in sq ft based on number of bedrooms
export const averagePropertySizes = {
  1: 650,
  2: 1000,
  3: 1600,
  4: 2200,
  5: 3000
};