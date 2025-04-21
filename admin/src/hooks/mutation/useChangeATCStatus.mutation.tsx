import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

type IdAndStatus = {
  id: string;
  status: boolean;
};

const mutateStatus = async (data: IdAndStatus) => {
  const resp = await request({
    url: API_URL.CHANGE_ATC_STATUS.replace(":id", data.id),
    data: {
      status: data.status,
    },
    method: "POST",
  });

  return resp;
};

export const useUpdateATCSTatusMutation = () => {
  return useMutation({
    mutationFn: mutateStatus,
  });
};
