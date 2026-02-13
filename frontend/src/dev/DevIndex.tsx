import { useEffect, useState } from "react";

interface ImageMeta {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export default function DevIndex() {
  const [images, setImages] = useState<ImageMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load images:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading images…</div>;
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Dev Tools</h1>
      <p>Select an image to open coordinate capture mode.</p>

      <ul style={{ lineHeight: "1.8" }}>
        {images.map((img) => (
          <li key={img.id}>
            <a
              href={`/dev/capture?imageId=${img.id}`}
              style={{ textDecoration: "none", color: "#0366d6" }}
            >
              {img.name || "Untitled"} — {img.id}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
