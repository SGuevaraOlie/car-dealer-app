export async function generateStaticParams() {
  const response = await fetch(
    '${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json'
  );
  const data = await response.json();
  const vehicleTypes = data.Results;

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  const paths = [];
  vehicleTypes.forEach((type) => {
    years.forEach((year) => {
      paths.push({
        params: { makeId: type.MakeId.toString(), year: year.toString() },
      });
    });
  });
  return { paths, fallback: 'blocking' };
}
