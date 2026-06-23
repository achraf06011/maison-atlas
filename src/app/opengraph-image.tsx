import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maison Atlas Premium — Restaurant Gastronomique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f5f2ea",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 16,
            textTransform: "uppercase",
            color: "#c9a227",
          }}
        >
          Restaurant Gastronomique
        </div>
        <div style={{ fontSize: 130, fontWeight: 700, marginTop: 20 }}>
          Maison Atlas
        </div>
        <div
          style={{
            width: 160,
            height: 2,
            background: "#c9a227",
            marginTop: 30,
            marginBottom: 30,
          }}
        />
        <div style={{ fontSize: 30, letterSpacing: 24, color: "#c9a227" }}>
          PREMIUM
        </div>
      </div>
    ),
    { ...size }
  );
}
