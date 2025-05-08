"use client";

import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
import React, { memo, useState } from "react";
import { useGetAllATCTraining } from "@/hooks/query/useGetAllATCTraining.query";
import { useParams } from "next/navigation";
import { PAGINATION_CONSTANT } from "@/constants/pagination";
import { AllATCTrainingColumns } from "@/columns/AllATCTraining.column";

const ViewAllATCSpecificTraining: React.FC = () => {
  const { id } = useParams();
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading } = useGetAllATCTraining({
    id: id as string,
    limit: PAGINATION_CONSTANT.PAGE_LIMIT,
    page: activePage,
  });

  return (
    !isLoading && (
      <MPaginatedTable
        columns={AllATCTrainingColumns}
        data={data?.data?.data ?? []}
        isLoading={isLoading}
        paginationProps={{
          page: activePage,
          totalDocuments: data?.data?.totalDocuments,
          setPage(e: number) {
            setActivePage(e);
          },
          pageLimit: PAGINATION_CONSTANT.PAGE_LIMIT,
        }}
      />
    )
  );
};

export default memo(ViewAllATCSpecificTraining);
