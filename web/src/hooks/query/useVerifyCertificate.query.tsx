import { API_URL } from "@/enums/apiUrls.enum";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { request } from "@/services/axios.service";
import { useQuery } from "@tanstack/react-query";

const verifyRequest = async (id: string) => {
  const resp = await request({
    url: API_URL.VERIFY_CERTIFICATE.replace(":studentId", id),
    method: "GET",
  });
  return resp;
};

export const useVerifyCertificate = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.VERIFY_CERTIFICATE, id],
    queryFn: () => verifyRequest(id),
  });
};
