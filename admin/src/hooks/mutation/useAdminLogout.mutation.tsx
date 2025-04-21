import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const logoutFunction = async () => {
  const response = await request({
    url: API_URL.ADMIN_LOGOUT,
    method: "POST",
  });
  return response;
};

export const useAdminLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutFunction,
  });
};
