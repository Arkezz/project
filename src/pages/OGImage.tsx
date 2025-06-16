import React, { useState } from "react";
import NovelOGImage from "../components/og/NovelOGImage";
import NovelOGImageVariant2 from "../components/og/NovelOGImageVariant2";
import NovelOGImageVariant3 from "../components/og/NovelOGImageVariant3";

const mockNovel = {
  id: "1",
  title: "The Beginning After The End",
  originalTitle: "디 비기닝 애프터 디 엔드",
  author: "TurtleMe",
  cover:
    "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
  rating: 4.7,
  status: "Ongoing" as const,
  chapters: 420,
  readers: 125000,
  genres: ["Fantasy", "Action", "Adventure", "Magic", "Reincarnation"],
  language: "kr" as const,
};

const variants = [
  { name: "Light & Elegant", component: NovelOGImage },
  { name: "Modern & Clean", component: NovelOGImageVariant2 },
  { name: "Dark & Premium", component: NovelOGImageVariant3 },
];

export default function NovelOGPreview() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const SelectedComponent = variants[selectedVariant].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Novel Open Graph Image Designs
          </h1>
          <p className="text-gray-600 mb-6">
            Preview different design variations for social media sharing
          </p>

          {/* Variant Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedVariant === index
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Container */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-center">
            <div className="transform scale-50 origin-top border border-gray-200 rounded-lg overflow-hidden shadow-xl">
              <SelectedComponent novel={mockNovel} />
            </div>
          </div>
        </div>

        {/* Design Notes */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Design Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-blue-600 mb-2">
                Light & Elegant
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Soft gradients and pastels</li>
                <li>• Clean typography hierarchy</li>
                <li>• Subtle decorative elements</li>
                <li>• Literary atmosphere</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-600 mb-2">
                Modern & Clean
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Split layout design</li>
                <li>• Floating UI elements</li>
                <li>• Contemporary styling</li>
                <li>• Interactive feel</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-purple-600 mb-2">
                Dark & Premium
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dark theme with glowing accents</li>
                <li>• Premium aesthetic</li>
                <li>• High contrast design</li>
                <li>• Gaming/tech inspired</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
