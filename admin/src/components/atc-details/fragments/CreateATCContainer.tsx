"use client";
import React, { memo, useEffect, useState } from "react";
import classes from "../styles/createATCContainer.module.scss";
import CreateATCConfirm from "./CreateATCConfirm";
import CreateATCForm from "./CreateATCForm";
import { useForm, yupResolver } from "@mantine/form";
import {
  createATCIntials,
  validateCreateATC,
} from "@/validation/createAtc.validator";
import { useAddATCMuation } from "@/hooks/mutation/useCreateATC.mutation";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/enums/queryKey.enum";

interface IProps {}

const CreateATCContainer: React.FC<IProps> = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [atcImagePreview, setAtcImagePreview] = useState<string>("");
  const { mutateAsync } = useAddATCMuation();
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: createATCIntials,
    validate: yupResolver(validateCreateATC),
  });

  useEffect(() => {
    if (file) {
      setAtcImagePreview(URL.createObjectURL(file as Blob));
    }
  }, [file]);

  const handleClick = () => {
    const validationResult = form.validate();
    if (!file) {
      form.setFieldError("atcImage", "ATC image is required");
      return;
    }
    if (validationResult.hasErrors) {
      return;
    }
    setShowPreview(true);
  };

  const handleSubmit = async (values: typeof form.values) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("atcImage", file);
    formData.append("atcName", values.atcName);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("managerName", values.managerName);
    formData.append("managerEmail", values.managerEmail);
    formData.append("managerPassword", values.managerPassword);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("existing", "");
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("collegeName", values.collegeName);

    const resp = await mutateAsync(formData);
    if (resp.status === "success") {
      notifications.show({
        message: resp.title,
        color: "green",
      });
      form.setValues(createATCIntials);
      setShowPreview(false);
      setFile(undefined);
      setAtcImagePreview("");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_ATC] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_MANAGERS] });
    } else {
      notifications.show({
        message: resp.message,
        color: "red",
      });
    }
  };

  return (
    <div className={`${showPreview ? classes.root : classes.singleRoot}`}>
      <CreateATCForm
        form={form}
        handleSaveFile={(file) => setFile(file)}
        showPreview={showPreview}
        handleSubmit={handleClick}
      />
      {showPreview && (
        <CreateATCConfirm
          atcImagePreview={atcImagePreview}
          onClickCancel={() => setShowPreview(false)}
          form={form}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default memo(CreateATCContainer);
