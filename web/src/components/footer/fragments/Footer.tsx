import { Box, Container, Grid, GridCol } from "@mantine/core";
import { memo } from "react";
import classes from "../style/index.module.scss";
import ConnectWithUs from "./ConnectWithUs";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Box>
      <Container fluid className={classes.container}>
        <Grid className={classes.gridContainer}>
          <GridCol span={{ lg: 4, md: 4, sm: 6 }}>
            <Logo />
          </GridCol>
          <GridCol span={{ lg: 4, md: 4, sm: 6 }}>
            <ConnectWithUs />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(Footer);
