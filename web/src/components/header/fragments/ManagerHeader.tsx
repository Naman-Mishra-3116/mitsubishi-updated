import MImage from "@/ui/MImage/MImage";
import { Burger, Group } from "@mantine/core";
import React, { memo } from "react";
import Profile from "./Profile";
interface IHeader {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
  background: string;
}

const ManagerHeader: React.FC<IHeader> = ({
  desktopOpened,
  mobileOpened,
  toggleDesktop,
  toggleMobile,
  background,
}) => {
  return (
    <Group
      h="100%"
      px="md"
      bg={background}
      align="center"
      justify="space-between"
    >
      <Group align="center" gap={"xl"}>
        {!mobileOpened && !desktopOpened && (
          <MImage alt="logo" name="mistubishiLogoOnly" width={40} height={40} />
        )}
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="xs"
          size="sm"
        />

        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="xs"
          size="sm"
        />
      </Group>
      <Profile />
    </Group>
  );
};

export default memo(ManagerHeader);
