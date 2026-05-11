import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setActiveImage(data.images?.[0] || "/fallback.jpg");
      })
      .catch(() => console.log("Error loading product"));
  }, [id]);

  if (!product) {
    return (
      <div style={loadingContainer}>
        <div style={loader}></div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        {/* LEFT SIDE */}
        <div style={left}>
          {/* MAIN IMAGE */}
          <div style={mainImageWrapper}>
            <img
              src={activeImage}
              alt={product.name}
              style={mainImage}
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
          </div>

          {/* THUMBNAILS */}
          <div style={thumbRow}>
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                style={{
                  ...thumb,
                  border:
                    activeImage === img
                      ? "2px solid #38bdf8"
                      : "1px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => setActiveImage(img)}
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={right}>
          <span style={badge}>{product.category}</span>

          <h1 style={title}>{product.name}</h1>

          <div style={priceRow}>
            {product.discount > 0 && (
              <span style={oldPrice}>₹{product.price}</span>
            )}

            <span style={price}>
              ₹{product.finalPrice || product.price}
            </span>

            {product.discount > 0 && (
              <span style={discountBadge}>
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p style={desc}>
            Premium quality mobile accessory/product with reliable performance
            and affordable pricing.
          </p>

          <div style={btnRow}>
            <a
              href={`https://wa.me/919060211167?text=Hi, I'm interested in ${product.name}`}
              target="_blank"
              rel="noreferrer"
            >
              <button style={primaryBtn}>WhatsApp</button>
            </a>

            <a href="tel:9060211167">
              <button style={secondaryBtn}>Call Now</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  padding: "20px",
  color: "#fff",
};

const card = {
  maxWidth: "1200px",
  margin: "auto",
  display: "flex",
  gap: "30px",
  flexWrap: "wrap",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "25px",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
};

const left = {
  flex: 1,
  minWidth: "300px",
};

const right = {
  flex: 1,
  minWidth: "300px",
  textAlign: "left",
};

const mainImageWrapper = {
  background: "#0f172a",
  borderRadius: "20px",
  padding: "20px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const mainImage = {
  width: "100%",
  height: "420px",
  objectFit: "contain",
  borderRadius: "16px",
};

const thumbRow = {
  display: "flex",
  gap: "12px",
  marginTop: "18px",
  flexWrap: "wrap",
};

const thumb = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "12px",
  cursor: "pointer",
  padding: "3px",
  background: "#020617",
};

const badge = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: "20px",
  background: "rgba(56,189,248,0.15)",
  color: "#38bdf8",
  fontSize: "13px",
  marginBottom: "15px",
};

const title = {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "20px",
};

const priceRow = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const oldPrice = {
  textDecoration: "line-through",
  color: "#94a3b8",
  fontSize: "20px",
};

const price = {
  fontSize: "34px",
  fontWeight: "700",
  color: "#22c55e",
};

const discountBadge = {
  background: "#ef4444",
  padding: "5px 10px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "600",
};

const desc = {
  color: "#cbd5f5",
  lineHeight: "1.8",
  marginBottom: "30px",
};

const btnRow = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "14px 24px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "15px",
};

const secondaryBtn = {
  padding: "14px 24px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "15px",
};

const loadingContainer = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#020617",
};

const loader = {
  width: "55px",
  height: "55px",
  border: "5px solid rgba(255,255,255,0.1)",
  borderTop: "5px solid #38bdf8",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

/* ANIMATION */
const styleSheet = document.styleSheets[0];

const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

if (
  styleSheet &&
  [...styleSheet.cssRules].findIndex(
    (rule) => rule.name === "spin"
  ) === -1
) {
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}