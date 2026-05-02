import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => console.log("Error loading product"));
  }, [id]);

  if (!product) return <h2 style={{ color: "#fff" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h1>{product.name}</h1>

      <img
        src={product.images?.[0]}
        alt={product.name}
        style={{ width: "200px", borderRadius: "10px" }}
      />

      <p>Price: ₹{product.finalPrice || product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

export default ProductDetail;