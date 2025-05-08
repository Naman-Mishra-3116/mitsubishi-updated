import ViewSpecificTraining from "@/components/training/fragments/ViewSpecificTraining";
import React, { memo } from "react";

interface IProps {}

const page: React.FC<IProps> = () => {
  return <ViewSpecificTraining />;
};

export default memo(page);
