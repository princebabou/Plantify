"use client";

import { useState } from "react";
import PlantIdentifier from "./components/PlantIdentifier";
import { ArrowCircleUpIcon, ArrowNarrowUpIcon, CameraIcon, PhotographIcon } from "@heroicons/react/outline";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-24 bg-gradient-to-r from-green-400 to-green-500">
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold text-white cursor-pointer"
        onClick={() => window.location.reload()}
        >Plant<span className="text-green-900">ify</span>
        </h1>
      </div>
  
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-white"></h1>
        <div className="bg-green-700 p-8 rounded-lg shadow-lg text-white text-center">
          <PhotographIcon className="h-10 w-10 mx-auto mb-2" />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-white font-bold py-2 px-4 rounded-md text-center w-full block mb-4"
          >
            Upload an Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image && <PlantIdentifier image={image} />}
        </div>
      </div>
    </main>
  );
  
}
