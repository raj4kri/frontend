import Skeleton from "react-loading-skeleton";

function AboutSkeleton() {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton height={300} borderRadius={20} />

      <div style={{ marginTop: "20px" }}>
        <Skeleton height={40} width={250} />

        <Skeleton count={5} style={{ marginTop: "10px" }} />
      </div>
    </div>
  );
}

export default AboutSkeleton;