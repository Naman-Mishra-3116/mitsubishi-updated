import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const muutationFn = async (data: FormData) => {
  const resp = await request({
    url: API_URL.ADD_YEARLY_INFO,
    method: "POST",
    data,
  });

  return resp;
};

export const useAddYearlyInfo = () => {
  return useMutation({
    mutationFn: muutationFn,
  });
};
