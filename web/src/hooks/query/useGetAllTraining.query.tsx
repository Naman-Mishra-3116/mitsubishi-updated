import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (data: PaginationProps) => {
  const resp = await request({
    url: API_URL.GET_ALL_TRAINING,
    method: "GET",
    params: {
      limit: data.limit,
      page: data.page,
    },
  });

  return resp;
};

export const useGetATCTrainings = (data: PaginationProps) => {
  return useQuery({
    queryFn: () => fetchData(data),
    queryKey: [QUERY_KEY.TRAINING_DATA, data.limit, data.page],
  });
};
