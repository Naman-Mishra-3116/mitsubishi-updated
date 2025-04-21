import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

interface IAdminLoginData {
  email: string;
  password: string;
}

const loginMutation = async (data: IAdminLoginData) => {
  const response: TServerResponse = await request({
    url: API_URL.ADMIN_LOGIN,
    method: "POST",
    data,
  });

  return response;
};

export const useAdminLoginMutation = () => {
  return useMutation({
    mutationFn: loginMutation,
  });
};
