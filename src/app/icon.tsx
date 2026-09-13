import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon PNG generado (con hash) para que el navegador no se quede con el triángulo cacheado. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D7EBF5",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F3EBE0",
            borderRadius: 4,
            border: "1.5px solid #D4C4AE",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              position: "relative",
              display: "flex",
              background: "#FFFAF3",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 2,
                top: 2,
                width: 5,
                height: 5,
                borderRadius: 99,
                background: "#F0D27A",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 2,
                top: 5,
                width: 3,
                height: 3,
                borderRadius: 99,
                background: "#E8A090",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 6,
                background: "#7EB8A2",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
