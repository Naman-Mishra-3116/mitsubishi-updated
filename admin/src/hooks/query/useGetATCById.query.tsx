import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getData = async (id: string) => {
  const resp = await request({
    url: API_URL.GET_ATC_BY_ID.replace(":id", id),
    method: "GET",
  });

  return resp;
};

export const useGetATCById = (id: string) => {
  return useQuery({
    queryFn: () => getData(id),
    queryKey: [QUERY_KEY.GET_ATC_ID, id],
    enabled: !!id,
  });
};
