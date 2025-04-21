import {
  Icon,
  IconMail,
  IconProps,
  IconUser,
  IconBuildingBank,
  IconMap2,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface tileData {
  key: string;
  title: string;
  tablerIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}


export const tileData: tileData[] = [
  {
    key: "managerName",
    title: "Manager Name",
    tablerIcon: IconUser,
  },
  {
    key: "managerEmail",
    title: "Manger Email",
    tablerIcon: IconMail,
  },
  {
    key: "phoneNumber",
    title: "Phone Number",
    tablerIcon: IconPhone,
  },
  {
    key: "city",
    title: "City",
    tablerIcon: IconBuildingBank,
  },
  {
    key: "state",
    title: "State",
    tablerIcon: IconMap2,
  },
  {
    key: "collegeName",
    title: "College Name",
    tablerIcon: IconSchool,
  },
];
