import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useChangeManagerStatusMutation } from "@/hooks/mutation/useChangeManagerStatus.mutation";
import MActionIcon from "@/ui/MActionIcon/MActionIcon";
import { confirmationAlert } from "@/ui/MAlerts/confirmationAlert";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";

interface IProps {
  currentStatus: "active" | "inactive";
  id: string;
}

const ChangeManagerStatus: React.FC<IProps> = ({ currentStatus, id }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useChangeManagerStatusMutation();

  const handleMutation = async () => {
    const confirmation = await confirmationAlert({
      title: "Attention",
      msg: `Are you sure you want to ${
        currentStatus === "active" ? "Block" : "Unblock"
      } this manager ?`,
    });

    if (!confirmation) {
      return;
    }
    const resp = await mutateAsync({
      id,
      status: currentStatus === "active" ? false : true,
    });

    if (resp.status === "success") {
      notifications.show({
        title: resp.title,
        message: resp.message,
        color: "green",
      });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_MANAGERS] });
    } else {
      notifications.show({
        title: resp.title,
        message: resp.message,
        color: "red",
      });
    }
  };
  return (
    <MActionIcon
      variant={currentStatus}
      handleClick={handleMutation}
      toolTip={currentStatus === "active" ? "Block Manager" : "Unblock Manager"}
    />
  );
};

export default memo(ChangeManagerStatus);
