"use client";
import { PERMISSION } from "@/enums/permission.enum";
import { useAppSelector } from "@/store/hooks";
import MImage from "@/ui/MImage/MImage";
import { Box } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";
import { ReadDetails, ReadHome, WriteDetails, WriteHome } from "../data";
import styles from "../styles/navbar.module.scss";
import PermissionLink from "./PermissionLink";

interface IProps {
  layoutType: "home" | "details";
}

const Navbar: React.FC<IProps> = ({ layoutType }) => {
  const { id } = useParams();
  const permission = useAppSelector((state) => state.auth.user.permission);

  return (
    <Box className={styles.root}>
      <Link href={"/"} style={{ textDecoration: "none" }}>
        <Box className={styles.imageContainer}>
          <MImage alt="logo" name="logoBlack" width={120} height={40} />
        </Box>
      </Link>

      <Box className={styles.tileContainer}>
        {layoutType === "home" ? (
          <PermissionLink
            id={id as string}
            layoutType="home"
            data={permission === PERMISSION.WRITE ? WriteHome : ReadHome}
          />
        ) : (
          <PermissionLink
            id={id as string}
            layoutType="details"
            data={permission === PERMISSION.WRITE ? WriteDetails : ReadDetails}
          />
        )}
      </Box>
    </Box>
  );
};
export default memo(Navbar);
