import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getCalendar = async () => {
  const resp = await request({
    url: API_URL.GET_YEARLY_CALENDAR,
    method: "GET",
  });

  return resp;
};

export const useGetYearCalendar = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_YEAR_CALENDAR],
    queryFn: getCalendar,
  });
};
