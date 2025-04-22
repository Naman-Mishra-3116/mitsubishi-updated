import { ROUTES } from "@/enums/routes.enum";
import {
  Icon,
  IconLayoutDashboardFilled,
  IconProps,
  IconSchool,
  IconTrack,
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
    link: ROUTES.DASHBOARD,
    title: "Dashboard",
    tablerIcon: IconLayoutDashboardFilled,
  },

  {
    link: ROUTES.COLLEGE_PROFILE,
    title: "College Profile",
    tablerIcon: IconSchool,
  },
  {
    link: ROUTES.CREATE_TRAINING,
    title: "Add Training",
    tablerIcon: IconUsersPlus,
  },
  {
    link: ROUTES.ALL_TRAINING,
    title: "All Training",
    tablerIcon: IconTrack,
  },
];
