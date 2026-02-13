import { useState, useRef } from "react";

type CharacterId = "waldo" | "odlaw" | "wenda" | "wizard";

interface CapturePoint {
  imageId: string;
  characterId: CharacterId;
  x: number;
  y: number;
  radius: number;
}

interface Props {
  imageSrc: string;
  imageId: string;
}

const CoordinateCaptureMode = ({ imageSrc, imageId }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [points, setPoints] = useState<CapturePoint[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();

    // Normalize click to original pixel space
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    // Ask for radius
    const radiusInput = prompt("Radius (px):", "30");
    const radius = radiusInput ?parseInt(radiusInput, 10) : NaN;
    if (isNaN(radius) || radius <= 0) {
      alert("Invalid radius");
      return;
    };

    // Ask for character
    const characterInput = prompt("Character (waldo, odlaw, wenda, wizard):"
    ) as CharacterId | null;
    if (!characterInput ||
      !["waldo", "odlaw", "wenda", "wizard"].includes(characterInput)
    ) {
      alert("Invalid character");
      return;
    }

    const point: CapturePoint = {
      imageId,
      characterId: characterInput,
      x,
      y,
      radius,
    };

    setPoints((prev) => [...prev, point]);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(points, null, 2));
    alert("Copied JSON!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Coordinate Capture Mode — {imageId}</h2>

      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          ref={imgRef}
          src={imageSrc}
          onClick={handleClick}
          style={{ imageRendering: "pixelated", cursor: "crosshair" }}
        />

        {points.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 10,
              height: 10,
              background: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        {JSON.stringify(points, null, 2)}
      </pre>

      <button onClick={copyJson}>Copy JSON</button>
    </div>
  );
}

export default CoordinateCaptureMode;