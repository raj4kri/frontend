import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");

  // ✅ Fetch Categories (ONLY ONCE)
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  // ✅ Fetch Products (search + category + page)
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${API}/products?search=${search}&category=${filter}&page=${page}`
      );

      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔁 Run when search / page / filter changes
  useEffect(() => {
    fetchProducts();
  }, [search, page, filter]);

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

      {/* ✅ CATEGORY FILTER ADDED */}
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
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* 📦 PRODUCTS */}
      <div style={containerStyle}>
        {products.length === 0 ? (
          <p style={{ color: "white" }}>No products found</p>
        ) : (
          products.map((p) => (
            <div key={p._id} style={itemStyle}>
              <img src={p.image} alt="" style={imageStyle} />
              <h3 style={nameStyle}>{p.name}</h3>
              <p style={priceStyle}>₹{p.price}</p>
              <p style={{ color: "#555" }}>{p.category}</p>
            </div>
          ))
        )}
      </div>

      {/* 📄 PAGINATION */}
      <div style={paginationStyle}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
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





// 🎨 STYLES

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
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "15px",
};

const itemStyle = {
  border: "2px solid red",
  borderRadius: "12px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#fffbea",
  boxShadow: "0 3px 8px rgba(255,0,0,0.2)",
  transition: "0.3s",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "center",
  borderRadius: "8px",
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