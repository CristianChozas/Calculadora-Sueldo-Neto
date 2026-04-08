import { ImageResponse } from "next/og";

export const alt = "Calculadora Sueldo Neto 2025";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #fbfbfc 0%, #eef4fa 100%)",
          color: "#17324d",
          padding: "64px",
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 18px",
              border: "1px solid #dfe5ec",
              background: "rgba(255,255,255,0.8)",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Simulador salarial
          </div>
          <h1 style={{ fontSize: 72, lineHeight: 1.02, margin: 0, maxWidth: 860 }}>
            Calculadora de sueldo neto 2025
          </h1>
          <p style={{ fontSize: 30, lineHeight: 1.4, margin: 0, maxWidth: 860, color: "#3b5f86" }}>
            IRPF, Seguridad Social, desglose visual y una experiencia lista para portfolio.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#66788d",
          }}
        >
          <span>Next.js 16 · React 19 · TypeScript</span>
          <span>Cristian Chozas Diaz</span>
        </div>
      </div>
    ),
    size,
  );
}
