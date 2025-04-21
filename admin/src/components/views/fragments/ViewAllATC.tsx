"use client";
import { ATCColumns } from "@/columns/AllATC.column";
import { PAGINATION_CONSTANT } from "@/constants/pagination";
import { useGetAllATC } from "@/hooks/query/useGetAllATC.query";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useState } from "react";

const ViewAllATC: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllATC({
    page: page,
    limit: PAGINATION_CONSTANT.PAGE_LIMIT,
  });


  return (
    !isLoading && (
      <MPaginatedTable
        columns={ATCColumns}
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
    )
  );
};

export default memo(ViewAllATC);
