"use client";
import { AllManagers } from "@/columns/AllManagers.column";
import { PAGINATION_CONSTANT } from "@/constants/pagination";
import { useGetAllManagers } from "@/hooks/query/useGetAllManagers.query";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useState } from "react";

interface IProps {}

const ViewAllManagers: React.FC<IProps> = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllManagers({
    page,
    limit: PAGINATION_CONSTANT.PAGE_LIMIT,
  });

  return (
    <MPaginatedTable
      columns={AllManagers}
      data={data?.data?.data ?? []}
      isLoading={isLoading}
      paginationProps={{
        page: page,
        totalDocuments: data?.data?.totalDocuments,
        setPage(e) {
          setPage(e);
        },
        pageLimit: PAGINATION_CONSTANT.PAGE_LIMIT,
      }}
    />
  );
};

export default memo(ViewAllManagers);
