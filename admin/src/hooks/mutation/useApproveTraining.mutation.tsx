import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

const approveTrainingById = async (id: string) => {
  const resp = await request({
    url: API_URL.APPROVE_TRAINING.replace(":id", id),
    method: "POST",
  });
  return resp;
};

export const useApproveTraining = () => {
  return useMutation({
    mutationFn: approveTrainingById,
  });
};
