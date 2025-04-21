import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const fetchManagerDetails = async (atcID: string) => {
  const resp = await request({
    method: "GET",
    url: API_URL.GET_MANAGER_BY_ATC_ID,
    params: {
      atcID,
    },
  });
  return resp;
};

export const useGetManagerByAtcID = (atcId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_MANAGER_BY_ATC_ID, atcId],
    queryFn: () => fetchManagerDetails(atcId),
  });
};
