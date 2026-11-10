import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND_HEADLINE, BRAND_TITLE, FLOW_ROUTE_PATH } from "@/lib/brand";

export const alt = BRAND_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/logo-mark.png"), "base64"),
    readFile(join(process.cwd(), "public/fonts/NotoSansKR-Bold.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          ...size,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "66px 76px",
          background: "linear-gradient(115deg, #081320 48%, #102b4d 100%)",
          color: "#f3f9ff",
          fontFamily: "NotoSansKR",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders a local data URI. */}
          <img alt="" src={`data:image/png;base64,${logo}`} width={64} height={64} style={{ borderRadius: 12 }} />
          Build Flow
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 82, lineHeight: 1.1, fontWeight: 700 }}>
          <span>{BRAND_HEADLINE[0]}</span>
          <span style={{ color: "#9bedff" }}>{BRAND_HEADLINE[1]}</span>
        </div>

        <div style={{ display: "flex", color: "#b8d1e7", fontSize: 24, fontWeight: 700 }}>
          설계 · 구축 · 운영
        </div>

        <div style={{ position: "absolute", top: 245, right: 58, display: "flex" }}>
          <svg width="475" height="160" viewBox="0 0 600 200" fill="none">
            <defs>
              <linearGradient id="share-flow" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#61e7fa" />
                <stop offset=".52" stopColor="#3bbcf5" />
                <stop offset="1" stopColor="#265dff" />
              </linearGradient>
            </defs>
            <path d={FLOW_ROUTE_PATH} stroke="url(#share-flow)" strokeWidth="10" strokeLinecap="round" />
            <circle cx="16" cy="58" r="7" fill="#b4f8ff" />
            <circle cx="584" cy="58" r="7" fill="#e6f3ff" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "NotoSansKR", data: font, weight: 700, style: "normal" }],
    },
  );
}
