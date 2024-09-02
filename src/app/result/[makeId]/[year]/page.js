'use client';

import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
const VehicleCard = React.lazy(() => import('@/app/components/VehicleCard'));

const ResultPage = ({ params }) => {
  const { makeId, year } = params;
  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicleModels(data.Results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleModels();
  }, [makeId, year]);

  return (
    <div className="bg-result bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center py-4 xl:py-4 mx-4 xl:mx-0">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <h1 className="text-2xl text-gray-700 font-bold mb-4 text-center">
            Vehicle Models for {year}
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Suspense
            fallback={<p className="text-gray-500 text-center">Loading...</p>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <p className="text-gray-500 text-center">Loading...</p>
              ) : vehicleModels.length === 0 ? (
                <p className="text-gray-500 text-center">No models found</p>
              ) : (
                vehicleModels.map((model) => (
                  <VehicleCard key={model.ModelId} model={model} />
                ))
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
