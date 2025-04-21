import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getCoordinates = async () => {
  const resp = await request({
    url: API_URL.MAP_DATA,
    method: "GET",
  });
  return resp;
};

export const useGetMapCoordinates = () => {
  return useQuery({
    queryFn: getCoordinates,
    queryKey: [QUERY_KEY.MAP_DATA],
    staleTime: 100000,
  });
};
