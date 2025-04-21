"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useUpdateATCSTatusMutation } from "@/hooks/mutation/useChangeATCStatus.mutation";
import MActionIcon from "@/ui/MActionIcon/MActionIcon";
import { confirmationAlert } from "@/ui/MAlerts/confirmationAlert";
import { Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";

interface IProps {
  currentState: "active" | "inactive";
  id: string;
}

const ChangeATCStatus: React.FC<IProps> = ({ currentState, id }) => {
  const { mutateAsync } = useUpdateATCSTatusMutation();
  const queryClient = useQueryClient();

  const changeATCStatus = async () => {
    const confirmation = await confirmationAlert({
      title: "Attention",
      msg: `Are you sure you want to ${
        currentState === "active" ? "Block" : "Unblock"
      } this ATC ?`,
    });

    if (!confirmation) {
      return;
    }

    const resp = await mutateAsync({
      id,
      status: currentState === "active" ? false : true,
    });

    if (resp.status === "success") {
      notifications.show({
        title: resp.title,
        message: resp.message,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_ATC] });
    } else {
      notifications.show({
        title: resp.message,
        message: resp.error,
        color: "red",
      });
    }
  };

  return (
    <Group gap={"sm"}>
      <MActionIcon
        handleClick={changeATCStatus}
        variant={currentState}
        toolTip={currentState === "active" ? "Block ATC" : "Unblock ATC"}
      />
      <MActionIcon
        variant="redirect"
        href={`/${id}/edit`}
        toolTip="View Details"
      />
    </Group>
  );
};

export default memo(ChangeATCStatus);
