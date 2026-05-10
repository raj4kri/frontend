import Skeleton from "react-loading-skeleton";

function AdminSkeleton() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: "#111",
          padding: "20px",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton
            key={i}
            height={40}
            style={{ marginBottom: "15px" }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Skeleton height={50} width={250} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={180} borderRadius={15} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSkeleton;