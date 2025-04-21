"use client";
import { AdminColumn } from "@/columns/AllAdmins.column";
import { PAGINATION_CONSTANT } from "@/constants/pagination";
import { useGetAllAdminHook } from "@/hooks/query/useGetAllAdmin.query";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useState } from "react";

const ViewAllAdmins: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading } = useGetAllAdminHook({
    limit: PAGINATION_CONSTANT.PAGE_LIMIT,
    page: activePage,
  });

  return (
    !isLoading && (
      <MPaginatedTable
        columns={AdminColumn}
        data={data?.data?.data ?? []}
        isLoading={isLoading}
        paginationProps={{
          page: activePage,
          totalDocuments: data?.data?.totalDocuments,
          setPage(e) {
            setActivePage(e);
          },
          pageLimit: PAGINATION_CONSTANT.PAGE_LIMIT,
        }}
      />
    )
  );
};

export default memo(ViewAllAdmins);
