import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getAllCenters = async (data: PaginationProps) => {
  const resp = await request({
    url: API_URL.GET_CENTER,
    method: "GET",
    params: {
      page: data.page,
      limit: data.limit,
    },
  });
  return resp;
};

export const useGetAllCenters = (data: PaginationProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CENTERS, data.page, data.limit],
    queryFn: () => getAllCenters(data),
  });
};
