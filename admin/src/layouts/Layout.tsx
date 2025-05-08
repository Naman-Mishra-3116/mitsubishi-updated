"use client";
import Header from "@/components/header/fragments/Header";
import Navbar from "@/components/navbar/fragments/Navbar";
import { useGetAdminProfileData } from "@/hooks/query/useAdminProfileData.query";
import { useAppDispatch } from "@/store/hooks";
import { setUserData } from "@/store/reducers/authSlice";
import MLoader from "@/ui/MLoader/MLoader";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { memo, ReactNode, useEffect } from "react";
interface IProps {
  children: ReactNode;
  layoutType: "home" | "details";
}

const Layout: React.FC<IProps> = ({ children, layoutType }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const router = useRouter();
  const { data, isPending, isError } = useGetAdminProfileData();
  console.log(data, "data is this ");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(
        setUserData({
          isAuthenticated: true,
          user: {
            id: data.data.id,
            email: data.data.email,
            fullName: data.data.fullName,
            permission: data.data.permission,
            role: data.data.role,
          },
        })
      );
    } else if (isError) {
      router.replace("/login");
    }
  }, [data, isError, dispatch, router]);

  if (isPending) {
    return <MLoader type="dots" size="lg" />;
  }

  if (isError) {
    return null;
  }

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
        <Header
          background={"#eeeeee"}
          desktopOpened={desktopOpened}
          mobileOpened={mobileOpened}
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar layoutType={layoutType} />
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

export default memo(Layout);
