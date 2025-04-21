import { ActionIcon, Tooltip } from "@mantine/core";
import React, { memo } from "react";
import { IconExternalLink, IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";

type IProps =
  | {
      variant: "active" | "inactive";
      handleClick: () => void;
      toolTip: string;
    }
  | {
      variant: "redirect";
      toolTip: string;
      href: string;
    };

const MActionIcon: React.FC<IProps> = (props) => {
  switch (props.variant) {
    case "active":
    case "inactive":
      return (
        <Tooltip label={props.toolTip}>
          <ActionIcon
            bd={props.variant === "active" ? "green" : "red"}
            onClick={props.handleClick}
            size={30}
            variant="default"
            aria-label="ActionIcon with size as a number"
          >
            {props.variant === "active" ? (
              <IconEye color="green" />
            ) : (
              <IconEyeOff color="red" />
            )}
          </ActionIcon>
        </Tooltip>
      );

    case "redirect":
      return (
        <Tooltip label={props.toolTip ?? "View Details"}>
          <Link style={{ textDecoration: "none" }} href={props.href}>
            <ActionIcon
              size={30}
              variant="default"
              aria-label="ActionIcon with size as a number"
            >
              <IconExternalLink />
            </ActionIcon>
          </Link>
        </Tooltip>
      );
  }
};

export default memo(MActionIcon);
