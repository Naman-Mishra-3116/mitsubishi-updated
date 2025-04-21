"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useProfilePicUpdateMutation } from "@/hooks/mutation/useProfilePicUpdateMutation";
import { useGetProfileViewData } from "@/hooks/query/useGetProfileViewData.query";
import MButton from "@/ui/MButton/MButton";
import MImage, { TImages } from "@/ui/MImage/MImage";
import MImageCropper from "@/ui/MImageCropper/fragments/MImageCropper";
import MTypography from "@/ui/MTypography/MTypography";
import { Box, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/profileView.module.scss";

const ProfileView: React.FC = () => {
  const { data } = useGetProfileViewData();
  const [profileImage, setProfileImage] = useState<File | undefined>();
  const { mutateAsync } = useProfilePicUpdateMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage as Blob);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  const handleUpdateProfilePic = async () => {
    if (!profileImage) {
      return;
    }
    const formData = new FormData();
    formData.append("profilePic", profileImage);
    const resp = await mutateAsync(formData);
    if (resp.status === "success") {
      notifications.show({
        color: "green",
        message: resp.title,
      });
      setProfileImage(undefined);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_PROFILE_VIEW],
      });
    } else {
      notifications.show({
        color: "red",
        message: resp.title,
        title: resp.message,
      });
    }
  };

  return (
    <div className={classes.container}>
      <Box className={classes.profileContainer}>
        <MImage
          url={data?.data?.profileImage || ("profileDemo" as TImages)}
          name={!data?.data?.profileImage ? "profileDemo" : undefined}
          alt="Profile Pic of admin"
          className={classes.image}
          width={200}
          height={200}
        />
      </Box>
      <Box className={classes.aboutMeSection}>
        <MTypography
          text={data?.data.role}
          variant="subHeading"
          className={classes.designation}
        />
        <MTypography
          text={data?.data.fullName}
          variant="subHeading"
          className={classes.name}
        />
        <MTypography
          variant="descriptionMedium"
          className={classes.about}
          text={data?.data.about}
        />
      </Box>
      <Center>
        {profileImage ? (
          <MButton
            type="button"
            text="Save"
            radius="md"
            variant="filled"
            className={classes.button}
            handleClick={handleUpdateProfilePic}
          />
        ) : (
          <MImageCropper saveImage={setProfileImage} cropShape="round" />
        )}
      </Center>
    </div>
  );
};

export default memo(ProfileView);
