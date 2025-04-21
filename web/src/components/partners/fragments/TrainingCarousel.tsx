"use client";
import React, { memo, useEffect, useRef } from "react";
import classes from "../styles/trainingCarousel.module.scss";
import PartnerSlide from "./PartnerSlide";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import { Carousel, Embla } from "@mantine/carousel";

interface DataArray {
  name: string;
  designation: string;
  description: string;
  image: string;
}
interface IProps {
  movingDirection: "left" | "right";
  align: "end" | "center" | "start";
  scrollTime: number;
  data: DataArray[];
}

const TrainingCarousel: React.FC<IProps> = ({
  movingDirection,
  align,
  scrollTime,
  data,
}) => {
  const ref = useRef<Embla | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        if (movingDirection === "left") {
          ref.current.scrollPrev();
        } else {
          ref.current.scrollNext();
        }
      }
    }, scrollTime);

    return () => {
      clearInterval(interval);
    };
  }, [movingDirection, scrollTime]);

  return (
    <Carousel
      getEmblaApi={(embla) => (ref.current = embla)}
      className={classes.carousel}
      withControls={false}
      slideSize={{ base: "200px", sm: "450px" }}
      loop={true}
      align={align}
    >
      {data.map((e, index) => (
        <Carousel.Slide
          key={`${e.description}-${index}`}
          className={classes.slide}
        >
          <PartnerSlide
            image={e.image}
            name={e.name}
            description={e.description}
            designation={e.designation}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default memo(TrainingCarousel);
