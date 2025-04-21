"use client";
import { QUERY_KEY } from "@/enums/queryKey.enum";
import { useManagerLogoutMutation } from "@/hooks/mutation/useManagerLogout.mutation";
import { useAppSelector } from "@/store/hooks";
import MTypography from "@/ui/MTypography/MTypography";
import { Avatar, Box, Flex, Group, Menu } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconChevronDown,
  IconChevronUp,
  IconLogout,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

const Profile = () => {
  const [opened, setOpened] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 550px)");

  const { managerEmail, managerName } = useAppSelector(
    (state) => state.auth.user
  );

  const queryClient = useQueryClient();

  const { mutateAsync } = useManagerLogoutMutation();

  const router = useRouter();

  const handleAdminLogout = async () => {
    const res = await mutateAsync();
    if (res.status === "success") {
      notifications.show({
        title: res.title,
        message: res.message,
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_MANAGER_LOGIN_DATA],
      });
      router.push("/");
    }
  };

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
                text={managerName}
                fontSize="16px"
                fontWeight={600}
                color="white9B"
              />
              <MTypography
                variant="normal"
                text={managerEmail}
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
      </Menu.Dropdown>
    </Menu>
  );
};

export default memo(Profile);
