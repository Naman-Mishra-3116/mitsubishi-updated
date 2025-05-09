import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getYearlyInfo = async () => {
  const resp = await request({
    url: API_URL.GET_YEARLY_INFO,
    method: "GET",
  });

  return resp;
};

export const useGetYearlyInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_YEARLY_INFO],
    queryFn: getYearlyInfo,
  });
};
