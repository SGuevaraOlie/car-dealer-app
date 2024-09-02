'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Vehicle Types Data:', data); // Agregado para depuración
        setVehicleTypes(data.Results);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsRange = Array.from(
      { length: currentYear - 2014 },
      (_, i) => currentYear - i
    );
    setYears(yearsRange);
  }, []);

  const handleNext = () => {
    if (selectedType && selectedYear) {
      const selectedVehicle = vehicleTypes.find(
        (type) => type.MakeName === selectedType
      );
      if (selectedVehicle) {
        router.push(`/result/${selectedVehicle.MakeId}/${selectedYear}`);
      } else {
        console.error('Selected vehicle type not found');
      }
    }
  };

  return (
    <div className="min-h-screen bg-home bg-cover bg-center flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md mb-4 mx-4 xl:mx-0">
        <h1 className="text-5xl text-gray-700 font-bold mb-4 text-center">
          Car Dealer App
        </h1>
      </div>
      <div className="bg-white p-8 rounded shadow-md max-w-md mx-4 xl:mx-0">
        <h1 className="text-2xl text-gray-700 font-bold mb-4 text-center">
          Search Models
        </h1>
        <div className="mb-4">
          <label htmlFor="vehicleType" className="block text-gray-700">
            Vehicle Type:
          </label>
          <select
            id="vehicleType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-700"
          >
            <option value="">Select a vehicle type</option>
            {vehicleTypes.map((type) => (
              <option
                key={type.MakeId}
                value={type.MakeName}
                className="text-gray-700"
              >
                {type.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700">
            Model Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-700"
          >
            <option value="">Select a model year</option>
            {years.map((year) => (
              <option key={year} value={year} className="text-gray-700">
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              selectedType && selectedYear
                ? ''
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!selectedType || !selectedYear}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
