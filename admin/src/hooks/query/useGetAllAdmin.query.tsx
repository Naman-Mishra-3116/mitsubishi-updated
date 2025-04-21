import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";



const getAllAdmins = async (data: PaginationProps) => {
  const resp = await request({
    url: API_URL.GET_ALL_ADMINS,
    method: "GET",
    params: {
      page: data.page,
      limit: data.limit,
    },
  });

  return resp;
};

export const useGetAllAdminHook = (data: PaginationProps) => {
  return useQuery({
    queryFn: () => getAllAdmins(data),
    queryKey: [QUERY_KEY.ALL_ADMIN, data.page, data.limit],
  });
};
