import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");

  const [imageIndexes, setImageIndexes] = useState({});
  const [hovered, setHovered] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  // 🔍 debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 📂 categories
  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []));
  }, []);

  // 📦 products
  const fetchProducts = async () => {
    const res = await fetch(
      `${API}/products?search=${debouncedSearch}&category=${filter}&page=${page}`
    );
    const data = await res.json();

    setProducts(data.products || []);
    setTotalPages(data.pages || 1);

    const initial = {};
    (data.products || []).forEach((p) => {
      initial[p._id] = 0;
    });
    setImageIndexes(initial);
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, page, filter]);

  // 🔄 auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prev) => {
        const updated = { ...prev };

        products.forEach((p) => {
          if (p.images?.length && hovered !== p._id) {
            updated[p._id] = (prev[p._id] + 1) % p.images.length;
          }
        });

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [products, hovered]);

  const nextImage = (id, images) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % images.length,
    }));
  };

  const prevImage = (id, images) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + images.length) % images.length,
    }));
  };

  const setDot = (id, index) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: index,
    }));
  };

  return (
    <div style={mainContainer}>
      {/* 🔍 FILTER */}
      <div style={filterWrapper}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={searchInput}
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          style={selectInput}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* 📦 PRODUCTS */}
      <div style={containerStyle}>
        {products.map((p) => (
          <div
            key={p._id}
            style={itemStyle}
            onMouseEnter={() => setHovered(p._id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* IMAGE */}
            <div style={imageWrapper}>
              {p.images?.length > 0 && (
                <img
                  src={p.images[imageIndexes[p._id] || 0]}
                  style={imageStyle}
                />
              )}

              {/* 🔥 DISCOUNT BADGE */}
              {p.discount > 0 && (
                <div style={discountBadge}>{p.discount}% OFF</div>
              )}

              {/* ARROWS */}
              {p.images?.length > 1 && (
                <>
                  <button
                    style={{ ...arrow, left: "5px" }}
                    onClick={() => prevImage(p._id, p.images)}
                  >
                    ‹
                  </button>

                  <button
                    style={{ ...arrow, right: "5px" }}
                    onClick={() => nextImage(p._id, p.images)}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* DOTS */}
            <div style={dotsContainer}>
              {p.images?.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setDot(p._id, i)}
                  style={{
                    ...dot,
                    opacity: imageIndexes[p._id] === i ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* CONTENT */}
            <div style={{ padding: "10px", textAlign: "left" }}>
              <h3 style={nameStyle}>{p.name}</h3>

              {/* PRICE */}
              {p.discount > 0 ? (
                <div style={priceRow}>
                  <span style={finalPriceStyle}>₹{p.finalPrice}</span>
                  <span style={oldPriceStyle}>₹{p.price}</span>
                  <span style={discountStyle}>{p.discount}%</span>
                </div>
              ) : (
                <div style={priceRow}>
                  <span style={finalPriceStyle}>₹{p.price}</span>
                </div>
              )}

              <p style={categoryStyle}>{p.category}</p>
              <span style={availabilityBadge}>Available in Store</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={paginationStyle}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

/* ================= STYLES ================= */

const mainContainer = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: "20px",

  marginTop:"3px"
};

const filterWrapper = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "20px",
  justifyContent: "center",
};

const searchInput = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  minWidth: "250px",
};

const selectInput = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "18px",
};

const itemStyle = {
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const imageWrapper = {
  position: "relative",
  width: "100%",
  paddingTop: "100%", // ✅ makes perfect square
  overflow: "hidden",
};

const imageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain", // ✅ IMPORTANT (no crop)
  background: "#fff",   // optional clean bg
};

const discountBadge = {
  position: "absolute",
  top: "8px",
  left: "8px",
  background: "#ef4444",
  color: "#fff",
  padding: "3px 6px",
  fontSize: "11px",
  borderRadius: "5px",
};

const arrow = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  padding: "5px",
  cursor: "pointer",
};

const dotsContainer = {
  textAlign: "center",
};

const dot = {
  display: "inline-block",
  width: "6px",
  height: "6px",
  margin: "3px",
  background: "red",
  borderRadius: "50%",
};

const nameStyle = {
  fontSize: "14px",
  fontWeight: "600",
};

const priceRow = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
};

const finalPriceStyle = {
  fontWeight: "700",
};

const oldPriceStyle = {
  textDecoration: "line-through",
  fontSize: "12px",
  color: "#999",
};

const discountStyle = {
  color: "green",
  fontSize: "12px",
};

const categoryStyle = {
  fontSize: "12px",
  color: "#666",
};

const availabilityBadge = {
  fontSize: "10px",
  background: "#22c55e",
  color: "#fff",
  padding: "3px 6px",
  borderRadius: "6px",
  marginTop: "5px",
  display: "inline-block",
};

const paginationStyle = {
  marginTop: "20px",
  textAlign: "center",
};