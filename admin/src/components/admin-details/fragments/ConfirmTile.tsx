import MTypography from "@/ui/MTypography/MTypography";
import { Center, Flex } from "@mantine/core";
import React, { ForwardRefExoticComponent, memo, RefAttributes } from "react";
import classes from "../styles/createConfirm.module.scss";
import { Icon, IconProps } from "@tabler/icons-react";

interface IProps {
  title: string;
  value: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

const ConfirmTile: React.FC<IProps> = ({ title, value, Icon }) => {
  return (
    <Flex className={classes.keyValueHolder}>
      <Flex gap={"xs"} align={"center"} style={{ width: "150px" }}>
        <Center className={classes.center}>
          <Icon size={15} />
        </Center>
        <MTypography text={title} variant="subTitle" />
      </Flex>
      <span>&mdash;</span>
      <MTypography text={value} variant="normal" fontWeight={"bold"} />
    </Flex>
  );
};

export default memo(ConfirmTile);
