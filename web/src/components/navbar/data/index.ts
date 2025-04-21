import {
  Icon,
  IconLayoutDashboardFilled,
  IconProps,
  IconUsersPlus,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface NavItem {
  title: string;
  link: string;
  tablerIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}
export const managerLinks: NavItem[] = [
  {
    link: "",
    title: "Dashboard",
    tablerIcon: IconLayoutDashboardFilled,
  },

  {
    link: "/",
    title: "Create Training",
    tablerIcon: IconUsersPlus,
  },
];
