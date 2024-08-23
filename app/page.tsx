"use client";

import { useState, useRef } from "react";
import PlantIdentifier from "./components/PlantIdentifier";
import { CameraIcon, PhotographIcon } from "@heroicons/react/outline";
import FeatureCards from "./components/FeatureCards";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCaptureClick = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    setTimeout(() => {
      if (!videoRef.current || !canvasRef.current) return;
      const context = canvasRef.current.getContext("2d");
      if (!context) return;

      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      videoRef.current.pause();
      stream.getTracks().forEach((track) => track.stop());

      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.png", {
            type: "image/png",
          });
          setImage(file);
        }
      });
    }, 1000); 
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-24 bg-gradient-to-r from-green-400 to-green-500">
      <div className="absolute top-6 left-6">
        <h1
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Plant<span className="text-green-900">ify</span>
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-white"></h1>
        <div className="bg-white- p-8 rounded-lg shadow-2xl text-white text-center">
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center bg-green-600 p-6 rounded-md shadow-md">
              <PhotographIcon className="h-10 w-10 mb-2" />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-white font-bold py-2 px-4 rounded-md text-center block mb-4"
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
            </div>

            <div className="flex flex-col items-center bg-green-600 p-6 rounded-md shadow-md">
              <CameraIcon className="h-10 w-10 mb-2" />
              <button
                onClick={handleCaptureClick}
                className="cursor-pointer text-white font-bold py-2 px-4 rounded-md text-center block mb-4"
              >
                Capture an Image
              </button>
            </div>
          </div>
          {image && <PlantIdentifier image={image} />}
        </div>
      </div>

      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
      <FeatureCards />
    </main>
  );
}
