import React, { memo } from "react";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Modal } from "@mantine/core";
import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import classes from "../styles/carousel.module.scss";

interface IProps {
  opened: boolean;
  images: string[];
  onClose: () => void;
}

const ViewAllTrainingImages: React.FC<IProps> = ({
  opened,
  onClose,
  images,
}) => {
  return (
    <Modal
      radius={"md"}
      opened={opened}
      onClose={onClose}
      title={
        <MTypography
          variant="descriptionMedium"
          text={"Training Images"}
          fontWeight={600}
          color="black"
          fontSize="20px"
        />
      }
      size="525px"
      centered
    >
      <Carousel withIndicators height="auto">
        {images.map((item, index) => (
          <CarouselSlide key={index} className={classes.slide} mb={"md"}>
            <Box className={classes.box}>
              <MImage
                alt={`Training image ${index + 1}`}
                url={item}
                height={280}
                width={450}
                className={classes.image}
              />
            </Box>
          </CarouselSlide>
        ))}
      </Carousel>
    </Modal>
  );
};

export default memo(ViewAllTrainingImages);
