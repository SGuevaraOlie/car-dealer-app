const VehicleCard = ({ model }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border border-gray-300">
      <h2 className="text-xl text-center text-gray-700 font-bold mb-2">
        {model.Model_Name || 'No name available'}
      </h2>
    </div>
  );
};

export default VehicleCard;
