"use clinet";
import MLoader from "@/ui/MLoader/MLoader";
import { Box } from "@mantine/core";
import React, { memo } from "react";
import { useGetYearCalendar } from "../../../hooks/query/useGetYearCalendar.query";

const CalenderContainer: React.FC = () => {
  const { data, isLoading } = useGetYearCalendar();

  return isLoading ? (
    <MLoader type="dots" />
  ) : (
    <Box style={{ height: "800px", border: "1px solid #ccc" }}>
      <iframe
        src={data?.data?.calendarLink}
        width="100%"
        height="100%"
        style={{ border: "none", scrollbarWidth: "none" }}
      />
    </Box>
  );
};

export default memo(CalenderContainer);
