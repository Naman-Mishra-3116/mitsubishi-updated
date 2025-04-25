import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { dataTagErrorSymbol, useQuery } from "@tanstack/react-query";

const getAllTraining = async (data: PaginationProps) => {
  const resp = await request({
    url: API_URL.GET_ALL_TRAINING,
    method: "GET",
    params: data,
  });
  return resp;
};

export const useViewAllTraining = (data: PaginationProps) => {
  return useQuery({
    queryFn: () => getAllTraining(data),
    queryKey: [QUERY_KEY.GET_ALL_TRAINING, data.limit, data.page],
  });
};
