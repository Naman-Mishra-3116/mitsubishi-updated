import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getAdminFormData = async () => {
  const resp = await request({
    url: API_URL.ADMIN_PROFILE_FORM,
  });
  return resp;
};

export const useGetProfileFromData = () => {
  return useQuery({
    queryFn: getAdminFormData,
    queryKey: [QUERY_KEY.ADMIN_PROFILE_FORM],
    staleTime: 0,
  });
};
