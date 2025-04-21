"use client";
import MLayout from "@/ui/MLayout/MLayout";
import React, { memo } from "react";
import IndiaMap from "./IndiaMap";
import { Box } from "@mantine/core";
import classes from "../styles/index.module.scss";
import { useGetMapCoordinates } from "@/hooks/query/useGetMapCoordinates.query";
import MTypography from "@/ui/MTypography/MTypography";

const MapContainer: React.FC = () => {
  const { data, isLoading } = useGetMapCoordinates();
  return (
    <MLayout>
      <Box className={classes.top}>
        <Box className={classes.aimBox}>
          <MTypography
            variant="subHeading"
            className={classes.aim}
            text="Training Centers Across India"
          />
        </Box>

        <Box>{!isLoading && <IndiaMap markers={data?.data} />}</Box>
      </Box>
    </MLayout>
  );
};

export default memo(MapContainer);
