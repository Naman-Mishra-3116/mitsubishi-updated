export type TServerResponse<T> = {
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429;
  status: "success" | "error";
  message?: string;
  title: string;
  data?: T;
  error?: string;
};
