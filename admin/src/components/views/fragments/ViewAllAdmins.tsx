"use client";
import { AdminColumn } from "@/columns/AllAdmins.column";
import ChangeAdminStatus from "@/components/actions/ChangeAdminStatus";
import { PAGINATION_CONSTANT } from "@/constants/pagination";
import { PERMISSION } from "@/enums/permission.enum";
import { useGetAllAdminHook } from "@/hooks/query/useGetAllAdmin.query";
import { useAppSelector } from "@/store/hooks";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useEffect, useMemo, useState } from "react";

const ViewAllAdmins: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const permission = useAppSelector((state) => state.auth.user.permission);
  const { data, isLoading } = useGetAllAdminHook({
    limit: PAGINATION_CONSTANT.PAGE_LIMIT,
    page: activePage,
  });

  const columns = useMemo(() => {
    const cols = [...AdminColumn];
    if (permission === PERMISSION.WRITE) {
      cols.push({
        key: "isBlocked",
        label: "Status",
        renderCell: (data) => (
          <ChangeAdminStatus
            currentStatus={data.isBlocked ? "inactive" : "active"}
            id={data._id}
          />
        ),
        minWidth: 100,
      });
    }
    return cols;
  }, [permission]);

  return (
    !isLoading && (
      <MPaginatedTable
        columns={columns}
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
