import React, { memo } from "react";
import ProfileContainer from "@/components/profile/fragments/ProfileContainer";

interface IProps {}

const page: React.FC<IProps> = () => {
  return <ProfileContainer />;
};

export default memo(page);
