import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

type IdAndStatus = {
  id: string;
  status: boolean;
};

const changeStatus = async (data: IdAndStatus) => {
  const resp = await request({
    url: API_URL.CHANGE_ADMIN_STATUS.replace(":id", data.id),
    method: "POST",
    data: {
      status: data.status,
    },
  });

  return resp;
};

export const useChangeAdminStatusMutation = () =>
  useMutation({ mutationFn: changeStatus });
