import React from "react";
import satori from "satori";
import { motion } from "framer-motion";
import OGImagePreview from "./OGImagePreview";

interface OGImageGeneratorProps {
  novel: {
    title: string;
    author: string;
    publisher: string;
    releaseYear: number;
    totalChapters: number;
    rating: number;
    genres: string[];
    coverImage?: string;
  };
}

export default function OGImageGenerator({ novel }: OGImageGeneratorProps) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateImage = async () => {
    try {
      setIsGenerating(true);

      // Create the SVG markup for satori
      const svg = await satori(
        <div
          style={{
            display: "flex",
            width: "1200px",
            height: "630px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(200, 37, 41, 0.3) 0%, transparent 50%, rgba(338, 71, 47, 0.2) 100%)",
              mixBlendMode: "overlay",
              display: "flex", // Added display: flex
            }}
          />

          {/* Content Container */}
          <div style={{ display: "flex", width: "100%", position: "relative" }}>
            {/* Left Panel */}
            <div
              style={{
                width: "60%",
                padding: "48px",
                background:
                  "linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "32px",
                }}
              >
                <span
                  style={{
                    background: "rgba(31, 41, 55, 0.5)",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    color: "#9ca3af",
                    fontSize: "14px",
                    display: "flex", // Added display: flex
                  }}
                >
                  {novel.releaseYear}
                </span>
                <span
                  style={{
                    background: "rgba(31, 41, 55, 0.5)",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    color: "#9ca3af",
                    fontSize: "14px",
                    display: "flex", // Added display: flex
                  }}
                >
                  {novel.totalChapters} Chapters
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "24px",
                  lineHeight: "1.2",
                  display: "flex", // Added display: flex
                }}
              >
                {novel.title}
              </h1>

              {/* Author & Publisher */}
              <div
                style={{
                  marginBottom: "32px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    color: "#d1d5db",
                    marginBottom: "8px",
                    fontWeight: "500",
                    display: "flex", // Added display: flex
                  }}
                >
                  {novel.author}
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    color: "#9ca3af",
                    display: "flex",
                  }}
                >
                  {novel.publisher}
                </p>
              </div>

              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "32px",
                  background: "rgba(31, 41, 55, 0.3)",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < novel.rating ? "#ffd700" : "#4b5563",
                      fontSize: "24px",
                      display: "flex", // Added display: flex
                    }}
                  >
                    ★
                  </span>
                ))}
                <span
                  style={{
                    color: "#d1d5db",
                    fontWeight: "500",
                    display: "flex",
                  }}
                >
                  ({novel.rating.toFixed(1)})
                </span>
              </div>

              {/* Genre Tags */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {novel.genres.slice(0, 4).map((genre) => (
                  <span
                    key={genre}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      background: "rgba(200, 37, 41, 0.2)",
                      color: "rgb(200, 37, 41)",
                      fontSize: "14px",
                      fontWeight: "500",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(200, 37, 41, 0.1)",
                      display: "flex", // Added display: flex
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div
              style={{
                width: "40%",
                position: "relative",
                overflow: "hidden",
                display: "flex", // Added display: flex
              }}
            >
              {novel.coverImage && (
                <>
                  <img
                    src={novel.coverImage}
                    alt={novel.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Layered Gradients */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, rgba(17, 24, 39, 0.8) 0%, transparent 100%)",
                      display: "flex", // Added display: flex
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(17, 24, 39, 0.6) 100%)",
                      display: "flex", // Added display: flex
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(200, 37, 41, 0.2) 0%, transparent 50%, rgba(338, 71, 47, 0.2) 100%)",
                      mixBlendMode: "overlay",
                      display: "flex", // Added display: flex
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>,
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: "Noto Sans",
              data: await fetch(
                "https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf",
              ).then((res) => res.arrayBuffer()),
            },
          ],
        },
      );

      // Convert SVG to PNG using browser's canvas
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Open Graph Image Preview</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateImage}
          disabled={isGenerating}
          className="btn-primary"
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </motion.button>
      </div>

      <div className="bg-gray-100 rounded-xl p-8 overflow-hidden">
        <div className="transform scale-50 origin-top-left">
          <OGImagePreview {...novel} />
        </div>
      </div>

      {imageUrl && (
        <div className="space-y-4">
          <h3 className="font-medium">Generated Image</h3>
          <img
            src={imageUrl}
            alt="Generated OG Image"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="flex justify-end">
            <a
              href={imageUrl}
              download="og-image.png"
              className="text-primary hover:underline text-sm"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
