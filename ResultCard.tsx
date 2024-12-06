import React from 'react';
import { formatCurrency } from '../utils/prediction';
import { TrendingUp, Info, MapPin, Ruler } from 'lucide-react';
import { HyderabadArea } from '../utils/hyderabadData';

interface ResultCardProps {
  prediction: number;
  model: 'xgboost' | 'logistic';
  details: {
    bedrooms: number;
    bathrooms: number;
    rooms: number;
    floor: number;
    propertyType: 'apartment' | 'house';
    hasBalcony: boolean;
    area: HyderabadArea;
    squareFootage: number;
  };
}

export default function ResultCard({ prediction, model, details }: ResultCardProps) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">Prediction Results</h3>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {formatCurrency(prediction)}
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{details.area}</span>
          <span className="mx-2">•</span>
          <Ruler className="w-4 h-4" />
          <span>{details.squareFootage} sq ft</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Based on {model === 'xgboost' ? 'XGBoost' : 'Logistic Regression'} model
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Property Summary:</span>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <li>• {details.bedrooms} Bedrooms</li>
          <li>• {details.bathrooms} Bathrooms</li>
          <li>• {details.rooms} Total Rooms</li>
          <li>• {details.propertyType === 'apartment' ? `Floor ${details.floor}` : 'House'}</li>
          <li>• {details.hasBalcony ? 'With Balcony' : 'No Balcony'}</li>
          <li>• {formatCurrency(prediction / details.squareFootage)}/sq ft</li>
        </ul>
      </div>
    </div>
  );
}