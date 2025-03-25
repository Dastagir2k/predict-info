const getPredictedAge = async (name: string) => {
  const response = await fetch(`https://api.agify.io?name=${name}`);
  return response.json();
};

const getPredictedGender = async (name: string) => {
  const response = await fetch(`https://api.genderize.io?name=${name}`);
  return response.json();
};

const getPredictedCountry = async (name: string) => {
  const response = await fetch(`https://api.nationalize.io?name=${name}`);
  return response.json();
};

interface PageProps {
  params: { name: string };
}

export default async function Page({ params }: PageProps) {
  const name = params.name || "N/A"; 
  const [ageData, genderData, countryData] = await Promise.all([
    getPredictedAge(name),
    getPredictedGender(name),
    getPredictedCountry(name),
  ]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Predicted Information for {name}
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Age:</span>
            <span>{ageData.age ?? "N/A"}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Gender:</span>
            <span>{genderData.gender ?? "N/A"}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Country:</span>
            <span>
              {countryData.country.length > 0
                ? countryData.country[0].country_id
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
