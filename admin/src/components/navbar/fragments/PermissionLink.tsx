"use client";
import Link from "next/link";
import React, { memo } from "react";
import { NavItem } from "../data";
import { usePathname } from "next/navigation";
import styles from "../styles/navbar.module.scss";
import MTypography from "@/ui/MTypography/MTypography";

interface IProps {
  data: NavItem[];
  layoutType: "home" | "details";
  id: string;
}

const PermissionLink: React.FC<IProps> = ({ data, id, layoutType }) => {
  const pathname = usePathname();
  return (
    <>
      {data.map((item) => {
        return (
          <Link
            href={
              layoutType === "home"
                ? item.link
                : item.link.replace(":id", id as string)
            }
            key={item.link}
            className={
              layoutType === "home"
                ? item.link === pathname
                  ? styles.activeTile
                  : styles.tile
                : item.link.replace(":id", id as string) === pathname
                ? styles.activeTile
                : styles.tile
            }
          >
            <item.tablerIcon className={styles.icon} size={20} />
            <MTypography
              text={item.title}
              fontWeight={500}
              fontSize="16px"
              variant="normal"
              className={styles.tileText}
            />
          </Link>
        );
      })}
    </>
  );
};

export default memo(PermissionLink);
