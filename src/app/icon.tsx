import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #1d5be7 0%, #1849c8 100%)",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: -0.5,
            fontFamily: "sans-serif",
          }}
        >
          BF
        </span>
      </div>
    ),
    { ...size }
  );
}
