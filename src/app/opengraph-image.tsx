import { ImageResponse } from "next/og";

export const alt = "Syed Imran Shah | AI-Powered HR Professional & HR-Tech Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F172A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Blue accent bar */}
        <div
          style={{
            width: "52px",
            height: "5px",
            background: "#2563EB",
            borderRadius: "3px",
            marginBottom: "32px",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "68px",
            fontWeight: 700,
            color: "#F8FAFC",
            lineHeight: 1.1,
            marginBottom: "18px",
            letterSpacing: "-1px",
          }}
        >
          Syed Imran Shah
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#2563EB",
            marginBottom: "28px",
          }}
        >
          AI-Powered HR Professional · HR-Tech / HRMS Developer
        </div>

        {/* Pitch */}
        <div
          style={{
            fontSize: "20px",
            color: "#94A3B8",
            maxWidth: "820px",
            lineHeight: 1.5,
            marginBottom: "44px",
          }}
        >
          10+ years HR expertise + full-stack AI development ·
          Building production-grade HR systems that actually ship.
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["FastAPI", "Next.js 14", "LangGraph", "Claude API", "PostgreSQL"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(37,99,235,0.15)",
                  border: "1px solid rgba(37,99,235,0.35)",
                  color: "#93C5FD",
                  padding: "7px 18px",
                  borderRadius: "999px",
                  fontSize: "17px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Location badge bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            fontSize: "16px",
            color: "#475569",
          }}
        >
          Karachi · Open to UAE &amp; Germany
        </div>
      </div>
    ),
    size
  );
}
