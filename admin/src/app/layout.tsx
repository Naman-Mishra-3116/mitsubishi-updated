import "./globals.css";
import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import QueryProvider from "@/layouts/QueryProvider";
import ReduxStoreProvider from "@/layouts/ReduxStoreProvider";
import { Roboto } from "next/font/google";
import ProfileFetcher from "@/layouts/ProfileFetcher";

export const metadata = {
  title: "Admin",
};

export const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["cyrillic"],
});

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head></head>
      <body className={roboto.className}>
        <QueryProvider>
          <MantineProvider>
            <Notifications w={400} position={"top-left"} zIndex={20000} />
            <ReduxStoreProvider>
              <ProfileFetcher>{children}</ProfileFetcher>
            </ReduxStoreProvider>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
