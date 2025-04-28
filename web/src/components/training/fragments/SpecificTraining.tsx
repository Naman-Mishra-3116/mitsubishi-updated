"use client";
import { useGetSpecificTraining } from "@/hooks/query/useGetSpecificTraining.query";
import MTypography from "@/ui/MTypography/MTypography";
import { Badge, Box, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import classes from "../styles/student.module.scss";
import StudentTable from "./StudentTable";

const SpecificTraining: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetSpecificTraining(id as string);
  return (
    <Box className={classes.top}>
      <Box className={classes.tBox}>
        <Box className={classes.tLeft}>
          <MTypography
            variant="heading"
            text={data?.data?.title}
            className={classes.title}
          />
          <MTypography
            variant="description"
            className={classes.description}
            text={
              data?.data?.description ??
              `When working with Excel files in web applications,  then be passed to the xlsx library to parse. The xlsx.read method interprets this buffer and loads the workbook, after which we can extract the data from the first sheet using XLSX.utils.sheet_to_json. Adding options like defval: "" ensures that empty cells are preserved with blank values, maintaining the structure. This approach is efficient, scalable, and integrates well into backend services where files are uploaded and served over HTTP. Additionally, incorporating validation logic to match the required fields like "Name", "RollNumber", "Email", etc., makes the system more robust and prevents faulty uploads, enhancing the overall reliability of the application.`
            }
          />
        </Box>
        <Box className={classes.tRight}>
          <Stack gap="sm" className={classes.detailContainer}>
            <Group justify="space-between">
              <Text className={classes.label}>ATC Name</Text>
              <Text className={classes.value}>{data?.data?.atcName}</Text>
            </Group>

            <Group justify="space-between">
              <Text className={classes.label}>Start Date</Text>
              <Text className={classes.value}>
                {dayjs(data?.data?.startDate).format("DD MMM YYYY")}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text className={classes.label}>End Date</Text>
              <Text className={classes.value}>
                {dayjs(data?.data?.endDate).format("DD MMM YYYY")}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text className={classes.label}>Total Students</Text>
              <Text className={classes.value}>{data?.data?.totalStudents}</Text>
            </Group>

            <Group justify="space-between">
              <Text className={classes.label}>Status</Text>
              <Box className={classes.value}>
                <Badge
                  color={data?.data?.isApproved ? "green" : "red"}
                  variant="filled"
                  size="lg"
                  radius="md"
                >
                  {data?.data?.isApproved ? "Approved" : "Pending"}
                </Badge>
              </Box>
            </Group>
          </Stack>
        </Box>
      </Box>
      <StudentTable data={data?.data?.csv ?? []} />;
    </Box>
  );
};

export default memo(SpecificTraining);
