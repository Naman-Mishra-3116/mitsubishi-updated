import { API_URL } from "@/enums/apiUrls.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

interface ILoginData {
  email: string;
  password: string;
}

const loginManager = async (data: ILoginData) => {
  const resp = await request({
    url: API_URL.MANAGER_LOGIN,
    method: "POST",
    data,
  });

  return resp;
};

export const useATCLoginMutation = () => {
  return useMutation({
    mutationFn: loginManager,
  });
};
