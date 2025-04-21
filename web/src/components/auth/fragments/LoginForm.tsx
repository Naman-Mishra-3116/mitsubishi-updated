"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useATCLoginMutation } from "@/hooks/mutation/useATCLoginMutation";
import { useAppSelector } from "@/store/hooks";
import MButton from "@/ui/MButton/MButton";
import MInput from "@/ui/MInput/MInput";
import MTypography from "@/ui/MTypography/MTypography";
import {
  loginFormInitial,
  loginFormValidation,
} from "@/validation/login.validation";
import { Center } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, memo, useEffect } from "react";
import classes from "../styles/loginForm.module.scss";

interface IProps {
  temp?: string;
}

const LoginForm: React.FC<IProps> = () => {
  const form = useForm({
    initialValues: loginFormInitial,
    validate: yupResolver(loginFormValidation),
  });

  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { mutateAsync } = useATCLoginMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLoginFormSubmit = async (
    values: typeof form.values,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    const resp = await mutateAsync({
      email: values.email,
      password: values.password,
    });

    if (resp.status === "success") {
      notifications.show({
        message: resp.message,
        title: resp.title,
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_MANAGER_LOGIN_DATA],
      });
      router.replace("/");
    } else {
      notifications.show({
        message: resp.message,
        title: resp.title,
        color: "red",
      });
    }
  };

  return (
    <Center className={classes.rootCenter}>
      <MTypography
        variant="subHeading"
        text="ATC Login"
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
