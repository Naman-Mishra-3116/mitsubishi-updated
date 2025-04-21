import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface tileData {
  key: string;
  title: string;
  tablerIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

import {
  IconPhone,
  IconKey,
  IconPasswordUser,
  IconBuildingBank,
  IconMap2,
} from "@tabler/icons-react";

export const tileData: tileData[] = [
  {
    key: "phoneNumber",
    title: "Phone Number",
    tablerIcon: IconPhone,
  },
  {
    key: "permission",
    title: "Permission",
    tablerIcon: IconKey,
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
    key: "password",
    title: "Password",
    tablerIcon: IconPasswordUser,
  },
];
