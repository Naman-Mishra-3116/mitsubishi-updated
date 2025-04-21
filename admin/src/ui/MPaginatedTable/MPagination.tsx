import React, { memo } from "react";
import { Box, Pagination } from "@mantine/core";
import classes from "./index.module.scss";

import { TPaging } from "@/types/table";
import { PAGINATION_CONSTANT } from "@/constants/pagination";

const CustomPagination: React.FC<TPaging> = (props: TPaging) => {
  const { page, setPage, totalDocuments, pageLimit } = props;
  const limit =
    pageLimit && pageLimit !== 0 ? pageLimit : PAGINATION_CONSTANT.PAGE_LIMIT;
  if (totalDocuments && totalDocuments <= limit) {
    return null;
  }
  return (
    <Box className={classes.bottom}>
      <Pagination
        value={page}
        siblings={0}
        boundaries={2}
        onChange={setPage}
        size={"sm"}
        total={Math.ceil(totalDocuments / limit)}
        radius="sm"
        mt={20}
        c={"gray"}
        classNames={{ control: classes.control, root: classes.pagination }}
      />
    </Box>
  );
};

export default memo(CustomPagination);
