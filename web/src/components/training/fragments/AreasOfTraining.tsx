import MLayout from "@/ui/MLayout/MLayout";
import MTypography from "@/ui/MTypography/MTypography";
import React, { memo } from "react";
import classes from "../styles/index.module.scss";
import { Box } from "@mantine/core";
import MImage, { TImages } from "@/ui/MImage/MImage";
import { trainingData } from ".";

const AreasOfTraining: React.FC = () => {
  return (
    <MLayout>
      <Box className={classes.top}>
        <Box className={classes.aimBox}>
          <MTypography
            variant="subHeading"
            className={classes.aim}
            text="Areas of Training"
          />
        </Box>
        <Box className={classes.grid}>
          {trainingData.map((item) => {
            return (
              <Box className={classes.card} key={item.key}>
                <MImage
                  alt="card"
                  name={item.imageName as TImages}
                  className={classes.img}
                />
                <MTypography
                  variant="subHeading"
                  text={item.title}
                  className={classes.head}
                />
                <MTypography
                  className={classes.desc}
                  variant="description"
                  text={item.desc}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </MLayout>
  );
};

export default memo(AreasOfTraining);
