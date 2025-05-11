import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getDashboard = async () => {
  const resp = await request({
    url: API_URL.GET_DASHBOARD,
    method: "GET",
  });

  return resp;
};

export const useGetATCDashboard = () => {
  return useQuery({
    queryFn: getDashboard,
    queryKey: [QUERY_KEY.GET_DASHBOARD],
  });
};
