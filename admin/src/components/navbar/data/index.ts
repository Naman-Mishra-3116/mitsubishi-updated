import { ROUTES } from "@/enums/routes.enum";
import {
  Icon,
  IconBook,
  IconBrowserCheck,
  IconCalendarTime,
  IconLayoutDashboardFilled,
  IconPencilCog,
  IconProps,
  IconSchool,
  IconServerSpark,
  IconTrack,
  IconUserCircle,
  IconUsersPlus,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavItem {
  title: string;
  link: string;
  tablerIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

export const ReadHome: NavItem[] = [
  {
    link: ROUTES.DASHBOARD,
    title: "Dashboard",
    tablerIcon: IconLayoutDashboardFilled,
  },
  {
    link: ROUTES.VIEW_ALL_ADMIN,
    title: "View Admins",
    tablerIcon: IconServerSpark,
  },
  {
    link: ROUTES.ATC,
    title: "View ATC's",
    tablerIcon: IconSchool,
  },
  {
    link: ROUTES.MANAGERS,
    title: "View Managers",
    tablerIcon: IconUserCircle,
  },
  {
    link: ROUTES.ALL_TRAINING,
    title: "View Trainings",
    tablerIcon: IconTrack,
  },
  {
    link: ROUTES.INFO,
    title: "Yearly Information",
    tablerIcon: IconCalendarTime,
  },
];
export const WriteHome: NavItem[] = [
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
    title: "View Admins",
    tablerIcon: IconServerSpark,
  },
  {
    link: ROUTES.ATC,
    title: "View ATC's",
    tablerIcon: IconSchool,
  },
  {
    link: ROUTES.ADD_ATC,
    title: "Create ATC",
    tablerIcon: IconServerSpark,
  },
  {
    link: ROUTES.MANAGERS,
    title: "View Managers",
    tablerIcon: IconUserCircle,
  },
  {
    link: ROUTES.ALL_TRAINING,
    title: "View Trainings",
    tablerIcon: IconTrack,
  },
  {
    link: ROUTES.INFO,
    title: "Yearly Information",
    tablerIcon: IconCalendarTime,
  },
];

export const WriteDetails: NavItem[] = [
  { link: "/:id/edit", title: "Edit ATC", tablerIcon: IconPencilCog },
  { link: "/:id/trainings", title: "View Trainings", tablerIcon: IconBook },
  { link: "/:id/manager", title: "Edit Manager", tablerIcon: IconBrowserCheck },
];

export const ReadDetails: NavItem[] = [
  { link: "/:id/edit", title: "ATC Details", tablerIcon: IconSchool },
  { link: "/:id/trainings", title: "View Trainings", tablerIcon: IconBook },
  {
    link: "/:id/manager",
    title: "Manager Details",
    tablerIcon: IconBrowserCheck,
  },
];
