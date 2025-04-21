import ChangeATCStatus from "@/components/actions/ChangeATCStatus";
import { TTableColumns } from "@/types/table";
import MImage from "@/ui/MImage/MImage";
import { Flex, Stack, Text } from "@mantine/core";
import { IconBuilding, IconLocation, IconSchool } from "@tabler/icons-react";

export interface ATCWithManagerInfo {
  _id: string;
  atcName: string;
  atcImage: string;
  city: string;
  state: string;
  active: boolean;
  totalTrainings: number;
  collegeName: string;
  managerName: string;
}

export const ATCColumns: TTableColumns<ATCWithManagerInfo>[] = [
  {
    key: "atcImage",
    label: "Image",
    minWidth: 80,
    renderCell(value) {
      return (
        <MImage
          width={80}
          height={80}
          alt="image of atc"
          url={value.atcImage}
          style={{ width: 80, height: 80, borderRadius: "50%" }}
        />
      );
    },
  },
  {
    key: "atcName",
    label: "Center Name",
    minWidth: 100,
  },

  {
    key: "city",
    label: "College",
    minWidth: 200,
    renderCell: (value) => {
      return (
        <Stack gap={2}>
          <Flex gap={"sm"} align={"center"}>
            <IconSchool color="#222222" size={20} />
            <Text size="md" c={"#222222"}>
              {value.collegeName}
            </Text>
          </Flex>
          <Flex gap={"sm"} align={"center"}>
            <IconBuilding color="black" size={20} />
            <Text size="md" c={"black"}>
              {value.city}
            </Text>
          </Flex>
          <Flex gap={"sm"} align={"center"}>
            <IconLocation color="#169976" size={20} />
            <Text size="md" c={"#169976"}>
              {value.state}
            </Text>
          </Flex>
        </Stack>
      );
    },
  },
  {
    key: "managerName",
    label: "Manager",
    minWidth: 100,
  },
  {
    key: "totalTrainings",
    label: "Trainings",
    renderCell: (value) => {
      return <Text ta={"left"}>{value.totalTrainings}</Text>;
    },
  },
  {
    key: "status",
    label: "Action",
    minWidth: 100,
    renderCell: (value) => {
      return (
        <ChangeATCStatus
          currentState={value.active ? "active" : "inactive"}
          id={value._id}
        />
      );
    },
  },
];
