import { notFound } from "next/navigation";

const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${name}`);
  if (!res.ok) return null;
  return res.json();
};

const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io?name=${name}`);
  if (!res.ok) return null;
  return res.json();
};

const getPredictedNationality = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io?name=${name}`);
  if (!res.ok) return null;
  return res.json();
};

// ✅ Use Next.js inferred type for params
const Prediction = async ({ params }: { params: { name: string } }) => {
  if (!params.name) return notFound(); // Handle missing params

  const [age, gender, nationality] = await Promise.all([
    getPredictedAge(params.name),
    getPredictedGender(params.name),
    getPredictedNationality(params.name),
  ]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Personal Info
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Age: {age?.age ?? "Unknown"}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Gender: {gender?.gender ?? "Unknown"}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Nationality: {nationality?.country?.[0]?.country_id ?? "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
