import OGImageGenerator from "../components/og/OGImageGenerator";

export default function OGImage() {
  return (
    <OGImageGenerator
      novel={{
        title: "The Beginning After The End",
        author: "TurtleMe",
        publisher: "Tapas Media",
        releaseYear: 2018,
        totalChapters: 420,
        rating: 4.8,
        genres: ["Fantasy", "Action", "Adventure", "Romance"],
        coverImage:
          "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
      }}
    />
  );
}
