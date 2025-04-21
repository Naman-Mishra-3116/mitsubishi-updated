import ChangeManagerStatus from "@/components/actions/ChangeManagerStatus";
import { TTableColumns } from "@/types/table";

interface ManagerDetails {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  active: boolean;
  atcName: string;
}

export const AllManagers: TTableColumns<ManagerDetails>[] = [
  {
    key: "name",
    label: "Name",
    minWidth: 120,
  },
  {
    key: "email",
    label: "Email",
    minWidth: 120,
  },
  {
    key: "phoneNumber",
    label: "Contact",
    minWidth: 120,
  },
  {
    key: "atcName",
    label: "Belongs To",
    minWidth: 120,
  },
  {
    key: "active",
    label: "Status",
    renderCell: (value) => {
      return (
        <ChangeManagerStatus
          id={value._id}
          currentStatus={value.active ? "active" : "inactive"}
        />
      );
    },
  },
];
