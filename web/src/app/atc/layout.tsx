import ManagerLayout from "@/layout/ManagerLayout";
import React, { memo } from "react";

interface IProps {
  children: React.ReactNode;
}

const layout: React.FC<IProps> = ({ children }) => {
  return <ManagerLayout>{children}</ManagerLayout>;
};

export default memo(layout);
