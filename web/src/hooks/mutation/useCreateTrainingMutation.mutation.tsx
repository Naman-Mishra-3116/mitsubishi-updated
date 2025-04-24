import { API_URL } from "@/enums/apiUrls.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const uploadTrainingData = async (data: FormData) => {
  const resp = await request({
    url: API_URL.CREATE_TRAINING,
    method: "POST",
    data,
  });
  return resp;
};

export const useCreateTrainingMutation = () => {
  return useMutation({
    mutationFn: uploadTrainingData,
  });
};
