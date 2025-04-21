type TServerResponse = {
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429;
  status: "success" | "error";
  title: string;
  message: string;
  data?: any;
  error: string;
  pageData?: any;
};

type TOnSuccessHandle = (res: TServerResponse) => void;
type TOnErrorHandle = (res: any) => void;

type TGetRequestParams = {
  page: number;
  itemPerPage: number;
  search?: string;
  searchFieldNumber?: string[];
  searchFieldString?: string[];
  searchFieldBoolean?: { [key: string]: boolean }[];
};
