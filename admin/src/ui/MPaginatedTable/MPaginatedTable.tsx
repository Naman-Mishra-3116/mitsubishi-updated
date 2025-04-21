/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ScrollArea,
  Table,
  Loader,
  Center,
  TableThead,
  TableTr,
  TableTd,
  TableTbody,
  TableTh,
  Box,
} from "@mantine/core";
import React, { memo } from "react";
import { ITableProps } from "@/types/table";
import MPagination from "./MPagination";
import classes from "./index.module.scss";
import MTypography from "../MTypography/MTypography";
import { PAGINATION_CONSTANT } from "@/constants/pagination";

const MPaginatedTable: React.FC<ITableProps<any>> = (props) => {
  const { columns, data, paginationProps, isLoading } = props;

  return (
    <Box>
      <ScrollArea
        classNames={{
          root: classes.root,
          scrollbar: classes.scrollbar,
          thumb: classes.thumb,
        }}
        scrollbarSize={10}
        type="hover"
      >
        {isLoading ? (
          <Center mih={"20rem"}>
            <Loader size="md" />
          </Center>
        ) : (
          <Table
            classNames={{ th: classes.thead, tr: classes.trowRoot }}
            cellSpacing={50}
          >
            <TableThead>
              <TableTr>
                {columns.map((e) => (
                  <TableTh ta={"left"} key={e.key} miw={e.minWidth}>
                    <MTypography
                      variant="normal"
                      fontSize={"16px"}
                      fontWeight={600}
                      text={e.label}
                    />
                  </TableTh>
                ))}
              </TableTr>
            </TableThead>
            {data.length === 0 ? (
              <TableTbody>
                <TableTr>
                  <TableTd
                    colSpan={columns?.length}
                    style={{ textAlign: "center", fontWeight: 500 }}
                  >
                    <MTypography
                      variant="normal"
                      fontSize={"16px"}
                      fontWeight={600}
                      text={"No Data Found"}
                    />
                  </TableTd>
                </TableTr>
              </TableTbody>
            ) : (
              <TableTbody>
                {data.map((e: any, i) => (
                  <TableTr key={`${e._id ?? e.sNo}-i${i}`} px={"lg"}>
                    {columns.map((val, index) => (
                      <TableTd ta={"left"} key={`${val.key}-i${index}`}>
                        {val.key === "sno" && (
                          <MTypography
                            variant="normal"
                            fontSize={"px"}
                            fontWeight={400}
                            text={`${
                              i + 1 + ((paginationProps?.page ?? 0) - 1) * 10
                            }`}
                          />
                        )}
                        {val.renderCell ? (
                          val.renderCell(e)
                        ) : (
                          <MTypography
                            variant="normal"
                            fontSize={"px"}
                            fontWeight={400}
                            text={e?.[val.key] ?? ""}
                          />
                        )}
                      </TableTd>
                    ))}
                  </TableTr>
                ))}
              </TableTbody>
            )}
          </Table>
        )}
      </ScrollArea>
      {paginationProps?.page &&
        paginationProps?.totalDocuments > PAGINATION_CONSTANT.PAGE_LIMIT && (
          <MPagination {...paginationProps} />
        )}
    </Box>
  );
};

export default memo(MPaginatedTable);
