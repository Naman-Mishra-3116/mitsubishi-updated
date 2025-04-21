import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/enums/apiUrl.enum";

interface IPartialProfileForm {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  about?: string;
  address?: string;
}

const completeProfile = async (data: IPartialProfileForm) => {
  const resp = await request({
    url: API_URL.COMPLETE_PROFILE,
    method: "POST",
    data,
  });

  return resp;
};

export const useCompleteProfileForm = () => {
  return useMutation({
    mutationFn: completeProfile,
  });
};
