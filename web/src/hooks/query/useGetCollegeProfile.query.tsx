import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getCollegeProfile = async () => {
  const resp = await request({
    url: API_URL.COLLEGE_PROFILE_DATA,
    method: "GET",
  });
  return resp;
};

export const useGetCollegeProfile = () => {
  return useQuery({
    queryFn: getCollegeProfile,
    queryKey: [QUERY_KEY.COLLEGE_PROFILE_DATA],
  });
};
