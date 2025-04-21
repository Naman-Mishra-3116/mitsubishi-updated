"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useAdminLoginMutation } from "@/hooks/mutation/useAdminLogin.mutation";
import { useAppSelector } from "@/store/hooks";
import MButton from "@/ui/MButton/MButton";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import {
  loginFormInitial,
  loginFormValidation,
} from "@/validation/loginForm.validatior";
import { Center } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, memo } from "react";
import classes from "../styles/loginForm.module.scss";

interface IProps {
  temp?: string;
}

const LoginForm: React.FC<IProps> = () => {
  const form = useForm({
    initialValues: loginFormInitial,
    validate: yupResolver(loginFormValidation),
  });

  const { mutateAsync } = useAdminLoginMutation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    router.push("/");
  }

  const handleLoginFormSubmit = async (
    values: typeof form.values,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    const res = await mutateAsync({
      email: values.email,
      password: values.password,
    });

    if (res.status === "success") {
      notifications.show({
        title: res.title,
        message: res.message,
        color: "green",
        position: "top-left",
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_PROFILE_DATA],
      });

      router.replace("/");
    } else {
      notifications.show({
        title: res.title,
        message: res.message,
        color: "red",
      });
    }
  };

  return (
    <Center className={classes.rootCenter}>
      <MTypography
        variant="subHeading"
        text="Admin"
        className={classes.heading}
      />
      <form
        onSubmit={form.onSubmit(handleLoginFormSubmit)}
        className={classes.form}
      >
        <MInput
          variant="text"
          formHandler={form.getInputProps("email")}
          label="Email"
          placeholder="abc@example.com"
          required
        />

        <MInput
          variant="password"
          formHandler={form.getInputProps("password")}
          label="Password"
          placeholder="********"
          required
        />
        <MButton variant="filled" text="Login" type="submit" />
      </form>
    </Center>
  );
};

export default memo(LoginForm);
