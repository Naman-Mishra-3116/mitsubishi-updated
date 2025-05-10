import { TTableColumns } from "@/types/table";
import { Text } from "@mantine/core";

export type Student = {
  Name: string;
  RollNumber: string;
  Email: string;
  TotalAttendence: string;
  Feedback: string;
};

export const AllStudents: TTableColumns<Student>[] = [
  {
    key: "Name",
    label: "Name",
  },
  {
    key: "RollNumber",
    label: "Enroll No.",
  },
  {
    key:"College",
    label:"College",
  },
  {
    key: "Email",
    label: "Email",
  },
  {
    key: "TotalAttendance",
    label: "Attendance",
  },
  {
    key: "Feedback",
    label: "Training Feedback",
    renderCell: (item) => {
      return <Text size="md">{item.Feedback}</Text>;
    },
  },
];
