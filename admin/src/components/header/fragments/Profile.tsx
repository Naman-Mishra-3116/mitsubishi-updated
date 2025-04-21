"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { ROUTES } from "@/enums/routes.enum";
import { useAdminLogoutMutation } from "@/hooks/mutation/useAdminLogout.mutation";
import { useAppSelector } from "@/store/hooks";
import MTypography from "@/ui/MTypography/MTypography";
import { Avatar, Box, Flex, Group, Menu } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import {
  IconChevronDown,
  IconChevronUp,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

const Profile = () => {
  const [opened, setOpened] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 550px)");

  const { email, fullName } = useAppSelector((state) => state.auth.user);

  const { mutateAsync } = useAdminLogoutMutation();

  const queryClient = useQueryClient();

  const handleAdminLogout = async () => {
    const res = await mutateAsync();
    if (res.status === "success") {
      notifications.show({
        title: res.title,
        message: res.message,
        color: "green",
      });
    }

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_PROFILE_DATA] });
  };

  const router = useRouter();

  return (
    <Menu opened={opened} onChange={setOpened} withArrow>
      <Menu.Target>
        <Group
          align="center"
          justify="space-between"
          mr={"10%"}
          style={{ cursor: "pointer" }}
        >
          <Avatar
            bg={"#6c757d"}
            radius="sm"
            color="rgb(255, 255, 255)"
            src=""
          />
          {!isSmallScreen && (
            <Box>
              <MTypography
                variant="normal"
                text={fullName}
                fontSize="16px"
                fontWeight={600}
                color="white9B"
              />
            </Box>
          )}
          {opened ? (
            <IconChevronUp color="black" size={18} />
          ) : (
            <IconChevronDown color="black" size={18} />
          )}
        </Group>
      </Menu.Target>
      <Menu.Dropdown w={150}>
        <Menu.Item onClick={handleAdminLogout}>
          <Flex justify={"space-around"}>
            <IconLogout />
            <MTypography
              text="Logout"
              fontSize="14px"
              fontWeight={400}
              variant="description"
            />
          </Flex>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            router.replace(ROUTES.PROFILE);
          }}
        >
          <Flex justify={"space-around"}>
            <IconUser />
            <MTypography
              text="Profile"
              fontSize="14px"
              fontWeight={400}
              variant="description"
            />
          </Flex>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default memo(Profile);
