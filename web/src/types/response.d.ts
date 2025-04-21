type TGetRequestParams = {
  page: number;
  itemPerPage: number;
  search?: string;
  searchFieldNumber?: string[];
  searchFieldString?: string[];
  searchFieldBoolean?: { [key: string]: boolean }[];
};

