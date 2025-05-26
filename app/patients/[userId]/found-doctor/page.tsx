"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import doctors from "@/data/doctors.json";
import { FaUserMd, FaStar, FaBriefcase } from "react-icons/fa";
import { getPatient } from "@/lib/actions/patient.actions";

interface Doctor {
  name: string;
  image: string;
  specialty: string;
  quote: string;
  details?: string;
  rating: number;
  experience: number;
  specializations: string[];
}

const FoundDoctor = ({ params: { userId } }: SearchParamProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const disease = searchParams.get("disease") || "";
  const [patient, setPatient] = useState<{ name: string }>({ name: "" });

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patientData = await getPatient(userId);
      console.log('Patient data:', patientData);
      console.log('User ID:', userId);
      setPatient(patientData);
    };
    fetchPatient();
  }, [userId]);

  useEffect(() => {
    if (disease) {
      const normalizedDisease = disease.toLowerCase().replace(/\s+/g, "");
      const matchedDoctor = doctors.find((doc) =>
        doc.specializations.some(
          (s: string) =>
            s.toLowerCase().replace(/\s+/g, "") === normalizedDisease
        )
      );
      setDoctor(matchedDoctor || null);
    }
  }, [disease]);

  return (
    <div className="flex h-screen max-h-screen">
      <div className="remove-scrollbar container my-auto">
        <div className="flex items-center mb-12">
            <Image
              src="/assets/images/omnimed-logo.webp"
              height={3000}
              width={3000}
              alt="patient"
              className="h-10 w-fit"
            />
            <h1 className="ml-2 text-3xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">OmniMed</h1>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src="/assets/gifs/success.gif"
            alt="Success"
            width={150}
            height={150}
            className="rounded-full"
          />
          <h1 className="text-3xl font-bold text-green-500">
            🎉 {patient.name}, You&#39;re Matched with a Trusted Specialist!
          </h1>
          <p className="text-gray-600">
            Based on your condition <strong className="capitalize">{disease}</strong>, 
            we&#39;ve connected you with a doctor who has the right experience and background to support your recovery.
          </p>
        </div>

        {doctor ? (
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-green-200"
              />
              <div className="flex-1 space-y-2 text-left">
                <h2 className="text-xl font-semibold text-green-500 flex items-center gap-2">
                  <FaUserMd /> {doctor.name}
                </h2>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="italic text-gray-700">&quot;{doctor.quote}&quot;</p>

                {doctor.details && (
                  <p className="text-sm text-gray-700 mt-3">
                    {doctor.details}
                  </p>
                )}

                <div className="flex gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {doctor.rating} rating
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase /> {doctor.experience} yrs experience
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  localStorage.setItem("matchedDoctor", JSON.stringify(doctor));
                  router.push(`/patients/${userId}/new-appointment`)}}
                className="bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-400 transition"
              >
                📅 Book Appointment with Dr. {doctor.name.split(" ")[1]}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            Sorry, no doctor found for <strong>{disease}</strong>. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};
export default FoundDoctor;