"use client"

import { useState, useEffect } from "react"
import { GoogleGenerativeAI, Part } from "@google/generative-ai"
import Image from 'next/image'
import { Loader2, LeafIcon, InfoIcon, BookOpenIcon, TreesIcon, FileTextIcon, HeartIcon, SparklesIcon, ShareIcon } from "lucide-react"

interface PlantIdentifierProps {
  image: File
}

interface PlantInfo {
  name: string
  scientificName: string
  family: string
  description: string
  care: string
  funFacts: string
}

export default function PlantIdentifier({ image }: PlantIdentifierProps) {
  const [result, setResult] = useState<PlantInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [shareResult, setShareResult] = useState<string | null>(null)

  useEffect(() => {
    const identifyPlant = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        if (!apiKey) {
          throw new Error("Google API key is not set")
        }
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const imageParts = await fileToGenerativePart(image)
        const result = await model.generateContent([
          "Identify this plant and provide important information about it. Return the information in JSON format with the following properties: name, scientificName, family, description, care, funFacts. Keep each property's value concise, about 2-3 sentences. Do not include any markdown formatting in the response.",
          imageParts,
        ])
        const response = await result.response
        const text = response.text()
      
        const jsonStr = text.replace(/```json\s?|\s?```/g, '').trim()
        const plantInfo = JSON.parse(jsonStr)
        setResult(plantInfo)
        setImageUrl(URL.createObjectURL(image))
        setShareResult(`I just identified a ${plantInfo.name} using Plantify! Scientific name: ${plantInfo.scientificName}. Learn more about plants at [Your App URL]`)
      } catch (error) {
        console.error("Error identifying plant:", error)
        setError("An error occurred while identifying the plant. Please try again.")
        setResult(null)
        setShareResult(null)
      }
      setLoading(false)
    }

    identifyPlant()
  }, [image])

  async function fileToGenerativePart(file: File): Promise<Part> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64Data = reader.result as string
        resolve({
          inlineData: {
            data: base64Data.split(",")[1],
            mimeType: file.type,
          },
        })
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleShare = async () => {
    if (!shareResult) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plant Identification Result',
          text: shareResult,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareResult)
      alert('Share text copied to clipboard!')
    }
  }

  return (
    <div className="mt-12">
      {loading ? (
        <div className="flex justify-center items-center p-16 bg-green-50 rounded-2xl">
          <Loader2 className="h-16 w-16 text-green-600 animate-spin" />
          <span className="ml-6 text-green-600 font-semibold text-2xl">Identifying plant...</span>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 text-red-600 rounded-2xl text-center">
          <InfoIcon className="h-16 w-16 mx-auto mb-6 text-red-500" />
          <p className="text-xl font-semibold">{error}</p>
        </div>
      ) : result ? (
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="relative w-full h-80 sm:h-96">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Uploaded plant"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-8 sm:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-green-800">{result.name}</h2>
              <button 
                onClick={handleShare}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <InfoSection 
                icon={<BookOpenIcon className="h-6 w-6 text-green-600" />}
                title="Scientific Name" 
                content={result.scientificName} 
              />
              <InfoSection 
                icon={<TreesIcon className="h-6 w-6 text-green-600" />}
                title="Family" 
                content={result.family} 
              />
              <InfoSection 
                icon={<FileTextIcon className="h-6 w-6 text-green-600" />}
                title="Description" 
                content={result.description} 
              />
              <InfoSection 
                icon={<HeartIcon className="h-6 w-6 text-green-600" />}
                title="Care Instructions" 
                content={result.care} 
              />
              <InfoSection 
                icon={<SparklesIcon className="h-6 w-6 text-green-600" />}
                title="Fun Facts" 
                content={result.funFacts} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 bg-green-50 rounded-2xl">
          <LeafIcon className="h-32 w-32 text-green-600 mb-8" />
          <p className="text-green-800 text-3xl font-semibold text-center">
            Upload or capture an image to identify a plant
          </p>
        </div>
      )}
    </div>
  )
}

interface InfoSectionProps {
  icon: JSX.Element;
  title: string;
  content: string;
}

function InfoSection({ icon, title, content }: InfoSectionProps) {
  return (
    <div className="bg-green-50 p-6 rounded-xl">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-xl sm:text-2xl font-semibold text-green-800 ml-3">{title}</h3>
      </div>
      <p className="text-green-700 text-base sm:text-lg leading-relaxed">{content}</p>
    </div>
  )
}