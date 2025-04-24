import { TTableColumns } from "@/types/table";
import MActionIcon from "@/ui/MActionIcon/MActionIcon";
import { Badge, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";

type Training = {
  _id: string;
  startDate: string;
  endDate: string;
  totalStudents: number;
  serialNumber: number;
  title: string;
  approved: boolean;
};

export const AllTrainingColumns: TTableColumns<Training>[] = [
  {
    key: "serialNumber",
    label: "S.no",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "startDate",
    label: "Start Date",
    renderCell(item) {
      return <Text>{dayjs(item.startDate).format("DD MMM YYYY")}</Text>;
    },
  },
  {
    key: "endDate",
    label: "End Date",
    minWidth:0,
    renderCell(item) {
      return <Text>{dayjs(item.endDate).format("DD MMM YYYY")}</Text>;
    },
  },
  {
    key: "totalStudents",
    label: "Total Students",
  },
  {
    key: "approved",
    label: "Status",
    renderCell(item) {
      return item.approved ? (
        <Flex>
          <Badge color="green">Approved</Badge>
          <MActionIcon href="/" variant="redirect" toolTip="view details" />
        </Flex>
      ) : (
        <Badge color="red">Pending</Badge>
      );
    },
  },
];
