import React, { memo } from "react";

interface IProps {}

const page: React.FC<IProps> = () => {
  return <div>Reset Page</div>;
};

export default memo(page);
