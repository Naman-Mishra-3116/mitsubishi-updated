"use client";
import { Box } from "@mantine/core";
import React, { memo } from "react";
import classes from "../styles/dashboardContainer.module.scss";
import DashboardCard from "./DashboardCard";
import { ICONS } from "@/assets/icons";
import { useGetDashboardData } from "@/hooks/query/useGetDashboardStats.query";

const DashBoardContainer: React.FC = () => {
  const { data } = useGetDashboardData();
  return (
    <Box className={classes.root}>
      <DashboardCard
        Icon={ICONS.adminIcon}
        name="Admins"
        figure={data?.data?.totalAdmins ?? 0}
        lastUpdated="today"
      />
      <DashboardCard
        Icon={ICONS.atcIcon}
        name="Training Centers"
        figure={data?.data?.totalATCs ?? 0}
        lastUpdated="today"
      />
      <DashboardCard
        Icon={ICONS.trainingIcon}
        name="Trainings"
        figure={data?.data?.totalTrainings ?? 0}
        lastUpdated="today"
      />
      <DashboardCard
        lastUpdated="today"
        Icon={ICONS.studentIcon}
        name="Students trained"
        figure={data?.data?.totalStudents ?? 0}
      />
    </Box>
  );
};

export default memo(DashBoardContainer);
