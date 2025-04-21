import ChangeAdminStatus from "@/components/actions/ChangeAdminStatus";
import { TTableColumns } from "@/types/table";
import { Text } from "@mantine/core";

export type AdminUser = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  permission: string;
  city: string;
  state: string;
  phoneNumber: string;
  isBlocked: boolean;
};

export const AdminColumn: TTableColumns<AdminUser>[] = [
  {
    key: "fullName",
    label: "Name",
    minWidth: 150,
  },
  {
    key: "email",
    label: "Email",
    minWidth: 250,
  },
  {
    key: "role",
    label: "Admin Type",
    minWidth: 150,
  },
  {
    key: "permission",
    label: "Permission",
    minWidth: 150,
  },
  {
    key: "city",
    label: "City",
    renderCell: (data) => {
      return <Text>{data.city ?? "NA"}</Text>;
    },

    minWidth: 100,
  },
  {
    key: "state",
    label: "State",
    renderCell: (data) => {
      return <Text>{data.state ?? "NA"}</Text>;
    },
    minWidth: 150,
  },
  {
    key: "phoneNumber",
    label: "Phone Number",
    minWidth: 150,
  },
  {
    key: "isBlocked",
    label: "Status",
    renderCell: (data) => {
      return (
        <ChangeAdminStatus
          currentStatus={data.isBlocked ? "inactive" : "active"}
          id={data._id}
        />
      );
    },
    minWidth: 100,
  },
];
