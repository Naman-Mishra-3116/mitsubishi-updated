import MTypography from "@/ui/MTypography/MTypography";
import { Box, Center, Divider } from "@mantine/core";
import React, { memo } from "react";
import { IconType } from "react-icons/lib";
import classes from "../styles/dashboardCard.module.scss";
import { ICONS } from "@/assets/icons";

interface IProps {
  Icon: IconType;
  name: string;
  figure: string;
  lastUpdated: string;
}

const DashboardCard: React.FC<IProps> = ({
  Icon,
  name,
  figure,
  lastUpdated,
}) => {
  return (
    <Box className={classes.card}>
      <Center className={classes.smallCard}>
        <Icon className={classes.icon} />
      </Center>
      <Box className={classes.textContainer}>
        <MTypography
          text={name}
          variant="descriptionMedium"
          className={classes.key}
        />
        <MTypography
          text={figure}
          variant="subHeading"
          className={classes.value}
        />
      </Box>
      <Divider my={"sm"} size={"0.5px"} color="#97989d" />
      <Box className={classes.bottomFlex}>
        <ICONS.calenderIcon />
        <MTypography
          variant="subTitle"
          text={lastUpdated}
          className={classes.bottomText}
        />
      </Box>
    </Box>
  );
};

export default memo(DashboardCard);
