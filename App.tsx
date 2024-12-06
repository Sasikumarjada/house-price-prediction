import React from 'react';
import PredictionForm from './components/PredictionForm';
import { Building } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Building className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Smart Property Valuator
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Advanced AI-powered real estate price predictions using XGBoost and Logistic Regression
          </p>
        </div>
        <PredictionForm />
      </div>
    </div>
  );
}

export default App;