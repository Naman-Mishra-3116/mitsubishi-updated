import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const addATC = async (data: FormData) => {
  const resp = await request({
    url: API_URL.CREATE_ATC,
    method: "POST",
    data,
  });

  return resp;
};

export const useAddATCMuation = () => {
  return useMutation({
    mutationFn: addATC,
  });
};
