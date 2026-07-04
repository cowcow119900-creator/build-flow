import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Build Flow | 고객을 만드는 웹 솔루션";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadKoreanFont(): Promise<ArrayBuffer | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/fonts/NotoSansKR-Bold.woff"));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const fontData = await loadKoreanFont();

  const fontOptions = fontData
    ? [{ name: "NotoSansKR", data: fontData, weight: 700 as const, style: "normal" as const }]
    : [];

  const bodyFont = fontData ? "NotoSansKR, sans-serif" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0a1628 0%, #1a2f5e 55%, #0d1f40 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: bodyFont,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: 120,
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "rgba(29, 91, 231, 0.12)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -40,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(74, 127, 245, 0.10)",
            filter: "blur(50px)",
          }}
        />

        {/* Decorative BF watermark */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: "50%",
            transform: "translateY(-50%)",
            width: 220,
            height: 220,
            borderRadius: 52,
            background: "rgba(29, 91, 231, 0.08)",
            border: "2px solid rgba(29, 91, 231, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "rgba(29, 91, 231, 0.35)",
              fontWeight: 900,
              fontSize: 96,
              letterSpacing: -4,
              fontFamily: "sans-serif",
            }}
          >
            BF
          </span>
        </div>

        {/* Top: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "linear-gradient(135deg, #1d5be7 0%, #1849c8 100%)",
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: -1,
                fontFamily: "sans-serif",
              }}
            >
              BF
            </span>
          </div>
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 26,
              letterSpacing: -0.5,
              fontFamily: "sans-serif",
            }}
          >
            Build Flow
          </span>
        </div>

        {/* Middle: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 820 }}>
          <div
            style={{
              color: "rgba(147, 197, 253, 0.75)",
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            홈페이지가 아니라,
          </div>
          <div
            style={{
              color: "#60a5fa",
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            고객을 만드는
          </div>
          <div
            style={{
              color: "white",
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            디지털 시스템을 만듭니다.
          </div>
        </div>

        {/* Bottom: Stats + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {/* Stats */}
          <div style={{ display: "flex", gap: 48 }}>
            {[
              { num: "120+", label: "구축 프로젝트" },
              { num: "98%", label: "재계약률" },
              { num: "3년+", label: "운영 경력" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: 34,
                    fontFamily: "sans-serif",
                  }}
                >
                  {s.num}
                </span>
                <span style={{ color: "rgba(147, 197, 253, 0.65)", fontSize: 16 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              background: "rgba(29, 91, 231, 0.25)",
              border: "1px solid rgba(29, 91, 231, 0.45)",
              borderRadius: 10,
              padding: "10px 22px",
              color: "#93c5fd",
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            buildflow.kr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontOptions,
    }
  );
}
