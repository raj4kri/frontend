import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("slider");
  
  

  const API = import.meta.env.VITE_API_URL;

  console.log(API);
  // ================= CONTACT =================
  const [messages, setMessages] = useState([]);
  const unreadCount = messages.filter((m) => !m.isRead).length;
  const [replyInputs, setReplyInputs] = useState({});

  const fetchMessages = async () => {
    const res = await fetch(`${API}/contact`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ============== TOGGLE READ STATUS =================

  const toggleRead = async (id) => {
    await fetch(`${API}/contact/read/${id}`, {
      method: "PUT",
    });

    fetchMessages();
  };

  useEffect(() => {
    if (activeTab === "contact") fetchMessages();
  }, [activeTab]);

  // ================= AUTH =================
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!t) {
      navigate("/");
    } else {
      setToken(t);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // ===============send reply=====================
  const sendReply = async (id, replyText) => {
    try {
      const res = await fetch(`${API}/contact/reply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply: replyText }),
      });

      const data = await res.json();
      console.log("REPLY RESPONSE:", data);

      fetchMessages();
    } catch (err) {
      console.log("REPLY ERROR:", err);
    }
  };

  const deleteMessage = async (id) => {
    await fetch(`${API}/contact/${id}`, {
      method: "DELETE",
    });

    fetchMessages();
  };

  // ================= SLIDER =================
  const [sliderImage, setSliderImage] = useState(null);
  const [sliderPreview, setSliderPreview] = useState("");
  const [sliders, setSliders] = useState([]);

  const fetchSlider = async () => {
    const res = await fetch(`${API}/slider`,{ // ✅ FIX endpoint
    headers: {
      Authorization: `Bearer ${token}`,
     },
  });
    const data = await res.json();
    setSliders(Array.isArray(data) ? data : []); // ✅ FIX response
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  const uploadSlider = async () => {
    if (!sliderImage) {
      alert("Select image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", sliderImage);

    try {
      const res = await fetch(`${API}/slider`, {
        method: "POST",
         headers: {
    Authorization: `Bearer ${token}`, // ✅ ADD HERE
  },
        body: formData,
      });

      const data = await res.json();
      console.log("UPLOAD RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      fetchSlider();
      setSliderImage(null);
      setSliderPreview("");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    }
  };
  const deleteSlider = async (id) => {
    await fetch(`${API}/slider/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSlider();
  };

  // ================= CATEGORY =================
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();
    setCategories(data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    await fetch(`${API}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCategory }),
    });

    setNewCategory("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await fetch(`${API}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  };

  // ================= PRODUCTS =================
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
  if (!name || !price || !category) {
    alert("All fields required");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);

  // ONLY ONE KEY (IMPORTANT)
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const url = editId
    ? `${API}/products/${editId}`
    : `${API}/products`;

  const method = editId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  console.log("PRODUCT RESPONSE:", data);

  if (!res.ok) {
    alert(data.error || "Error");
    return;
  }

  fetchProducts();
  resetForm();
};
  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  const handleEdit = (product) => {
  setEditId(product._id);
  setName(product.name);
  setPrice(product.price);
  setCategory(product.category);

  // IMPORTANT: image preview only
  setImagePreview(product.image);

  // don't set file here ❌
  // setImageFile(null);
};
const handleImage = (e) => {
  const file = e.target.files[0];
  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
};

  const resetForm = () => {
  setName("");
  setPrice("");
  setCategory("");
  setImageFile(null);
  setImagePreview("");
  setEditId(null);
};
  // ================= TEAM =================
  const [team, setTeam] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [role, setRole] = useState("");
  const [teamImage, setTeamImage] = useState(null);
  const [teamPreview, setTeamPreview] = useState(""); 

  const fetchTeam = async () => {
    
      const res = await fetch(`${API}/team`);
      const data = await res.json();
      setTeam(data || []);

  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const addTeam = async () => {
    if (!teamImage) return alert("Select image");

    // const token =
    //   localStorage.getItem("token") || sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", teamImage);
    formData.append("name", memberName);
    formData.append("role", role);
    

    try {
      const res = await fetch(`${API}/team`, {
        method: "POST",
         headers: {
    Authorization: `Bearer ${token}`, // ✅ ADD HERE
  },
      
        body: formData,
      });

      const data = await res.json();
      console.log("TEAM RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      fetchTeam();
        setTeamImage(null);
        setTeamPreview("");
      setMemberName("");
      setRole("");
    
      
    } catch (err) {
      console.log("TEAM ERROR:", err);
    }
  };

  const deleteTeam = async (id) => {
    await fetch(`${API}/team/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTeam();
  };

  // ================= UI =================
  return (
    <div style={container}>
      <h2 style={title}>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      {/* TABS */}
      <div style={tabContainer}>
        <button onClick={() => setActiveTab("slider")}>Gallery</button>
        <button onClick={() => setActiveTab("product")}>Products</button>
        <button onClick={() => setActiveTab("category")}>Category</button>
        <button onClick={() => setActiveTab("team")}>Team</button>
        <button onClick={() => setActiveTab("contact")}>
          Messages and Notifications
          {unreadCount > 0 && (
            <span
              style={{
                background: "red",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "50%",
                marginLeft: "5px",
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ================= SLIDER ================= */}
      {activeTab === "slider" && (
        <div style={section}>
          <h3>Gallery Management</h3>

          <input
            type="file"
            onChange={(e) => {
              setSliderImage(e.target.files[0]);
              setSliderPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {sliderPreview && <img src={sliderPreview} width="200" />}

          <button onClick={uploadSlider}>Upload</button>

          <div style={list}>
            {sliders.map((s) => (
              <div key={s._id} style={card}>
                <img src={s.image} style={img} />
                {/* <img src={`${API}/uploads/${s.image}`} style={img} /> */}
                <button onClick={() => deleteSlider(s._id)} style={deleteBtn}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TEAM ================= */}
      {activeTab === "team" && (
        <div style={section}>
          <h3>Team Management</h3>

          <input
            placeholder="Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input type="file" onChange={(e) => {
            setTeamImage(e.target.files[0]);
            setTeamPreview(URL.createObjectURL(e.target.files[0]));
          }} />

          {teamPreview && <img src={teamPreview} width="200" />}

          <button onClick={addTeam}>Add Member</button>

          <div style={list}>
            {team.map((m) => (
              <div key={m._id} style={card}>
                <img src={m.image} style={img} />
                <p>{m.name}</p>
                <p>{m.role}</p>
                <button onClick={() => deleteTeam(m._id)} style={deleteBtn}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= CATEGORY ================= */}
      {activeTab === "category" && (
        <div style={section}>
          <h3>Category Management</h3>

          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category"
          />
          <button onClick={addCategory}>Add Category</button>

          <div style={list}>
            {categories.map((cat) => (
              <div key={cat._id} style={card}>
                <p>{cat.name}</p>
                <button
                  onClick={() => deleteCategory(cat._id)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= PRODUCTS ================= */}
      {activeTab === "product" && (
        <div style={section}>
          <h3>Product Management</h3>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input type="file" onChange={handleImage} />
          {/* IMAGE PREVIEW */}
          {imagePreview && (
            <div style={{ marginTop: "10px" }}>
              <p>Image Preview:</p>
              <img
                src={imagePreview}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #fff",
                }}
              />
            </div>
          )}

          <select onChange={(e) => setCategory(e.target.value)}>
            <option>Select Category</option>
            {categories.map((c) => (
              <option key={c._id}>{c.name}</option>
            ))}
          </select>

          <button onClick={addProduct}>
            {editId ? "Update Product" : "Add Product"}
          </button>

          <div style={list}>
            {products.map((p) => (
              <div key={p._id} style={card}>
                <img src={p.image} style={img} />
                {/* <img src={`${API}/uploads/${p.image}`} style={img} /> */}
                <p>{p.name}</p>
                <p>₹{p.price}</p>
                <button onClick={() => handleEdit(p)}>Edit</button>{" "}
                {/* ✅ ADD THIS */}
                <button onClick={() => deleteProduct(p._id)} style={deleteBtn}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= CONTACT ================= */}
      {activeTab === "contact" && (
        <div style={section}>
          <h3>Messages</h3>

          {messages.map((msg) => (
            <div key={msg._id} style={cardContact}>
              <p>
                <b>Name:</b> {msg.name}
              </p>
              <p>
                <b>Email:</b> {msg.email}
              </p>
              <p>
                <b>Phone:</b> {msg.phone}
              </p>
              <p>
                <b>Message:</b> {msg.message}
              </p>

              {/* ✉️ Reply Box */}
              <textarea
                placeholder="Write reply..."
                value={replyInputs[msg._id] || ""}
                onChange={(e) =>
                  setReplyInputs({
                    ...replyInputs,
                    [msg._id]: e.target.value,
                  })
                }
              />

              <button onClick={() => sendReply(msg._id, replyInputs[msg._id])}>
                Reply
              </button>

              {/* 🔴 Delete */}
              <button onClick={() => deleteMessage(msg._id)} style={deleteBtn}>
                Delete
              </button>

              <button onClick={() => toggleRead(msg._id)}>
                {msg.isRead ? "Mark Unread" : "Mark Read"}
              </button>

              {/* Show Reply */}
              {msg.reply && (
                <p style={{ color: "lightgreen" }}>
                  <b>Reply:</b> {msg.reply}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;

// 🎨 STYLES
const container = {
  background: "#000",
  color: "#fff",
  minHeight: "100vh",
  padding: "20px",
};
const title = { textAlign: "center", color: "yellow" };
const section = {
  marginTop: "30px",
  padding: "20px",
  border: "1px solid #370e0e",
  borderRadius: "10px",
};
const sectionTitle = { color: "red" };
const list = { display: "flex", gap: "20px", flexWrap: "wrap" };
const card = {
  background: "#111",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  width: "180px",
};
const img = { width: "100%", height: "120px", objectFit: "cover" };
const deleteBtn = {
  background: "red",
  color: "#fff",
  padding: "5px 10px",
  marginTop: "5px",
};

const tabContainer = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  margin: "20px 0",
  color: "#ffcc00",
};

const tabBtn = {
  padding: "10px 20px",
  background: "#222222",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const activeTabBtn = {
  ...tabBtn,
  background: "red",
};

const cardContact = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
  borderRadius: "5px",
};

// const container = { padding: "20px" };
// const title = { textAlign: "center" };
// const section = { marginTop: "20px" };
// const tabContainer = { display: "flex", gap: "10px" };
// const cardContact = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   margin: "10px",
// };
