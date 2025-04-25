export interface ITableProps<T> {
  data: T[];
  columns: TTableColumns<T>[];
  isLoading: boolean;
  paginationProps?: TPaging;
}

export interface TPaging {
  page: number;
  setPage: (e: number) => void;
  totalDocuments: number;
  pageLimit: number;
}
export interface TLimit {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

export interface TTableColumns<T> {
  label: string;
  key: string;
  renderCell?: (value: T, index?: number) => React.ReactNode;
  minWidth?: number | string;
}
