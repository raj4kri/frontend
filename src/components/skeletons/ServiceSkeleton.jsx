function ServiceDetailSkeleton() {
  return (
    <div style={container}>
      <div style={left}>
        {/* HERO */}
        <div style={heroTitle}></div>
        <div style={heroSub}></div>

        {/* SECTIONS */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={section}>
            <div style={sectionHeading}></div>

            <div style={line}></div>
            <div style={line}></div>
            <div style={{ ...line, width: "70%" }}></div>

            <div style={card}></div>
            <div style={card}></div>
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
    "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)",
  backgroundSize: "200% 100%",
  animation: "loading 1.5s infinite",
};

const container = {
  padding: "20px",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  minHeight: "100vh",
};

const left = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const heroTitle = {
  ...shimmer,
  height: "40px",
  width: "60%",
  borderRadius: "10px",
  marginBottom: "15px",
};

const heroSub = {
  ...shimmer,
  height: "18px",
  width: "40%",
  borderRadius: "8px",
  marginBottom: "30px",
};

const section = {
  background: "#020617",
  borderRadius: "14px",
  padding: "20px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const sectionHeading = {
  ...shimmer,
  height: "28px",
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

const card = {
  ...shimmer,
  height: "80px",
  width: "100%",
  borderRadius: "12px",
  marginTop: "15px",
};

/* GLOBAL ANIMATION */
const style = document.createElement("style");
style.innerHTML = `
@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;
document.head.appendChild(style);