"use client";
import { AllStudents, Student } from "@/columns/AllStudents.column";
import { Box } from "@mantine/core";
import React, { memo, useState } from "react";
import classes from "../styles/student.module.scss";
import MTypography from "@/ui/MTypography/MTypography";
import MPaginatedTable from "@/ui/MPaginatedTable/MPaginatedTable";
interface IProps {
  data: Student[];
}

const StudentTable: React.FC<IProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  return (
    <Box className={classes.root}>
      <MTypography
        variant="descriptionMedium"
        className={classes.heading}
        text={"Students Enrolled"}
      />
      <MPaginatedTable
        columns={AllStudents}
        data={data.slice(6 * (page - 1), 6 * page)}
        isLoading={false}
        paginationProps={{
          page: page,
          totalDocuments: data.length,
          pageLimit: 6,
          setPage(e) {
            setPage(e);
          },
        }}
      />
    </Box>
  );
};

export default memo(StudentTable);
