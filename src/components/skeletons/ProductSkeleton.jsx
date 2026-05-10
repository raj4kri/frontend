import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton() {
  return (
    <div style={container}>
      {[1,2,3,4,5,6,7,8].map((i) => (
        <div key={i} style={card}>
          <Skeleton
            height={180}
            baseColor="#1e293b"
            highlightColor="#334155"
          />

          <div style={{ padding: "10px" }}>
            <Skeleton
              height={20}
              width={"80%"}
              baseColor="#1e293b"
              highlightColor="#334155"
            />

            <Skeleton
              height={15}
              width={"50%"}
              style={{ marginTop: 10 }}
              baseColor="#1e293b"
              highlightColor="#334155"
            />

            <Skeleton
              height={15}
              width={"40%"}
              style={{ marginTop: 10 }}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;

const container = {
  display: "grid",
  gridTemplateColumns:
    window.innerWidth < 600
      ? "repeat(2,1fr)"
      : "repeat(auto-fill,minmax(180px,1fr))",
  gap: "18px",
};

const card = {
  background: "#111827",
  borderRadius: "12px",
  overflow: "hidden",
};