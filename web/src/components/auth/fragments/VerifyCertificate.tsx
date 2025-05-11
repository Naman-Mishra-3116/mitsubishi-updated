import { useVerifyCertificate } from "@/hooks/query/useVerifyCertificate.query";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import styles from "../styles/verify.module.scss";
import MLoader from "@/ui/MLoader/MLoader";

const VerifyCertificate: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useVerifyCertificate(id as string);

  if (data && data?.status === "error") {
    return <div>{data.title}</div>;
  }

  return isLoading ? (
    <MLoader type="dots" />
  ) : (
    <div className={styles.container}>
      <h2 className={styles.title}>✅ Verified Certificate</h2>
      <div className={styles.field}>
        <strong>Name:</strong> {data?.data?.name}
      </div>
      <div className={styles.field}>
        <strong>Email:</strong> {data?.data?.email}
      </div>
      <div className={styles.field}>
        <strong>Training ID:</strong> {data?.data?.trainingId}
      </div>
      <div className={styles.field}>
        <strong>College:</strong> {data?.data?.studentCollegeName}
      </div>
      <div className={styles.field}>
        <strong>Certificate ID:</strong> {data?.data?.certificateId}
      </div>
      <div className={styles.footer}>Verified by Mitsubishi Electric ATC</div>
    </div>
  );
};

export default memo(VerifyCertificate);
