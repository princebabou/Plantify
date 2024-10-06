import Link from 'next/link'
import { ArrowRightIcon, LeafIcon, SearchIcon, SunIcon } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-800">
            Planti<span className="text-green-600">ify</span>
          </h1>
          <Link
            href="/identify"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-bold text-green-800 mb-8 leading-tight">
            Discover the <span className="text-green-600">World of Plants</span>
          </h2>
          <p className="text-xl text-green-700 mb-12 max-w-2xl mx-auto">
            Identify, learn, and connect with nature using AI-powered plant recognition
          </p>
          <Link
            href="/identify"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            Start Identifying
            <ArrowRightIcon className="ml-3 h-6 w-6" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<LeafIcon className="h-16 w-16 text-green-500" />}
            title="Instant Plant Identification"
            description="Upload a photo or take a picture to instantly identify plants, flowers, and trees."
          />
          <FeatureCard
            icon={<SearchIcon className="h-16 w-16 text-green-500" />}
            title="Detailed Information"
            description="Get comprehensive details about each plant, including scientific names, care instructions, and fun facts."
          />
          <FeatureCard
            icon={<SunIcon className="h-16 w-16 text-green-500" />}
            title="Care Guidance"
            description="Learn how to properly care for your plants with tailored advice and tips."
          />
        </div>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <div className="flex justify-center mb-8">{icon}</div>
      <h3 className="text-2xl font-semibold text-green-800 mb-4 text-center">{title}</h3>
      <p className="text-green-600 text-center">{description}</p>
    </div>
  )
}