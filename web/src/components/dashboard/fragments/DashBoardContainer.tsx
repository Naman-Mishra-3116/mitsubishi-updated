"use client";
import { Box } from "@mantine/core";
import React, { memo } from "react";
import classes from "../styles/dashboardContainer.module.scss";
import DashboardCard from "./DashboardCard";
import { ICONS } from "@/assets/icons";
import { useGetATCDashboard } from "@/hooks/query/useGetATCDashboard.query";

const DashBoardContainer: React.FC = () => {
  const { data } = useGetATCDashboard();

  return (
    <Box className={classes.root}>
      <DashboardCard
        Icon={ICONS.trainingIcon}
        name="Total Trainings"
        figure={data?.data?.totalTrainings ?? 0}
      />
      <DashboardCard
        Icon={ICONS.studentIcon}
        name="Students trained"
        figure={data?.data?.totalStudents ?? 0}
      />
    </Box>
  );
};

export default memo(DashBoardContainer);
