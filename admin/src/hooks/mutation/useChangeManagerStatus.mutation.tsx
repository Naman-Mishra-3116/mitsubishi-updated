import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

type IdAndStatus = {
  id: string;
  status: boolean;
};
const changeStatus = async ({ id, status }: IdAndStatus) => {
  const resp = await request({
    method: "POST",
    url: API_URL.CHANGE_MANAGER_STATUS.replace(":id", id),
    data: {
      status,
    },
  });

  return resp;
};

export const useChangeManagerStatusMutation = () => {
  return useMutation({
    mutationFn: changeStatus,
  });
};
