import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import { Box, Flex } from "@mantine/core";
import { IconMail, IconUser } from "@tabler/icons-react";
import React, { memo } from "react";
import classes from "../styles/index.module.scss";

interface IProps {
  managerName: string;
  managerEmail: string;
  atcName: string;
  collegeName: string;
  totalTrainings: string;
  address: string;
  city: string;
  state: string;
  totalStudents: string;
  imageURL:string;
}

const Card: React.FC<IProps> = ({
  address,
  atcName,
  city,
  collegeName,
  managerEmail,
  managerName,
  state,
  totalStudents,
  totalTrainings,
}) => {
  return (
    <Box className={classes.card}>
      <MImage
        className={classes.bgImage}
        alt="bg mitsubishi"
        name="mistubishiLogoOnly"
      />
      <MTypography
        variant="descriptionMedium"
        text={atcName}
        className={classes.atcName}
      />
      <MTypography
        variant="descriptionMedium"
        text={collegeName}
        className={classes.clgName}
      />
      <MTypography
        variant="description"
        text="Authorised Training Centre of Mitsubishi Electric India's Factory Automation & Industrial Division"
        className={classes.desc}
      />

      <MTypography
        variant="description"
        text={`Conducted ${totalTrainings}+ engaging training sessions, guiding ${totalStudents}+ students through practical, hands-on learning experiences.`}
        className={classes.training}
      />

      <Box>
        <MTypography
          variant="normal"
          className={classes.address}
          text={address}
        />
        <MTypography
          variant="normal"
          className={classes.address}
          text={`${city}, (${state})`}
        />
      </Box>

      <Box className={classes.box}>
        <Flex className={classes.flexContainer}>
          <Flex className={classes.innerFlex}>
            <IconUser className={classes.icon} />
            <MTypography
              variant="normal"
              text="Manager"
              className={classes.txt}
            />
          </Flex>
          <Box>
            <MTypography
              variant="normal"
              text={managerName}
              className={classes.txt}
            />
          </Box>
        </Flex>

        <Flex className={classes.flexContainer}>
          <Flex className={classes.innerFlex}>
            <IconMail className={classes.icon} />
            <MTypography
              variant="normal"
              text="Email"
              className={classes.txt}
            />
          </Flex>
          <Box>
            <MTypography
              variant="normal"
              text={managerEmail}
              className={classes.txt}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default memo(Card);
