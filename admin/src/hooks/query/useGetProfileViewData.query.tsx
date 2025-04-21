import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getProfileView = async () => {
  const resp = await request({
    url: API_URL.ADMIN_PROFILE_VIEW,
    method: "GET",
  });
  return resp;
};

export const useGetProfileViewData = () => {
  return useQuery({
    queryFn: getProfileView,
    queryKey: [QUERY_KEY.ADMIN_PROFILE_VIEW],
    staleTime:0,
  });
};
