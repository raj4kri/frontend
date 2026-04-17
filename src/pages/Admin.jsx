import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState("slider");

  const API = import.meta.env.VITE_API_URL;

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
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // ✅ SAFE AUTH CHECK
  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/");
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

    const token = getToken();
    const res = await fetch(`${API}/slider`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setSliders(data || []); // ✅ FIX response
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
  const token = getToken();
  const res = await fetch(`${API}/slider`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Upload failed");
    return;
  }

  fetchSlider();
  setSliderImage(null);
  setSliderPreview("");
};
  const deleteSlider = async (id) => {
    const token = getToken();

    await fetch(`${API}/slider/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSlider();
  };

  // ================= CATEGORY =================
  // ================= CATEGORY =================
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error("Fetch categories failed:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    const trimmed = newCategory.trim().toLowerCase();

    if (!trimmed) {
      toast.error("Category cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 👇 show backend message (duplicate etc.)
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message || "Category added");

      setNewCategory("");
      fetchCategories();
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`${API}/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ================= PRODUCTS =================
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // convert FileList → array
  };

  const addProduct = async () => {
    if (!files || files.length === 0) {
      toast.error("Please select images");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);

    const token = getToken();
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Upload failed");
        return;
      }

      toast.success("Product added");
      // ✅ ADD RESET HERE
      setFiles([]);
      setName("");
      setPrice("");
      setCategory("");
    } catch (err) {
      toast.error("Server error");
    }
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

    const token = getToken();

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

  const today = new Date().toISOString().slice(5, 10);

  const birthdayUsers = messages.filter((m) => {
    if (!m.dob) return false;
    return m.dob.slice(5, 10) === today;
  });

  const getWhatsAppLink = (number, name) => {
    return `https://wa.me/${number}?text=Happy Birthday ${name} 🎉 - Deepak Communication`;
  };

  const sortedMessages = [...messages].sort((a, b) => {
    return b.isRead - a.isRead;
  });

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

          {sliderPreview && <img src={sliderPreview} width="100" />}

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
          <input
            type="file"
            onChange={(e) => {
              setTeamImage(e.target.files[0]);
              setTeamPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {teamPreview && <img src={teamPreview} width="100" />}

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
            type="text"
            required
          />
          <button
            onClick={addCategory}
            disabled={loading || !newCategory.trim()}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>

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
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
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
                {p.images?.[0] && <img src={p.images[0]} style={img} />}
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
        <div style={mainContainer}>
          {/* 🔹 LEFT SIDE - MESSAGES */}
          <div style={leftPanel}>
            <h3>Messages</h3>

            {sortedMessages.map((msg) => (
              <div
                key={msg._id}
                style={{
                  ...cardContact,
                  borderLeft: msg.isRead ? "5px solid #555" : "5px solid red",
                }}
              >
                <div style={leftBox}>
                  <div style={infoRow}>
                    <b>Name:</b> {msg.name}
                  </div>
                  <div style={infoRow}>
                    <b>Email:</b> {msg.email}
                  </div>
                  <div style={infoRow}>
                    <b>Phone:</b> {msg.phone}
                  </div>
                  <div style={infoRow}>
                    <b>WhatsApp:</b> {msg.whatsapp || "N/A"}
                  </div>
                  <div style={infoRow}>
                    <b>DOB:</b> {msg.dob || "N/A"}
                  </div>
                  <div style={infoRow}>
                    <b>Message:</b> {msg.message}
                  </div>
                </div>

                <div style={rightBox}>
                  <textarea
                    style={replyBox}
                    placeholder="Write reply..."
                    value={replyInputs[msg._id] || ""}
                    onChange={(e) =>
                      setReplyInputs({
                        ...replyInputs,
                        [msg._id]: e.target.value,
                      })
                    }
                  />

                  <div style={btnGroup}>
                    <button
                      onClick={() => sendReply(msg._id, replyInputs[msg._id])}
                    >
                      Reply
                    </button>

                    <button
                      onClick={() => deleteMessage(msg._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>

                    <button onClick={() => toggleRead(msg._id)}>
                      {msg.isRead ? "Unread" : "Read"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 RIGHT SIDE - BIRTHDAY */}

          <div style={rightPanel}>
            <h3>🎂 Today's Birthdays</h3>

            <div style={birthdayBox}>
              {messages
                .filter((m) => {
                  if (!m.dob) return false;

                  const today = new Date();
                  const dob = new Date(m.dob);

                  return (
                    dob.getDate() === today.getDate() &&
                    dob.getMonth() === today.getMonth()
                  );
                })
                .map((b) => (
                  <div key={b._id} style={birthdayCard}>
                    <p>{b.name}</p>

                    <a
                      href={
                        b.whatsapp
                          ? `https://wa.me/${b.whatsapp}?text=Happy Birthday ${b.name} 🎉`
                          : "#"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      🎉 Wish on WhatsApp
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

// ================= LAYOUT =================

const title = { textAlign: "center", color: "yellow" };
const section = {
  marginTop: "30px",
  padding: "20px",
  border: "1px solid #370e0e",
  borderRadius: "10px",
};

const tabContainer = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  margin: "20px 0",
  color: "#ffcc00",
};

const list = { display: "flex", gap: "20px", flexWrap: "wrap" };
const mainContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  alignItems: "flex-start",
};
const card = {
  background: "#111",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  width: "180px",
};
const img = { width: "100%", height: "120px", objectFit: "cover" };
const leftPanel = {
  flex: "2",
  minWidth: "250px",
};

const rightPanel = {
  flex: "1",
  minWidth: "250px",
  // background: "#111",
  // padding: "15px",
  // borderRadius: "10px",
  // border: "1px solid #ffcc00",
  // position: "sticky",
  // top: "10px",
};

// ================= MESSAGE CARD =================
const cardContact = {
  border: "1px solid #ffcc00",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
  background: "#111",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
};

const leftBox = {
  flex: "1",
  minWidth: "250px",
};

const rightBox = {
  flex: "1",
  minWidth: "250px",
};

const infoRow = {
  marginBottom: "5px",
  fontSize: "13px",
};

// ================= REPLY =================
const replyBox = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  background: "#222",
  color: "#fff",
};

const btnGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  flexWrap: "wrap",
};

// ================= BIRTHDAY =================
const birthdayBox = {
  marginTop: "10px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const birthdayCard = {
  background: "#222",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #ffcc00",
  textAlign: "center",
};

// ================= COMMON =================
const container = {
  background: "#000",
  color: "#fff",
  minHeight: "100vh",
  padding: "20px",
};

const deleteBtn = {
  background: "red",
  color: "#fff",
  padding: "5px 10px",
};
