import { useEffect, useState } from "react";
import CoordinateCaptureMode from "./CoordinateCaptureMode";

interface ImageMeta {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function CaptureRoute() {
  const params = new URLSearchParams(window.location.search);
  const imageId = params.get("imageId");

  const [image, setImage] = useState<ImageMeta | null>(null);

  useEffect(() => {
    if (!imageId) return;

    fetch(`/api/images/${imageId}`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error("Failed to load image metadata:", err));
  }, [imageId]);

  if (!imageId) {
    return <div style={{ padding: 20 }}>No imageId provided</div>;
  }

  if (!image) {
    return <div style={{ padding: 20 }}>Loading image metadata…</div>;
  }

  return (
    <CoordinateCaptureMode
      imageId={image.id}
      imageSrc={image.url}
    />
  );
}
