import { LeafIcon, SearchIcon, SunIcon } from "lucide-react"

export default function FeatureCards() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<LeafIcon className="h-12 w-12 text-green-500" />}
            title="Upload or Capture"
            description="Start by uploading an image or capturing a photo of the plant you want to identify."
          />
          <FeatureCard
            icon={<SearchIcon className="h-12 w-12 text-green-500" />}
            title="AI Analysis"
            description="Our advanced AI analyzes the image to recognize the plant and gather essential information."
          />
          <FeatureCard
            icon={<SunIcon className="h-12 w-12 text-green-500" />}
            title="Get Info"
            description="Receive detailed information about the plant, including its name, scientific name, family, and care instructions."
          />
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">{title}</h3>
      <p className="text-green-600 text-center">{description}</p>
    </div>
  )
}