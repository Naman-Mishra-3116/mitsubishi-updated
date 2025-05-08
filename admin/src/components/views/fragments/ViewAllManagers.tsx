"use client";
import { AllManagers } from "@/columns/AllManagers.column";
import ChangeManagerStatus from "@/components/actions/ChangeManagerStatus";
import { PAGINATION_CONSTANT } from "@/constants/pagination";
import { PERMISSION } from "@/enums/permission.enum";
import { useGetAllManagers } from "@/hooks/query/useGetAllManagers.query";
import { useAppSelector } from "@/store/hooks";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useMemo, useState } from "react";

const ViewAllManagers: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllManagers({
    page,
    limit: PAGINATION_CONSTANT.PAGE_LIMIT,
  });
  const permission = useAppSelector((state) => state.auth.user.permission);
  const columns = useMemo(() => {
    const cols = [...AllManagers];
    if (permission === PERMISSION.WRITE) {
      cols.push({
        key: "active",
        label: "Status",
        renderCell: (value) => {
          return (
            <ChangeManagerStatus
              id={value._id}
              currentStatus={value.active ? "active" : "inactive"}
            />
          );
        },
      });
    }
    return cols;
  }, [permission]);

  return (
    <MPaginatedTable
      columns={columns}
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
