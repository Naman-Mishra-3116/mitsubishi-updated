import { Box, Pagination } from "@mantine/core";
import React, { memo } from "react";
import classes from "./index.module.scss";
import { CONSTANT } from "@/enums/constants.enum";
import { TPaging } from "@/types/table";

const CustomPagination: React.FC<TPaging> = (props: TPaging) => {
  const { page, setPage, totalDocuments, pageLimit } = props;
  const limit = pageLimit && pageLimit !== 0 ? pageLimit : CONSTANT.PAGE_LIMIT;
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
