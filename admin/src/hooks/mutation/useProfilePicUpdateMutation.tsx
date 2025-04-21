import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";


const updatProfile = async (data: FormData) => {
  const response = await request({
    url: API_URL.ADMIN_PROFILE_PIC_UPDATE,
    method: "POST",
    data,
  });
  return response;
};

export const useProfilePicUpdateMutation = () => {
  return useMutation({
    mutationFn: updatProfile,
  });
};
