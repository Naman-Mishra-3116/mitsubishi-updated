import MLayout from "@/ui/MLayout/MLayout";
import { Box, Stepper, StepperStep } from "@mantine/core";
import React, { memo } from "react";
import classes from "../styles/index.module.scss";
import MTypography from "@/ui/MTypography/MTypography";
import "@mantine/core/styles/Stepper.css";
import { atcSteps } from ".";

const History: React.FC = () => {
  return (
    <MLayout>
      <Box className={classes.top}>
        <Box className={classes.aimBox}>
          <MTypography
            variant="subHeading"
            className={classes.aim}
            text="What We Strive For"
          />
        </Box>
        <Box className={classes.root}>
          <Box className={classes.left}>
            <Stepper
              active={0}
              orientation="vertical"
              color="red"
              classNames={{
                verticalSeparator: classes.vs,
                stepLabel: classes.stepLabel,
                stepDescription: classes.stepDesc,
              }}
            >
              {atcSteps.map((item) => {
                return (
                  <StepperStep
                    key={item.key}
                    label={item.label}
                    description={item.description}
                  />
                );
              })}
            </Stepper>
          </Box>
          <Box className={classes.right}>
            <MTypography
              variant="heading"
              text="Innovative Learning for Industry Excellence"
              className={classes.heading}
            />
            <MTypography
              className={classes.desc}
              variant="description"
              text="The Mitsubishi Electric Authorized Training Center (ATC) initiative is a forward-looking program aimed at bridging the gap between academic learning and industry demands. In collaboration with leading educational institutions across India, Mitsubishi Electric is empowering students, faculty, and professionals with hands-on experience in advanced factory automation technologies. From Programmable Logic Controllers (PLCs) and Human-Machine Interfaces (HMIs) to Variable Frequency Drives (VFDs), servo systems, and robotics, the ATC provides practical training aligned with real-world industrial applications. This initiative is designed to enhance technical skills and equip the next generation of engineers with the expertise needed to thrive in the evolving landscape of smart manufacturing."
            />
          </Box>
        </Box>
      </Box>
    </MLayout>
  );
};

export default memo(History);
