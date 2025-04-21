import React, { memo } from "react";
import classes from "../styles/profileContainer.module.scss";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";

interface IProps {}

const ProfileContainer: React.FC<IProps> = () => {
  return (
    <div className={classes.root}>
      <ProfileForm />
      <ProfileView />
    </div>
  );
};

export default memo(ProfileContainer);
