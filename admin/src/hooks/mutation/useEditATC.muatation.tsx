import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

type EditATCProps = {
  id: string;
  data: FormData;
};

const editATCMutation = async ({ id, data }: EditATCProps) => {
  const resp = await request({
    url: API_URL.EDIT_ATC_BY_ID.replace(":id", id),
    method: "POST",
    data,
  });
  return resp;
};

export const useEditATC = () => {
  return useMutation({
    mutationFn: editATCMutation,
  });
};
