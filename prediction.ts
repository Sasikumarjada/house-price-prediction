import { areaCoefficients, baseSquareFootPrices, averagePropertySizes, HyderabadArea } from './hyderabadData';

interface PropertyDetails {
  floor: number;
  propertyType: 'apartment' | 'house';
  hasBalcony: boolean;
  area: HyderabadArea;
  squareFootage: number;
}

const coefficients = {
  xgboost: {
    bedrooms: 1.2,
    bathrooms: 1.15,
    rooms: 1.1,
    floor: 0.02,
    propertyTypeMultiplier: {
      apartment: 0.95,
      house: 1.25
    },
    balconyBonus: 0.05
  },
  logistic: {
    bedrooms: 1.15,
    bathrooms: 1.1,
    rooms: 1.05,
    floor: 0.015,
    propertyTypeMultiplier: {
      apartment: 0.9,
      house: 1.2
    },
    balconyBonus: 0.04
  }
};

export const predictPrice = (
  bedrooms: number,
  bathrooms: number,
  rooms: number,
  model: 'xgboost' | 'logistic',
  details: PropertyDetails
): number => {
  const coef = coefficients[model];
  const areaCoef = areaCoefficients[details.area];
  const basePrice = baseSquareFootPrices[details.area];
  
  // Calculate base price based on area and square footage
  let price = basePrice * details.squareFootage;

  // Apply area coefficient
  price *= areaCoef;

  // Apply room-based multipliers
  price *= (1 + (bedrooms * coef.bedrooms - 1));
  price *= (1 + (bathrooms * coef.bathrooms - 1));
  price *= (1 + (rooms * coef.rooms - 1));

  // Add floor premium for apartments
  if (details.propertyType === 'apartment') {
    price *= (1 + (details.floor * coef.floor));
  }

  // Apply property type multiplier
  price *= coef.propertyTypeMultiplier[details.propertyType];

  // Add balcony bonus
  if (details.hasBalcony) {
    price *= (1 + coef.balconyBonus);
  }

  return Math.round(price);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};