import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getDashboardData = async () => {
  const resp = await request({
    url: API_URL.GET_DASHBOARD_DATA,
    method: "GET",
  });

  return resp;
};

export const useGetDashboardData = () => {
  return useQuery({
    queryFn: getDashboardData,
    queryKey: [QUERY_KEY.GET_DASHBOARD_DATA],
  });
};
