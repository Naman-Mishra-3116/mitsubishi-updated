import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";

const getManagerLoginData = async () => {
  const resp = await request({
    url: API_URL.MANAGER_LOGIN_DATA,
    method: "GET",
  });

  return resp;
};

export const useGetManagerLoginData = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return useQuery({
    queryFn: getManagerLoginData,
    queryKey: [QUERY_KEY.GET_MANAGER_LOGIN_DATA],
    refetchInterval: isAuthenticated ? 30000 : false,
    refetchIntervalInBackground: true,
  });
};
