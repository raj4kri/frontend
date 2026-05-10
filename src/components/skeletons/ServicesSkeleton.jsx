import React from "react";

function ServiceDetailSkeleton() {
  return (
    <div style={container}>
      <div style={left}>
        {/* HERO */}
        <div style={titleSkeleton}></div>
        <div style={subSkeleton}></div>

        {/* SECTION 1 */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={card}>
            <div style={sectionTitle}></div>

            <div style={line}></div>
            <div style={line}></div>
            <div style={{ ...line, width: "70%" }}></div>

            <div style={box}></div>
            <div style={box}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceDetailSkeleton;

/* ================= STYLES ================= */

const shimmer = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.5s infinite",
};

const container = {
  display: "flex",
  gap: "30px",
  padding: "20px",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  minHeight: "100vh",
};

const left = {
  flex: 1,
};

const titleSkeleton = {
  ...shimmer,
  height: "42px",
  width: "60%",
  borderRadius: "10px",
  marginBottom: "15px",
};

const subSkeleton = {
  ...shimmer,
  height: "18px",
  width: "40%",
  borderRadius: "8px",
  marginBottom: "30px",
};

const card = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const sectionTitle = {
  ...shimmer,
  height: "24px",
  width: "45%",
  borderRadius: "8px",
  marginBottom: "20px",
};

const line = {
  ...shimmer,
  height: "14px",
  width: "100%",
  borderRadius: "6px",
  marginBottom: "12px",
};

const box = {
  ...shimmer,
  height: "70px",
  width: "100%",
  borderRadius: "10px",
  marginTop: "15px",
};

/* SHIMMER ANIMATION */
const styleSheet = document.styleSheets[0];

const keyframes = `
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
`;

if (
  styleSheet &&
  [...styleSheet.cssRules].findIndex(
    (rule) => rule.name === "shimmer"
  ) === -1
) {
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}