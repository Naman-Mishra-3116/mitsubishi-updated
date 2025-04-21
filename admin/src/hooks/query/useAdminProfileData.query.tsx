import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getAdminProfileData = async () => {
  const response: TServerResponse = await request({
    url: API_URL.ADMIN_PROFILE_DATA,
    method: "GET",
  });
  return response;
};

export const useGetAdminProfileData = () => {
  return useQuery({
    queryFn: getAdminProfileData,
    queryKey: [QUERY_KEY.ADMIN_PROFILE_DATA],
    staleTime: 5000,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};
