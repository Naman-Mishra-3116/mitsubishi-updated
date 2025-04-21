import { ROUTES } from "@/enums/routes.enum";
import {
  Icon,
  IconBook,
  IconBrowserCheck,
  IconLayoutDashboardFilled,
  IconPencilCog,
  IconProps,
  IconSchool,
  IconServerSpark,
  IconUserCircle,
  IconUsersPlus,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface NavItem {
  title: string;
  link: string;
  tablerIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}
export const home: NavItem[] = [
  {
    link: ROUTES.DASHBOARD,
    title: "Dashboard",
    tablerIcon: IconLayoutDashboardFilled,
  },

  {
    link: ROUTES.CREATE_ADMIN,
    title: "Create Admin",
    tablerIcon: IconUsersPlus,
  },
  {
    link: ROUTES.VIEW_ALL_ADMIN,
    title: "Admins",
    tablerIcon: IconServerSpark,
  },
  {
    link: ROUTES.ATC,
    title: "Authorized TC's",
    tablerIcon: IconSchool,
  },
  {
    link: ROUTES.ADD_ATC,
    title: "Add ATC",
    tablerIcon: IconServerSpark,
  },
  {
    link: ROUTES.MANAGERS,
    title: "All Managers",
    tablerIcon: IconUserCircle,
  },
];

export const details: NavItem[] = [
  { link: "/:id/edit", title: "Edit ATC", tablerIcon: IconPencilCog },
  { link: "/:id/trainings", title: "All Trainings", tablerIcon: IconBook },
  { link: "/:id/manager", title: "Edit Manager", tablerIcon: IconBrowserCheck },
];
