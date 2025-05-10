"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useCompleteProfileMutation } from "@/hooks/mutation/useCompleteCollegeProfile.mutation";
import { useGetCollegeProfile } from "@/hooks/query/useGetCollegeProfile.query";
import MButton from "@/ui/MButton/MButton";
import MImageInput from "@/ui/MInput/MImageInput";
import MInput from "@/ui/MInput/MInput";
import MLoader from "@/ui/MLoader/MLoader";
import MTypography from "@/ui/MTypography/MTypography";
import {
  collegeInitials,
  collegeProfileSchema,
  TCollegeInitials,
} from "@/validation/college.validator";
import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo, useCallback, useEffect, useState } from "react";
import classes from "../styles/index.module.scss";

const CollegeContainer: React.FC = () => {
  const { mutateAsync } = useCompleteProfileMutation();
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [managerSigPre, setManagerSigPre] = useState<string>("");
  const [hodSigPre, setHodSigPre] = useState<string>("");
  const { data, isLoading } = useGetCollegeProfile();
  const [mode, setMode] = useState<"edit" | "update">("edit");
  const [file1, setFile1] = useState<File | undefined>(undefined);
  const [file2, setFile2] = useState<File | undefined>(undefined);
  const [file3, setFile3] = useState<File | undefined>(undefined);
  const form = useForm<TCollegeInitials>({
    initialValues: collegeInitials,
    validate: yupResolver(collegeProfileSchema),
  });
  const queryClient = useQueryClient();

  const handleLogoSave = useCallback((f: File) => {
    form.setFieldValue("collegeLogo", f);
    setFile1(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManagerSignature = useCallback((f: File) => {
    form.setFieldValue("managerSignature", f);
    setFile2(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHODSignature = useCallback((f: File) => {
    form.setFieldValue("hodSignature", f);
    setFile3(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    const formData = new FormData();
    formData.append("collegeName", values.collegeName);
    formData.append("nameOfHOD", values.nameOfHOD);
    if (file1) {
      formData.append("collegeLogo", file1);
    }

    if (file2) {
      formData.append("managerSignature", file2);
    }

    if (file3) {
      formData.append("hodSignature", file3);
    }

    const resp = await mutateAsync(formData);
    if (resp.status === "success") {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CENTERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COLLEGE_PROFILE_DATA],
      });
      setMode("edit");
    }

    notifications.show({
      message: resp.message,
      color: resp.status === "success" ? "green" : "red",
    });
  };

  useEffect(() => {
    if (data && data?.data && !isLoading) {
      const {
        collegeCity,
        collegeLogo,
        collegeName,
        nameOfHOD,
        latitude,
        longitude,
        hodSignature,
        managerSignature,
      } = data?.data;

      if (collegeLogo && collegeLogo !== logoPreview) {
        setLogoPreview(collegeLogo);
      }

      if (hodSignature && hodSignature !== hodSigPre) {
        setHodSigPre(hodSignature);
      }

      if (managerSignature && managerSignature !== managerSigPre) {
        setManagerSigPre(managerSignature);
      }

      form.setValues({
        collegeCity,
        collegeName,
        collegeLogo,
        logoPreview: collegeLogo,
        nameOfHOD: nameOfHOD ?? "",
        latitude,
        longitude,
        hodSignaturePreview: hodSignature,
        managerSignaturePreview: managerSignature,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return isLoading ? (
    <MLoader type="dots" />
  ) : (
    <Box className={classes.rootBox}>
      <Box className={classes.header}>
        <MTypography
          variant="heading"
          color="white"
          text="College Details"
          className={classes.heading}
        />
        <MTypography
          className={classes.subHeading}
          variant="subTitle"
          text="Complete Details related to college"
          color="white"
        />
      </Box>

      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
          className={classes.fullGrid}
        >
          <MImageInput
            cropShape="rect"
            label="College Logo"
            handleFormSave={handleLogoSave}
            error={form.errors.collegeLogo as string}
            showDeleteButton={mode === "update"}
            initialPreview={logoPreview}
            key={logoPreview || "l"}
          />

          <MImageInput
            cropShape="rect"
            label="Manager Signatrue"
            handleFormSave={handleManagerSignature}
            error={form.errors.managerSignature as string}
            showDeleteButton={mode === "update"}
            initialPreview={managerSigPre}
            aspectRatio={2 / 1}
            key={managerSigPre || "m"}
          />

          <MImageInput
            cropShape="rect"
            label="HOD Signature"
            handleFormSave={handleHODSignature}
            error={form.errors.hodSignature as string}
            showDeleteButton={mode === "update"}
            initialPreview={hodSigPre}
            aspectRatio={2 / 1}
            key={hodSigPre || "h"}
          />
        </Box>

        <MInput
          required
          variant="text"
          label="College Name"
          className={classes.fullGrid}
          value={form.values.collegeName}
          placeholder="Name of college"
          formHandler={form.getInputProps("collegeName")}
          disabled={mode === "edit"}
        />

        <MInput
          disabled={mode === "edit"}
          value={form.values.nameOfHOD}
          required
          variant="text"
          label="Name of HOD"
          placeholder="John Doe"
          formHandler={form.getInputProps("nameOfHOD")}
          className={classes.fullGrid}
        />

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
          className={classes.fullGrid}
        >
          <MInput
            disabled={true}
            required
            value={form.values.collegeCity}
            variant="text"
            label="College City"
            placeholder="Indore"
            formHandler={form.getInputProps("collegeCity")}
          />

          <MInput
            value={String(form.values.latitude)}
            required
            variant="text"
            label="Latitude"
            placeholder="22.5"
            formHandler={form.getInputProps("latitude")}
            disabled={true}
          />

          <MInput
            value={String(form.values.longitude)}
            required
            variant="text"
            label="Longitude"
            disabled={true}
            placeholder="85.22"
            formHandler={form.getInputProps("longitude")}
          />
        </Box>

        {mode === "update" && (
          <MButton type="submit" text="Update" radius="md" variant="filled" />
        )}
        {mode === "edit" && (
          <MButton
            type="button"
            text="Edit"
            radius="md"
            variant="filled"
            handleClick={() => {
              setMode("update");
            }}
          />
        )}
      </form>
    </Box>
  );
};

export default memo(CollegeContainer);
