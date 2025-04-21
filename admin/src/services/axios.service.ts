import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const request = async (config: Axios.AxiosXHRConfig<unknown>) => {
  const onSuccess = (response: Axios.AxiosXHR<unknown>) => {
    return response.data;
  };

  const onError = (error: any) => {
    if (
      error.response?.data &&
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.replace("/login");
    }

    return error.response.data;
  };

  try {
    const response = await axiosClient(config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
