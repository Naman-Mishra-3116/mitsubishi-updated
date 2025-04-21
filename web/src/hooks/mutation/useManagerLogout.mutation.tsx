import { API_URL } from "@/enums/apiUrls.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const logoutFunction = async () => {
  const response = await request({
    url: API_URL.MANAGER_LOGOUT,
    method: "POST",
  });
  return response;
};

export const useManagerLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutFunction,
  });
};
