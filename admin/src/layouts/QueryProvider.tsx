"use client";
import React, { memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProps {
  children: React.ReactNode;
}

const client = new QueryClient();

const QueryProvider: React.FC<IProps> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default memo(QueryProvider);
