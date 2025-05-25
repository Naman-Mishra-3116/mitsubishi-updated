"use client";
import MTypography from "@/ui/MTypography/MTypography";
import { Badge, Box, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import classes from "../styles/viewSpecific.module.scss";
import StudentTable from "./StudentTable";
import { useGetSpecificTraining } from "@/hooks/query/useGetSpecificTraining.query";
import { useApproveTraining } from "@/hooks/mutation/useApproveTraining.mutation";
import MButton from "@/ui/MButton/MButton";
import { useAppSelector } from "@/store/hooks";
import { confirmationAlert } from "@/ui/MAlerts/confirmationAlert";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { notifications } from "@mantine/notifications";
import ViewAllTrainingImages from "./ViewAllTrainingImages";
import { useDisclosure } from "@mantine/hooks";

const ViewSpecificTraining: React.FC = () => {
  const { trainingId } = useParams();
  const { data } = useGetSpecificTraining(trainingId as string);
  const { mutateAsync } = useApproveTraining();
  const { permission } = useAppSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const handleApprove = async () => {
    const confirm = await confirmationAlert({
      title: "Approve Training",
      msg: "Are you sure you want to approve this training?",
    });
    if (!confirm) {
      return;
    }

    const resp = await mutateAsync(trainingId as string);
    if (resp.status === "success") {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_TRAINING] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SPECIFIC_TRAINING],
      });
    }

    notifications.show({
      message: resp.message,
      title: resp.title,
      color: resp.status === "success" ? "green" : "red",
    });
  };

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
              <Text className={classes.label}>View Training Images</Text>
              <Box className={classes.value} onClick={open}>
                <Badge
                  style={{ cursor: "pointer" }}
                  color="blue"
                  variant="filled"
                  size="lg"
                  radius="md"
                  w={120}
                >
                  View Images
                </Badge>
              </Box>
            </Group>

            {permission === "WRITE" && !data?.data?.isApproved ? (
              <Group justify="space-between">
                <Text className={classes.label}>Approve Training</Text>
                <Box className={classes.value}>
                  <MButton
                    text="Approve"
                    variant="filled"
                    size="md"
                    p="sm"
                    radius="md"
                    handleClick={handleApprove}
                  />
                </Box>
              </Group>
            ) : (
              <Group justify="space-between">
                <Text className={classes.label}>Status</Text>
                <Box className={classes.value}>
                  <Badge
                    color={data?.data?.isApproved ? "green" : "red"}
                    variant="filled"
                    size="lg"
                    radius="md"
                    w={120}
                  >
                    {data?.data?.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </Box>
              </Group>
            )}
          </Stack>
        </Box>
      </Box>
      <StudentTable data={data?.data?.csv ?? []} />;
      <ViewAllTrainingImages
        opened={opened}
        onClose={close}
        images={data?.data?.images ?? []}
      />
    </Box>
  );
};

export default memo(ViewSpecificTraining);
