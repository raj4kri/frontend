function ContactSkeleton() {
  return (
    <div style={container}>
      {/* TITLE */}
      <div style={title}></div>
      <div style={subtitle}></div>

      <div style={wrapper}>
        {/* FORM CARD */}
        <div style={card}>
          <div style={heading}></div>

          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={input}></div>
          ))}

          <div style={textarea}></div>

          <div style={button}></div>
        </div>

        {/* INFO CARD */}
        <div style={card}>
          <div style={heading}></div>

          <div style={line}></div>
          <div style={line}></div>
          <div style={line}></div>

          <div style={map}></div>
        </div>
      </div>
    </div>
  );
}

export default ContactSkeleton;

/* ===== STYLES ===== */

const shimmer = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

const container = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: "50px 20px",
};

const title = {
  ...shimmer,
  width: "220px",
  height: "35px",
  borderRadius: "8px",
  margin: "0 auto 15px",
};

const subtitle = {
  ...shimmer,
  width: "180px",
  height: "16px",
  borderRadius: "8px",
  margin: "0 auto 30px",
};

const wrapper = {
  display: "flex",
  gap: "25px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const card = {
  flex: 1,
  minWidth: "300px",
  maxWidth: "480px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "12px",
  padding: "18px",
};

const heading = {
  ...shimmer,
  width: "140px",
  height: "22px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const input = {
  ...shimmer,
  width: "100%",
  height: "42px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const textarea = {
  ...shimmer,
  width: "100%",
  height: "100px",
  borderRadius: "8px",
  marginBottom: "15px",
};

const button = {
  ...shimmer,
  width: "100%",
  height: "45px",
  borderRadius: "8px",
};

const line = {
  ...shimmer,
  width: "80%",
  height: "16px",
  borderRadius: "6px",
  marginBottom: "15px",
};

const map = {
  ...shimmer,
  width: "100%",
  height: "220px",
  borderRadius: "12px",
  marginTop: "20px",
};