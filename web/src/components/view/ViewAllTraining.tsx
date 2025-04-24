"use client";
import { AllTrainingColumns } from "@/columns/AllTrainingColumn.column";
import { CONSTANT } from "@/enums/constants.enum";
import { useGetATCTrainings } from "@/hooks/query/useGetAllTraining.query";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useState } from "react";

const ViewAllTraining: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading } = useGetATCTrainings({
    limit: CONSTANT.TRAINING_PAGE_LIMIT,
    page: activePage,
  });

  return (
    !isLoading && (
      <MPaginatedTable
        columns={AllTrainingColumns}
        data={data?.data?.data ?? []}
        isLoading={isLoading}
        paginationProps={{
          page: activePage,
          totalDocuments: data?.data?.totalDocuments,
          setPage(e: number) {
            setActivePage(e);
          },
          pageLimit: CONSTANT.TRAINING_PAGE_LIMIT,
        }}
      />
    )
  );
};

export default memo(ViewAllTraining);
