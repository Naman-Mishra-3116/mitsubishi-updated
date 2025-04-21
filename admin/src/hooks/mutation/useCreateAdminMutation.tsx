import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const createAdminMutationFn = async (data: FormData) => {
  const resp = await request({
    url: API_URL.CREATE_ADMIN,
    method: "POST",
    data,
  });

  return resp;
};

export const useCreateAdminMutation = () => {
  return useMutation({
    mutationFn: createAdminMutationFn,
  });
};
