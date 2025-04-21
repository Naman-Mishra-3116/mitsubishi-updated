"use client";
import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { memo } from "react";
import { home, details } from "../data";
import styles from "../styles/navbar.module.scss";

interface IProps {
  layoutType: "home" | "details";
}

const Navbar: React.FC<IProps> = ({ layoutType }) => {
  const pathname = usePathname();
  const { id } = useParams();

  return (
    <Box className={styles.root}>
      <Link href={"/"} style={{ textDecoration: "none" }}>
        <Box className={styles.imageContainer}>
          <MImage alt="logo" name="logoBlack" width={120} height={40} />
        </Box>
      </Link>

      <Box className={styles.tileContainer}>
        {layoutType === "home"
          ? home.map((item) => (
              <Link
                href={item.link}
                key={item.link}
                className={
                  item.link === pathname ? styles.activeTile : styles.tile
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
            ))
          : details.map((item) => {
              return (
                <Link
                  href={item.link.replace(":id", id as string)}
                  key={item.link}
                  className={
                    item.link.replace(":id", id as string) === pathname
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
      </Box>
    </Box>
  );
};
export default memo(Navbar);
