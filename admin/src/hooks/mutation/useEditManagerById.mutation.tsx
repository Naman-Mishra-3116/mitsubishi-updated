import { API_URL } from "@/enums/apiUrl.enum";
import { request } from "@/services/axios.service";
import { useMutation } from "@tanstack/react-query";

type Data = {
  managerName: string;
  managerEmail: string;
  managerPassword: string;
  phoneNumber: string;
};
interface IEditMangerData {
  id: string;
  data: Data;
}
const editMutation = async (data: IEditMangerData) => {
  const resp = await request({
    url: API_URL.EDIT_MANAGER_BY_ID.replace(":id", data.id),
    method: "POST",
    data: data.data,
  });
  return resp;
};

export const useEditMangerByIdMutation = () => {
  return useMutation({
    mutationFn: editMutation,
  });
};
