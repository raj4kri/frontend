import { useEffect, useState } from "react";

function Products() {



  const [touchStart, setTouchStart] = useState(null);
const [touchEnd, setTouchEnd] = useState(null);

const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");

  const [imageIndexes, setImageIndexes] = useState({});
  const [hovered, setHovered] = useState(null);
// ================= DEBOUNCE SEARCH =================
  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500); // ⏱ delay

  return () => clearTimeout(timer);
}, [search]);

// ================= TOUCH HANDLERS (for mobile swipe) =================

  const handleTouchStart = (e) => {
  setTouchEnd(null); // reset
  setTouchStart(e.targetTouches[0].clientX);
};

const handleTouchMove = (e) => {
  setTouchEnd(e.targetTouches[0].clientX);
};

const handleTouchEnd = (id, images) => {
  if (!touchStart || !touchEnd) return;

  const distance = touchStart - touchEnd;

  // 👇 threshold (avoid accidental swipe)
  if (distance > 50) {
    // swipe left → next
    nextImage(id, images);
  }

  if (distance < -50) {
    // swipe right → prev
    prevImage(id, images);
  }
};

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []));
  }, []);

  // ================= FETCH PRODUCTS =================
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

  // ================= AUTO SLIDER =================
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prev) => {
        const updated = { ...prev };

        products.forEach((p) => {
          if (p.images?.length && hovered !== p._id) {
            updated[p._id] =
              (prev[p._id] + 1) % p.images.length;
          }
        });

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [products, hovered]);

  // ================= MANUAL CONTROLS =================
  const nextImage = (id, images) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % images.length,
    }));
  };

  const prevImage = (id, images) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]:
        (prev[id] - 1 + images.length) % images.length,
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
      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={searchStyle}
      />

      {/* 📂 FILTER */}
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(1);
        }}
        style={searchStyle}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c._id}>{c.name}</option>
        ))}
      </select>

      {/* 📦 PRODUCTS */}
      <div style={containerStyle}>
        {products.map((p) => (
          <div
            key={p._id}
            style={itemStyle}
            onMouseEnter={() => setHovered(p._id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={imageWrapper}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={() => handleTouchEnd(p._id, p.images)}>
              {p.images?.length > 0 && (
                <img
                  src={p.images[imageIndexes[p._id] || 0]}
                  style={imageStyle}
                />
              )}

              {/* ⬅️➡️ ARROWS */}
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

            {/* 🔘 DOTS */}
            <div style={dotsContainer}>
              {p.images?.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setDot(p._id, i)}
                  style={{
                    ...dot,
                    opacity:
                      imageIndexes[p._id] === i ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            <h3 style={nameStyle}>{p.name}</h3>
            <p style={priceStyle}>₹{p.price}</p>
            <p style={{ color: "#555" }}>{p.category}</p>
          </div>
        ))}
      </div>

      {/* 📄 PAGINATION */}
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

// ================= STYLES =================

const mainContainer = {
  background: "#000",
  minHeight: "100vh",
  padding: "20px",
};

const searchStyle = {
  width: "50%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid red",
};

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
};

const itemStyle = {
  border: "2px solid red",
  borderRadius: "15px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#fffbea",
  boxShadow: "0 5px 12px rgba(255,0,0,0.3)",
  position: "relative",
};

const imageWrapper = {
  position: "relative",
};

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
  transition: "0.5s",
};

const arrow = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "none",
  fontSize: "20px",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "50%",
};

const dotsContainer = {
  marginTop: "5px",
};

const dot = {
  display: "inline-block",
  width: "8px",
  height: "8px",
  margin: "3px",
  background: "red",
  borderRadius: "50%",
  cursor: "pointer",
};

const nameStyle = {
  color: "red",
  fontSize: "16px",
  fontWeight: "bold",
};

const priceStyle = {
  color: "#ff9900",
  fontWeight: "bold",
};

const paginationStyle = {
  marginTop: "20px",
  textAlign: "center",
  color: "white",
};