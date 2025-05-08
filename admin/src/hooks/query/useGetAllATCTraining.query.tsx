import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

type PaginationWithID = {
  limit: number;
  page: number;
  id: string;
};

const getATCSpecificTraining = async (data: PaginationWithID) => {
  const resp = await request({
    url: API_URL.GET_ATC_SPECIFIC_TRAINING.replace(":id", data.id),
    method: "GET",
    params: {
      limit: data.limit,
      page: data.page,
    },
  });
  return resp;
};

export const useGetAllATCTraining = (data: PaginationWithID) => {
  return useQuery({
    queryFn: () => getATCSpecificTraining(data),
    queryKey: [
      QUERY_KEY.GET_ATC_SPECIFIC_TRAINING,
      data.id,
      data.limit,
      data.page,
    ],
  });
};
