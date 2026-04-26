import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("slider");
  const [menuOpen, setMenuOpen] = useState(false);

  // const isMobile = window.innerWidth < 768;
  const API = import.meta.env.VITE_API_URL;

  // ===

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // ✅ initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const sidebarStyle = {
    ...baseSidebar,
    width: isMobile ? "200px" : "220px",
    padding: "20px",
    transform: isMobile
      ? menuOpen
        ? "translateX(0)"
        : "translateX(-100%)"
      : "translateX(0)",
  };

  const contentStyle = {
    padding: "15px",
    marginLeft: isMobile ? "0" : "240px",
    marginTop: isMobile ? "60px" : "0",
  };

  const sectionHeader = {
    ...sectionHeaderBase,
    top: isMobile ? "60px" : "90px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: "10px",
  };

  const gridStyle = {
    ...baseGrid,
    gridTemplateColumns: isMobile
      ? "repeat(2, 1fr)"
      : "repeat(auto-fill, minmax(140px, 1fr))",
  };
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

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

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
    console.log("FRONTEND TOKEN:", token);
    const res = await fetch(`${API}/slider`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
      const token = getToken(); // ✅ ADD THIS
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
      const token = getToken(); // ✅ ADD THIS
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

  const [discount, setDiscount] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "discount") {
      setDiscount(e.target.value);
    }
  };

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
    const token = getToken();

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount || 0);
    formData.append("category", category);

    try {
      let res;

      if (editId) {
        res = await fetch(`${API}/products/${editId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price: Number(price),
            discount: Number(discount || 0),
            category,
          }),
        });
      } else {
        res = await fetch(`${API}/products`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed");
        return;
      }

      toast.success(editId ? "Product updated" : "Product added");

      fetchProducts();
      resetForm();
    } catch (err) {
      toast.error("Server error");
    }
  };
  const deleteProduct = async (id) => {
    const token = getToken(); // ✅
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
    setDiscount(product.discount || 0); // ✅ ADD THIS
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
    setFiles([]);
    setEditId(null);
    setDiscount("");
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
    const token = getToken(); // ✅
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
      {/* LEFT SIDEBAR */}

      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: "fixed",
            top: "70px",
            left: "10px",
            zIndex: 1200,
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
          }}
        >
          ☰
        </button>
      )}
      <div style={sidebarStyle}>
        <h2 style={logo}>Admin</h2>

        {/* 🔥 SMALL LOGOUT BELOW TITLE */}
        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>

        {/* MENU */}
        <div style={menu}>
          <button onClick={() => setActiveTab("slider")} style={tabBtn}>
            Gallery
          </button>
          <button onClick={() => setActiveTab("product")} style={tabBtn}>
            Products
          </button>
          <button onClick={() => setActiveTab("category")} style={tabBtn}>
            Category
          </button>
          <button onClick={() => setActiveTab("team")} style={tabBtn}>
            Team
          </button>
          <button onClick={() => setActiveTab("contact")} style={tabBtn}>
            Messages {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div style={contentStyle}>
        {/* ===== GALLERY ===== */}
        {activeTab === "slider" && (
          <div style={sectionWrapper}>
            {/* 🔥 FIXED HEADER */}
            <div style={sectionHeader}>
              <h3 style={{ margin: 0 }}>Gallery Management</h3>

              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div style={headerControls}>
                  <input
                    type="file"
                    onChange={(e) => {
                      setSliderImage(e.target.files[0]);
                      setSliderPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>

                <button onClick={uploadSlider}>Upload</button>
              </div>
            </div>

            {/* 🔽 SCROLLABLE CONTENT */}
            <div style={sectionContent}>
              {sliderPreview && <img src={sliderPreview} style={previewImg} />}

              <div style={gridStyle}>
                {sliders.map((s) => (
                  <div key={s._id} style={card}>
                    <img src={s.image} style={img} />
                    <button
                      onClick={() => deleteSlider(s._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PRODUCTS ===== */}
        {activeTab === "product" && (
          <>
            <h3>Products</h3>

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
              type="number"
              placeholder="Discount %"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <input type="file" multiple onChange={handleFileChange} />

            <div style={{ display: "flex", gap: "10px" }}>
              {files.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  style={{ width: "60px", height: "60px" }}
                />
              ))}
            </div>

            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* <p>Final Price: ₹{finalPrice}</p> */}

            <button onClick={addProduct}>
              {editId ? "Update Product" : "Add Product"}
            </button>

            <div style={gridStyle}>
              {products.map((p) => (
                <div key={p._id} style={card}>
                  {p.images?.[0] && <img src={p.images[0]} style={img} />}
                  <p>{p.name}</p>
                  <p>
                    <span style={{ textDecoration: "line-through" }}>
                      ₹{p.price}
                    </span>{" "}
                    <b>₹{p.finalPrice}</b>
                  </p>

                  {p.discount > 0 && (
                    <p style={{ color: "green" }}>{p.discount}% OFF</p>
                  )}
                  <button
                    onClick={() => deleteProduct(p._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== CATEGORY ===== */}
        {activeTab === "category" && (
          <>
            <h3>Category</h3>

            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
            />

            <button onClick={addCategory}>Add</button>

            <div style={gridStyle}>
              {categories.map((c) => (
                <div key={c._id} style={card}>
                  <p>{c.name}</p>
                  <button
                    onClick={() => deleteCategory(c._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== TEAM ===== */}
        {activeTab === "team" && (
          <>
            <h3>Team</h3>

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
              onChange={(e) => setTeamImage(e.target.files[0])}
            />

            <button onClick={addTeam}>Add</button>

            <div style={gridStyle}>
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
          </>
        )}

        {/* ===== CONTACT ===== */}
        {activeTab === "contact" && (
          <div style={contactContainer}>
            {/* 🔹 LEFT - MESSAGES */}
            <div style={messagesPanel}>
              <h3>Messages</h3>

              {sortedMessages.length === 0 ? (
                <p>No messages</p>
              ) : (
                sortedMessages.map((msg) => (
                  <div
                    key={msg._id}
                    style={{
                      ...messageCard,
                      borderLeft: msg.isRead
                        ? "4px solid #555"
                        : "4px solid red",
                    }}
                  >
                    <div style={msgTop}>
                      <div>
                        <strong>{msg.name}</strong>
                        <p style={smallText}>{msg.email}</p>
                      </div>

                      <button
                        onClick={() => toggleRead(msg._id)}
                        style={readBtn}
                      >
                        {msg.isRead ? "Unread" : "Read"}
                      </button>
                    </div>

                    <p style={msgText}>{msg.message}</p>

                    <textarea
                      placeholder="Write reply..."
                      value={replyInputs[msg._id] || ""}
                      onChange={(e) =>
                        setReplyInputs({
                          ...replyInputs,
                          [msg._id]: e.target.value,
                        })
                      }
                      style={replyBox}
                    />

                    <div style={msgActions}>
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
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 🔥 RIGHT - BIRTHDAY PANEL */}
            <div style={birthdayPanel}>
              <h3>🎂 Birthdays</h3>

              {birthdayUsers.length === 0 ? (
                <p style={{ color: "#aaa" }}>No birthdays today</p>
              ) : (
                birthdayUsers.map((b) => (
                  <div key={b._id} style={birthdayCard}>
                    <p style={{ fontWeight: "bold" }}>{b.name}</p>

                    {b.whatsapp && (
                      <a
                        href={`https://wa.me/${b.whatsapp}?text=Happy Birthday ${b.name} 🎉`}
                        target="_blank"
                        rel="noreferrer"
                        style={whatsappBtn}
                      >
                        🎉 Wish
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

// ================= new STYLES =================

const previewImg = {
  width: "50%",
  maxWidth: "100px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const headerControls = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  flexWrap: "wrap", // ✅ mobile wrap
};

const sectionWrapper = {
  height: "calc(100vh - 60px)", // minus navbar
  display: "flex",
  flexDirection: "column",
};

// const sectionHeader = {
//   position: "sticky",
//   top: "90px",
//   zIndex: 10,
//   background: "#000",
//   padding: "10px",
//   borderBottom: "1px solid #222",

//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   flexWrap: "wrap", // ✅ important for mobile
//   gap: "10px",
// };

const sectionHeaderBase = {
  position: "sticky",
  zIndex: 10,
  background: "#000",
  padding: "10px",
  borderBottom: "1px solid #222",
};

const sectionContent = {
  overflowY: "auto",
  padding: "15px",
  flex: 1,
};

const container = {
  width: "100%", // ✅ full width
  maxWidth: "100%", // ✅ remove restriction
  margin: 0, // ✅ remove centering
  padding: 0,
  background: "#000",
  color: "#fff",
};

// const  baseSidebar = {
//   width: "220px",
//   background: "#0d0d0d",
//   padding: "20px 15px",

//   /* 🔥 FIXED BELOW NAVBAR */
//   position: "fixed",
//   top: "90px", // 👈 navbar height
//   left: "110px",
//   height: "calc(100vh - 60px)",

//   display: "flex",
//   flexDirection: "column",
//   borderRight: "1px solid #222",
// };
const baseSidebar = {
  background: "#0d0d0d",
  position: "fixed",
  top: "110px",
  left: 0,
  width: "220px",
  height: "calc(100vh - 70px)",
  transition: "transform 0.3s ease",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #222",
  zIndex: 1000,
  overflow: "hidden", // ✅ IMPORTANT
};

const baseHeader = {
  position: "sticky",
  zIndex: 10,
  background: "#000",
  padding: "10px",
  borderBottom: "1px solid #222",
};

const logo = {
  color: "#ffcc00",
  marginBottom: "20px",
  textAlign: "center",
};

const menu = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const baseContent = {
  flex: 1,
  padding: "20px",
  marginLeft: "300px", // same as sidebar width
  position: "relative",
  // padding: "20px",
};

const tabBtn = {
  padding: "8px",
  background: "#1a1a1a",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  textAlign: "left",
};

const logoutBtn = {
  background: "transparent",
  color: "red",
  border: "1px solid red",
  padding: "5px",
  fontSize: "12px",
  cursor: "pointer",
  marginBottom: "20px",
};

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
//   gap: "12px",
// };
const baseGrid = {
  display: "grid",
  gap: "10px",
};

const card = {
  background: "#111",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
};

const img = {
  width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: "5px",
};

const deleteBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px",
  marginTop: "5px",
};

const contactContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const messagesPanel = {
  flex: 2,
  minWidth: "300px",
};

const birthdayPanel = {
  flex: 1,
  minWidth: "250px",
  background: "#111",
  padding: "15px",
  borderRadius: "10px",
  height: "fit-content",
  position: "sticky",
  top: "10px",
  border: "1px solid #333",
};

const messageCard = {
  background: "#111",
  padding: "15px",
  // borderRadius: "10px",
  marginBottom: "15px",
};

const msgTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const smallText = {
  fontSize: "12px",
  color: "#aaa",
};

const msgText = {
  margin: "10px 0",
};

const msgActions = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const readBtn = {
  background: "#333",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
};

const birthdayCard = {
  background: "#222",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center",
};

const whatsappBtn = {
  display: "inline-block",
  marginTop: "5px",
  padding: "5px 10px",
  background: "green",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
};

// const tabBtn = {
//   ...tabBtn,
//   ':hover': {
//     background: "#333"
//   }
// };

const replyBox = {
  width: "50%",
  padding: "10px",
  borderRadius: "3px",
  // border: "1px solid #333",
  background: "#1a1a1a",
  color: "#fff",
  marginTop: "10px",
  resize: "none",
};
