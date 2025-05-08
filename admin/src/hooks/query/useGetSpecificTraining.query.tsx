import { API_URL } from "@/enums/apiUrl.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const getTrainingSpecificData = async (id: string) => {
  const resp = await request({
    url: API_URL.GET_SPECIFIC_TRAINING.replace(":trainingId", id),
    method: "GET",
  });
  return resp;
};

export const useGetSpecificTraining = (id: string) => {
  return useQuery({
    queryFn: () => getTrainingSpecificData(id),
    queryKey: [QUERY_KEY.SPECIFIC_TRAINING, id],
  });
};
