"use client";
import { useGetAdminProfileData } from "@/hooks/query/useAdminProfileData.query";
import { useAppDispatch } from "@/store/hooks";
import { setUserData } from "@/store/reducers/authSlice";
import MLoader from "@/ui/MLoader/MLoader";
import { useRouter } from "next/navigation";
import React, { memo, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const ProfilerFetcher: React.FC<IProps> = ({ children }) => {
  const { data, isLoading } = useGetAdminProfileData();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(
        setUserData({
          isAuthenticated: true,
          user: {
            id: data.data.id,
            email: data.data.email,
            fullName: data.data.fullName,
            permission: data.data.permission,
            role: data.data.role,
          },
        })
      );
    } else if (data?.status === "error") {
      router.replace("/login");
    }
  }, [data, dispatch, router]);

  return <>{isLoading ? <MLoader type="dots" /> : children}</>;
};

export default memo(ProfilerFetcher);
