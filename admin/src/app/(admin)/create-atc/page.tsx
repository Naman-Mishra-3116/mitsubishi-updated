"use client";
import CreateATCContainer from "@/components/atc-details/fragments/CreateATCContainer";
import React, { memo } from "react";

interface IProps {}

const page: React.FC<IProps> = () => {
  return <CreateATCContainer />;
};

export default memo(page);
