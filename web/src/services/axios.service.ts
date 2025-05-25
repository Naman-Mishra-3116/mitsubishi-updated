import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const request = async (config: Axios.AxiosXHRConfig<unknown>) => {
  const onSuccess = (response: Axios.AxiosXHR<unknown>) => {
    return response.data;
  };

  // eslint-disable-next-line
  const onError = (error: any) => {
    return error.response.data;
  };

  try {
    const response = await axiosClient(config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
