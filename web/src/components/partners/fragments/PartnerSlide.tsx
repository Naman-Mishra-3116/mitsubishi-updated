import MImage from "@/ui/MImage/MImage";
import MTypography from "@/ui/MTypography/MTypography";
import { Box } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import classes from "../styles/slide.module.scss";
interface IProps {
  name: string;
  description: string;
  designation?: string;
  image: string;
}
const PartnerSlide = ({  }: IProps) => {
  return (
    <Box className={classes.root}>
      <MImage name="svvv" alt="college logo" className={classes.img} />
      <MTypography
        text="Shri Vaishnav Vidyapeeth Vishwavidyalaya"
        variant="subHeading"
        className={classes.collegeName}
      />
      <Box className={classes.flex}>
        <IconMapPin className={classes.icon} />
        <MTypography variant="normal" text="Indore ( Madhya Pradesh )" className={classes.city}/>
      </Box>
    </Box>
  );
};

export default PartnerSlide;
