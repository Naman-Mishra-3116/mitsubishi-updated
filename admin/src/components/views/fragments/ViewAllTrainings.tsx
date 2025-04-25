"use client";
import { AllTrainingColumn } from "@/columns/AllTrainings.column";
import { useViewAllTraining } from "@/hooks/query/useViewAllTraining.query";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useState } from "react";

const ViewAllTrainings: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useViewAllTraining({
    limit: 10,
    page,
  });

  return (
    <MPaginatedTable
      columns={AllTrainingColumn}
      data={data?.data?.data ?? []}
      isLoading={isLoading}
      paginationProps={{
        page: page,
        totalDocuments: data?.data?.totalDocuments,
        setPage(e) {
          setPage(e);
        },
        pageLimit: 10,
      }}
    />
  );
};

export default memo(ViewAllTrainings);
