import Skeleton from "react-loading-skeleton";

function ContactSkeleton() {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton height={50} width={250} />

      <div style={{ marginTop: "20px" }}>
        <Skeleton height={50} />

        <Skeleton height={50} style={{ marginTop: 15 }} />

        <Skeleton height={120} style={{ marginTop: 15 }} />

        <Skeleton height={50} width={150} style={{ marginTop: 20 }} />
      </div>
    </div>
  );
}

export default ContactSkeleton;
