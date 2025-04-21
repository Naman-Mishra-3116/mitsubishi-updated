"use client";
import React, { memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider: React.FC<IProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default memo(QueryProvider);
