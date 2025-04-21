"use client";
import { useCreateAdminMutation } from "@/hooks/mutation/useCreateAdminMutation";
import {
  createAdminInital,
  createAdminValidator,
} from "@/validation/createAdmin.validator";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/createAdminContainer.module.scss";
import CreateAdminForm from "./CreateAdminForm";
import CreateConfirm from "./CreateConfirm";

interface IProps {}

const CreateAdminContainer: React.FC<IProps> = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const form = useForm({
    initialValues: createAdminInital,
    validate: yupResolver(createAdminValidator),
  });

  const { mutateAsync } = useCreateAdminMutation();

  const handleClick = () => {
    const validationResult = form.validate();
    if (validationResult.hasErrors) {
      return;
    }
    setShowPreview(true);
  };

  const handleSubmit = async (value: typeof form.values) => {
    const {
      fullName,
      email,
      password,
      adminType,
      permission,
      phoneNumber,
      city,
      state,
      address,
      about,
    } = value;
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adminType", adminType);
    formData.append("permission", permission);
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("about", about);
    if (file) {
      formData.append("profileImage", file);
    }

    const resp = await mutateAsync(formData);
    if (resp.status === "success") {
      notifications.show({
        message: resp.title,
        color: "green",
      });
      form.setValues(createAdminInital);
      setShowPreview(false);
      setFile(undefined);
      setProfilePreview("");
    } else {
      notifications.show({
        message: resp.title,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (file) {
      setProfilePreview(URL.createObjectURL(file as Blob));
    }
  }, [file]);

  return (
    <div className={`${showPreview ? classes.root : classes.singleRoot}`}>
      <CreateAdminForm
        form={form}
        showPreview={showPreview}
        handleSubmit={handleClick}
        handleSaveFile={(file) => {
          setFile(file);
        }}
      />
      {showPreview && (
        <CreateConfirm
          onClickCancel={() => setShowPreview(false)}
          form={form}
          handleSubmit={handleSubmit}
          profilePreview={profilePreview}
        />
      )}
    </div>
  );
};

export default memo(CreateAdminContainer);
