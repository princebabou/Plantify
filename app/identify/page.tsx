"use client"

import { useState, useRef, useCallback } from "react"
import Link from 'next/link'
import { CameraIcon, UploadIcon, LeafIcon } from "lucide-react"
import { useDropzone } from 'react-dropzone'
import PlantIdentifier from "../components/PlantIdentifier"

export default function IdentifyPage() {
  const [image, setImage] = useState<File | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImage(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleCaptureClick = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.current.srcObject = stream
    videoRef.current.play()

    setTimeout(() => {
      if (!videoRef.current || !canvasRef.current) return
      const context = canvasRef.current.getContext("2d")
      if (!context) return

      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      videoRef.current.pause()
      stream.getTracks().forEach((track) => track.stop())

      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.png", {
            type: "image/png",
          })
          setImage(file)
        }
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="container mx-auto px-2 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-green-800">
            Planti<span className="text-green-600">ify</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
          <div 
            {...getRootProps()} 
            className={`mb-12 p-16 border-4 border-dashed rounded-2xl text-center cursor-pointer transition duration-300 ease-in-out ${
              isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
            }`}
          >
            <input {...getInputProps()} />
            <LeafIcon className="mx-auto h-24 w-24 text-green-500 mb-6" />
            {isDragActive ? (
              <p className="text-green-600 text-xl font-semibold">Drop the image here ...</p>
            ) : (
              <p className="text-gray-600 text-xl">Drag and drop an image here, or click to select a file</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center text-lg"
            >
              <UploadIcon className="h-6 w-6 mr-3" />
              Upload an Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={handleCaptureClick}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center text-lg"
            >
              <CameraIcon className="h-6 w-6 mr-3" />
              Capture an Image
            </button>
          </div>
          {image && <PlantIdentifier image={image} />}
        </div>
      </main>

      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
    </div>
  )
}