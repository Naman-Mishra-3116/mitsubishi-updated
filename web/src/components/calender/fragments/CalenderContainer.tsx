"use clinet";
import { Box } from "@mantine/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import React, { memo } from "react";
import classes from "../styles/index.module.scss";

const CalenderContainer: React.FC = () => {
  const plugin = defaultLayoutPlugin();
  return (
    <Box className={classes.box}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={"./training-calendar.pdf"}
          plugins={[plugin]}
          defaultScale={1.5}
        />
      </Worker>
    </Box>
  );
};

export default memo(CalenderContainer);
