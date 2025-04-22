import { API_URL } from "@/enums/apiUrls.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const updateCollegeProfile = async (data: FormData) => {
  const resp = await request({
    url: API_URL.COMPLETE_COLLEGE_PROFILE,
    method: "POST",
    data,
  });
  return resp;
};

export const useCompleteProfileMuatation = () => {
  return useMutation({
    mutationFn: updateCollegeProfile,
  });
};
