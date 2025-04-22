"use client";
import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { managerLinks } from "../data";
import styles from "../styles/navbar.module.scss";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  console.log("pathname is", pathname);
  return (
    <Box className={styles.root}>
      <Link href={"/"} style={{ textDecoration: "none" }}>
        <Box className={styles.imageContainer}>
          <MImage alt="logo" name="logoBlack" width={120} height={40} />
        </Box>
      </Link>

      <Box className={styles.tileContainer}>
        {managerLinks.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={item.link === pathname ? styles.activeTile : styles.tile}
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
        ))}
      </Box>
    </Box>
  );
};
export default memo(Navbar);
