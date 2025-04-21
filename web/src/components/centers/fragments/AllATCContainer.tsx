"use client";
import { CONSTANT } from "@/enums/constants.enum";
import { useGetAllCenters } from "@/hooks/query/useGetAllCenters.query";
import MLayout from "@/ui/MLayout/MLayout";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import React, { memo, useState } from "react";
import classes from "../styles/index.module.scss";
import Card from "./Card";
import MPagination from "@/ui/MPaginatedTable/MPagination";

type AtcItem = {
  address: string;
  atcImage: string;
  atcName: string;
  city: string;
  collegeName: string;
  description: string;
  managerName: string;
  managerEmail: string;
  state: string;
  totalTraining: string;
};

const AllATCContainer: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data } = useGetAllCenters({
    page,
    limit: CONSTANT.PAGE_LIMIT,
  });

  return (
    <MLayout>
      <Box>
        <Box className={classes.root}>
          <MTypography
            variant="subHeading"
            text="Authorized Training Centers"
            className={classes.text}
          />
        </Box>
        <Box className={classes.cardContainer}>
          {data?.data?.data?.map((item: AtcItem, index: number) => {
            return (
              <Card
                key={index}
                imageURL={item.atcImage}
                address={item.address}
                atcName={item.atcName}
                city={item.city}
                state={item.state}
                collegeName={item.collegeName}
                managerEmail={item.managerEmail}
                managerName={item.managerName}
                totalStudents="200"
                totalTrainings={item.totalTraining}
              />
            );
          })}
          <Box className={classes.pagination}>
            <MPagination
              page={page}
              setPage={setPage}
              totalDocuments={data?.data?.totalDocuments}
            />
          </Box>
        </Box>
      </Box>
    </MLayout>
  );
};

export default memo(AllATCContainer);
