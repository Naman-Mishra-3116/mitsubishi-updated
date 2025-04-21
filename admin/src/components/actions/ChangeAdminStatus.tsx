import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useChangeAdminStatusMutation } from "@/hooks/mutation/useChangeAdminStatusMutation.mutation";
import MActionIcon from "@/ui/MActionIcon/MActionIcon";
import { confirmationAlert } from "@/ui/MAlerts/confirmationAlert";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";

interface IProps {
  id: string;
  currentStatus: "active" | "inactive";
}

const ChangeAdminStatus: React.FC<IProps> = ({ id, currentStatus }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useChangeAdminStatusMutation();

  const handleMutation = async () => {
    const confirmation = await confirmationAlert({
      title: "Attention",
      msg: `Are you sure you want to ${
        currentStatus === "active" ? "Block" : "Unblock"
      } this admin ?`,
    });

    if (!confirmation) {
      return;
    }
    const resp = await mutateAsync({
      id,
      status: currentStatus === "active" ? true : false,
    });

    if (resp.status === "success") {
      notifications.show({
        title: resp.title,
        message: resp.message,
        color: "green",
      });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_ADMIN] });

      /**
       * @load this can also be removed testing remaining 
       */
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_PROFILE_DATA],
      });
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
      toolTip={currentStatus === "active" ? "Block Admin" : "Unblock Admin"}
    />
  );
};

export default memo(ChangeAdminStatus);
