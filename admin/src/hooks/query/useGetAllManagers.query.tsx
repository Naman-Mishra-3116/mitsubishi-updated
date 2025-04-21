import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getAllManagers = async (data: PaginationProps) => {
  const resp = await request({
    url: API_URL.GET_ALL_MANAGER,
    method: "GET",
    params: {
      page: data.page,
      limit: data.limit,
    },
  });

  return resp;
};

export const useGetAllManagers = (data: PaginationProps) => {
  return useQuery({
    queryFn: () => getAllManagers(data),
    queryKey: [QUERY_KEY.ALL_MANAGERS, data.page, data.limit],
  });
};
