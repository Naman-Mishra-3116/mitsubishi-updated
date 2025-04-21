import React, { memo } from "react";
import classes from "./index.module.scss";

interface IProps {
  children: React.ReactNode;
}

const MLayout: React.FC<IProps> = ({ children }) => {
  return <div className={classes.root}>{children}</div>;
};

export default memo(MLayout);
