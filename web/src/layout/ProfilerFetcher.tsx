"use client";
import { useGetManagerLoginData } from "@/hooks/query/useGetManagerLoginData";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser, setUserData } from "@/store/reducer/authSlice";
import MLoader from "@/ui/MLoader/MLoader";
import React, { memo, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const ProfilerFetcher: React.FC<IProps> = ({ children }) => {
  const { data, isLoading } = useGetManagerLoginData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.status === "success") {
      const { id, atcId, fullName, email, phoneNumber, atcName } = data?.data;
      dispatch(
        setUserData({
          isAuthenticated: true,
          user: {
            atcName,
            atcId,
            managerEmail: email,
            phoneNumber,
            managerId: id,
            managerName: fullName,
          },
        })
      );
    } else if (data?.status === "error") {
      dispatch(logoutUser());
    }
  }, [data, dispatch]);

  return <>{isLoading ? <MLoader type="dots" /> : children}</>;
};

export default memo(ProfilerFetcher);
