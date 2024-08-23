"use client";

import { useState, useEffect } from "react";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import Image from 'next/image';
import './PlantIdentifier.css'

interface PlantIdentifierProps {
  image: File;
}

interface PlantInfo {
  name: string;
  scientificName: string;
  family: string;
  description: string;
  care: string;
  funFacts: string;
}

export default function PlantIdentifier({ image }: PlantIdentifierProps) {
  const [result, setResult] = useState<PlantInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const identifyPlant = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        if (!apiKey) {
          throw new Error("Google API key is not set");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const imageParts = await fileToGenerativePart(image);
        const result = await model.generateContent([
          "Identify this plant and provide important information about it. Return the information in JSON format with the following properties: name, scientificName, family, description, care, funFacts. Keep each property's value concise, about 2-3 sentences. Do not include any markdown formatting in the response.",
          imageParts,
        ]);
        const response = await result.response;
        const text = response.text();
      
        const jsonStr = text.replace(/```json\s?|\s?```/g, '').trim();
        setResult(JSON.parse(jsonStr));
        setImageUrl(URL.createObjectURL(image));
      } catch (error) {
        console.error("Error identifying plant:", error);
        setResult(null);
      }
      setLoading(false);
    };

    identifyPlant();
  }, [image]);

  async function fileToGenerativePart(file: File): Promise<Part> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        resolve({
          inlineData: {
            data: base64Data.split(",")[1],
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="mt-4 max-w-4xl mx-auto">
      {loading ? (
        <div className="loader"></div>
        
      ) : result ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Uploaded plant"
                  width={300}
                  height={300}
                  className="h-48 object-cover md:h-full "
                />
              )}
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-green-600 mb-4">{result.name}</h1>
              <div className="space-y-4">
                <InfoSection title="Scientific Name" content={result.scientificName} />
                <InfoSection title="Family" content={result.family} />
                <InfoSection title="Description" content={result.description} />
                <InfoSection title="Care Instructions" content={result.care} />
                <InfoSection title="Fun Facts" content={result.funFacts} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InfoSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-green-600">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}