"use client";
import { store } from "@/store/store";
import React, { memo } from "react";
import { Provider } from "react-redux";

interface IProps {
  children: React.ReactNode;
}

const ReduxStoreProvider: React.FC<IProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default memo(ReduxStoreProvider);
