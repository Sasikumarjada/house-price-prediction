import React, { useState } from 'react';
import { Home, BedDouble, Bath, DoorOpen, Calculator, Building2, LayoutDashboard, MapPin, Ruler } from 'lucide-react';
import { predictPrice, formatCurrency } from '../utils/prediction';
import { areaCoefficients, averagePropertySizes, HyderabadArea } from '../utils/hyderabadData';
import ResultCard from './ResultCard';

type ModelType = 'xgboost' | 'logistic';
type PropertyType = 'apartment' | 'house';

export default function PredictionForm() {
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [rooms, setRooms] = useState(6);
  const [floor, setFloor] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [hasBalcony, setHasBalcony] = useState(false);
  const [model, setModel] = useState<ModelType>('xgboost');
  const [area, setArea] = useState<HyderabadArea>('Gachibowli');
  const [squareFootage, setSquareFootage] = useState(averagePropertySizes[3]);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = () => {
    const price = predictPrice(bedrooms, bathrooms, rooms, model, {
      floor,
      propertyType,
      hasBalcony,
      area,
      squareFootage
    });
    setPrediction(price);
  };

  const handleBedroomChange = (newBedrooms: number) => {
    setBedrooms(newBedrooms);
    setSquareFootage(averagePropertySizes[newBedrooms as keyof typeof averagePropertySizes] || squareFootage);
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <Home className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Hyderabad Property Predictor</h2>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 text-blue-500" />
              Area
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as HyderabadArea)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(areaCoefficients).map((areaName) => (
                <option key={areaName} value={areaName}>
                  {areaName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <BedDouble className="w-4 h-4 text-blue-500" />
              Bedrooms
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={bedrooms}
              onChange={(e) => handleBedroomChange(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Bath className="w-4 h-4 text-blue-500" />
              Bathrooms
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <DoorOpen className="w-4 h-4 text-blue-500" />
              Total Rooms
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Ruler className="w-4 h-4 text-blue-500" />
              Square Footage
            </label>
            <input
              type="number"
              min="500"
              max="10000"
              value={squareFootage}
              onChange={(e) => setSquareFootage(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Building2 className="w-4 h-4 text-blue-500" />
              Floor Number
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Property Type</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="apartment"
                  checked={propertyType === 'apartment'}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Apartment</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="house"
                  checked={propertyType === 'house'}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>House</span>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hasBalcony}
              onChange={(e) => setHasBalcony(e.target.checked)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <LayoutDashboard className="w-4 h-4 text-blue-500" />
              Has Balcony
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Prediction Model
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="xgboost"
                  checked={model === 'xgboost'}
                  onChange={(e) => setModel(e.target.value as ModelType)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>XGBoost</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="logistic"
                  checked={model === 'logistic'}
                  onChange={(e) => setModel(e.target.value as ModelType)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Logistic Regression</span>
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handlePredict}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02]"
        >
          <Calculator className="w-5 h-5" />
          Calculate Price
        </button>

        {prediction !== null && (
          <ResultCard
            prediction={prediction}
            model={model}
            details={{
              bedrooms,
              bathrooms,
              rooms,
              floor,
              propertyType,
              hasBalcony,
              area,
              squareFootage
            }}
          />
        )}
      </div>
    </div>
  );
}