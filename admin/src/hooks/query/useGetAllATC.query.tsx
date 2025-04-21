import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getAllATC = async (data: PaginationProps) => {
  const resp = await request({
    method: "GET",
    url: API_URL.GET_ALL_ATC,
    params: {
      ...data,
    },
  });
  return resp;
};

export const useGetAllATC = (data: PaginationProps) => {
  return useQuery({
    queryFn: () => getAllATC(data),
    queryKey: [QUERY_KEY.ALL_ATC, data.page, data.limit],
  });
};
