import { ROUTES } from "@/enums/routes.enum";
import { TTableColumns } from "@/types/table";
import MActionIcon from "@/ui/MActionIcon/MActionIcon";
import { Badge, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";

type TrainingData = {
  isApproved: boolean;
  startDate: Date;
  endDate: Date;
  totalStudents: number;
  title: string;
  trainingId: string;
  atcName: string;
  managerName: string;
  serialNumber: number;
  atcId: string;
};

export const AllTrainingColumn: TTableColumns<TrainingData>[] = [
  { key: "serialNumber", label: "S.no", minWidth: 50 },
  { key: "title", label: "Title" },
  {
    key: "startDate",
    label: "Duration",
    renderCell(item) {
      return (
        <Flex align={"center"} gap={"md"}>
          <span>{dayjs(item.startDate).format("DD MMM YYYY")}</span>
          <span>&mdash;</span>
          <span>{dayjs(item.endDate).format("DD MMM YYYY")}</span>
        </Flex>
      );
    },
  },
  {
    key: "totalStudents",
    label: "Students",
  },
  {
    key: "atcName",
    label: "Conducted By",
    renderCell(item) {
      return (
        <Flex direction={"column"} gap={"5px"}>
          <Flex gap={"sm"} align={"center"}>
            <Text c="black" fw={"bold"}>
              ATC &mdash;
            </Text>
            <Text>{item.atcName}</Text>
          </Flex>
          <Flex gap={"sm"} align={"center"}>
            <Text c="black" fw={"bold"}>
              Manager &mdash;
            </Text>
            <Text>{item.managerName}</Text>
          </Flex>
        </Flex>
      );
    },
  },
  {
    key: "isApproved",
    label: "Status",
    renderCell(value) {
      return (
        <Badge bg={value.isApproved ? "green" : "red"}>
          {value.isApproved ? "Approved" : "Pending"}
        </Badge>
      );
    },
  },
  {
    key: "trainingId",
    label: "View",
    renderCell: (item) => {
      return (
        <MActionIcon
          toolTip="View Specific Details"
          variant="redirect"
          href={ROUTES.SPECIFIC_TRAINING.replace("atcId", item.atcId).replace(
            "trainingId",
            item.trainingId
          )}
        />
      );
    },
  },
];
