import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(135deg, #1d5be7 0%, #1849c8 100%)",
          borderRadius: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 76,
            letterSpacing: -3,
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
