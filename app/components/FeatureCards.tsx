import {
  UploadIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

export default function FeatureCards() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl leading-9 font-extrabold mt-10">
            ☘️HOW IT WORKS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white- shadow-2xl rounded-lg p-6 text-center text-white">
            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-green-800 rounded-full">
              <UploadIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-4 text-green-600 text-xl leading-6 font-semibold">
              Upload or Capture an Image of a Plant
            </h3>
            <p className="mt-2">
              Start by uploading an image or capturing a photo of the plant you
              want to identify.
            </p>
          </div>

          <div className="bg-white- shadow-2xl rounded-lg p-6 text-center text-white">
            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-green-800 rounded-full">
              <CogIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-4 text-green-600 text-xl leading-6 font-semibold">
              AI Analysis
            </h3>
            <p className="mt-2">
              Our advanced AI analyzes the image to recognize the plant and
              gather essential information.
            </p>
          </div>

          <div className="bg-white- shadow-2xl rounded-lg p-6 text-center text-white">
            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-green-800 rounded-full">
              <InformationCircleIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-4 text-xl text-green-600 leading-6 font-semibold">Get Info</h3>
            <p className="mt-2">
              Receive detailed information about the plant, including its name,
              scientific name, family, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
