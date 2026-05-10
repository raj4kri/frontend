function ServicesSkeleton() {
  return (
    <div style={container}>
      {/* TITLE */}
      <div style={title}></div>
      <div style={subtitle}></div>

      {/* GRID */}
      <div style={grid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} style={card}>
            <div style={icon}></div>

            <div style={cardTitle}></div>

            <div style={line}></div>
            <div style={{ ...line, width: "75%" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSkeleton;

/* ===== SHIMMER ===== */

const shimmer = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

const container = {
  background: "linear-gradient(135deg, #0f172a, #020617)",
  minHeight: "100vh",
  padding: "40px 10px",
};

const title = {
  ...shimmer,
  width: "260px",
  height: "42px",
  borderRadius: "8px",
  margin: "0 auto 15px",
};

const subtitle = {
  ...shimmer,
  width: "320px",
  height: "16px",
  borderRadius: "6px",
  margin: "0 auto 40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "25px",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "18px",
  padding: "25px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const icon = {
  ...shimmer,
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  margin: "0 auto 20px",
};

const cardTitle = {
  ...shimmer,
  width: "70%",
  height: "20px",
  borderRadius: "6px",
  margin: "0 auto 20px",
};

const line = {
  ...shimmer,
  width: "100%",
  height: "12px",
  borderRadius: "6px",
  marginBottom: "12px",
};