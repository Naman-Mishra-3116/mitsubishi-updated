import ViewAllAdmins from "@/components/views/fragments/ViewAllAdmins";
import React, { memo } from "react";

interface IProps {}

const page: React.FC<IProps> = () => {
  return <ViewAllAdmins />;
};

export default memo(page);
