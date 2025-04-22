"use client";
import ManagerHeader from "@/components/header/fragments/ManagerHeader";
import Navbar from "@/components/navbar/fragments/Navbar";
import { useAppSelector } from "@/store/hooks";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { memo, ReactNode, useEffect, useState } from "react";
interface IProps {
  children: ReactNode;
}

const ManagerLayout: React.FC<IProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false && loading === false) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router, loading]);


  return (
    <AppShell
      header={{ height: 70 }}
      layout="alt"
      navbar={{
        width: 280,
        breakpoint: "xs",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <ManagerHeader
          background={"#eeeeee"}
          desktopOpened={desktopOpened}
          mobileOpened={mobileOpened}
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main bg={"#eeeeee"}>
        <ModalsProvider
          modalProps={{
            styles: {
              root: { zIndex: 10 },
              body: { zIndex: 10 },
              overlay: { zIndex: 10 },
              content: { zIndex: 10 },
            },
          }}
        >
          {children}
        </ModalsProvider>
      </AppShell.Main>
    </AppShell>
  );
};

export default memo(ManagerLayout);
