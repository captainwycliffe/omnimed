"use client"

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { getPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface PredictionData {
  predicted_disease: string;
  disease_description: string;
  precautions: string[];
  medications: string[];
  recommended_diet: string[];
  recommended_workout: string;
}

const DiseasePredictionPage: React.FC = ({ params: { userId } }: SearchParamProps) => {
  const router = useRouter();
  const patient = getPatient(userId);
  
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = () => {
    router.push(`/patients/${userId}/found-doctor?disease=${prediction?.predicted_disease}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Sending request with symptoms:', symptoms.split(','));
      
      const response = await fetch('https://disease-prediction-and-medical.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms.split(',') }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container my-auto p-6 w-full max-w-3xl">
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
        <h1 className="text-center text-3xl font-bold text-green-400 mb-6">Disease Prediction Portal</h1>
        <form onSubmit={handleSubmit} className="flex flex-col bg-gradient-to-br from-white to-green-500 p-6 rounded-xl shadow">
          <label htmlFor="symptoms" className="mb-1 text-gray-600 text-sm font-medium">
            Enter Symptoms (comma-separated):
          </label>
          <input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., cough, fatigue, chest pain"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-500 transition duration-300"
          >
            {loading ? 'Analyzing Symptoms...' : 'Predict Disease'}
          </button>
        </form>
  
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
  
        {prediction && (
          <motion.div
            className="bg-white rounded-2xl shadow p-8 space-y-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-green-500">🩺 Personalized Health Insights</h2>
  
            <motion.div
              className="space-y-6 text-gray-800"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-semibold text-green-500">Predicted Condition:</h3>
                <p className="text-lg font-medium">{prediction.predicted_disease}</p>
                <p className="text-sm italic text-gray-500">
                  This is our preliminary analysis based on your provided symptoms. Always confirm with a certified physician.
                </p>
              </motion.div>
  
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-semibold text-green-500">Medical Overview:</h3>
                <p>{prediction.disease_description}</p>
                <p className="text-sm text-gray-500 italic mt-1">
                  Understanding your condition is the first step toward managing it effectively. We're here to guide you.
                </p>
              </motion.div>
  
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-semibold text-green-500">Precautionary Measures:</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {prediction.precautions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic mt-1">
                  These actions are designed to reduce risks and keep your health stable. Stay consistent and be kind to your body.
                </p>
              </motion.div>
  
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-semibold text-green-500">Medications (if advised):</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {prediction.medications.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic mt-1">
                  These medications are commonly used for treatment. Always consult your doctor before starting any medication plan.
                </p>
              </motion.div>
  
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-semibold text-green-500">Diet Recommendations:</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {prediction.recommended_diet.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic mt-1">
                  Fuel your recovery with foods rich in nutrients. This diet is tailored to support your immune system and healing process.
                </p>
              </motion.div>
  
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-semibold text-green-500">Workout Plan:</h3>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  {prediction.recommended_workout}
                </div>
                <p className="text-sm text-gray-500 italic mt-1">
                  Movement is medicine too. This fitness plan is designed to be gentle yet effective—take it at your own pace.
                </p>
              </motion.div>
            </motion.div>
  
            <div className="text-center mt-6">
              <button
                onClick={handleMatch}
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition"
              >
                🔍 Find Matching Doctor
              </button>
            </div>
          </motion.div>
        )}
      </section>
  
      <img
        src="https://media.giphy.com/media/xnDVd93DMnOLK/giphy.gif?cid=790b7611ny7ip5mxsw4ty2cgfqzdwsctqd1q8fdr75ighyr3&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        alt="Medical animation"
        className="side-img max-w-[400px] max-h-screen bg-bottom"
      />
    </div>
  );
};

export default DiseasePredictionPage;