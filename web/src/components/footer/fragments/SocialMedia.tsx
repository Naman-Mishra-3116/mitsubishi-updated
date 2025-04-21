import React, { memo } from "react";
import classes from "../style/socialmedia.module.scss";
import { Box } from "@mantine/core";
import MImage from "@/ui/MImage/MImage";
import Link from "next/link";
const SocialMedia = () => {
  return (
    <Box className={classes.root}>
      <Link
        href={"https://www.facebook.com/MitsubishiElectric/"}
        target="_blank"
      >
        <MImage
          name="facebook"
          alt="icon_facebook"
          height={46}
          width={40}
          className={classes.img}
        />
      </Link>
      <Link
        href={"https://www.instagram.com/mitsubishielectric/"}
        target="_blank"
      >
        <MImage
          name="instagram"
          alt="icon_instagram"
          height={46}
          width={40}
          className={classes.img}
        />
      </Link>
      <Link
        href={"https://www.linkedin.com/company/mitsubishielectric/"}
        target="_blank"
      >
        <MImage
          name="linkedin"
          alt="icon_linkedin"
          height={46}
          width={40}
          className={classes.img}
        />
      </Link>
    </Box>
  );
};

export default memo(SocialMedia);
