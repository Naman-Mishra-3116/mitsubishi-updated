import EditATCForm from "@/components/atc-details/fragments/EditATCForm";
import React, { memo } from "react";

interface IProps {}

const page: React.FC<IProps> = () => {
  return <EditATCForm />;
};

export default memo(page);
