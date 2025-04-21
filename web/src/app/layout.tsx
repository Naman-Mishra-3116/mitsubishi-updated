import QueryProvider from "@/layout/QueryProvider";
import ReduxStoreProvider from "@/layout/ReduxStoreProvider";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import ProfilerFetcher from "@/layout/ProfilerFetcher";

export const metadata: Metadata = {
  title: "Mitsubishi ATC",
};

export const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["cyrillic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryProvider>
          <MantineProvider>
            <Notifications w={400} position={"top-left"} zIndex={20000} />
            <ReduxStoreProvider>
              <ProfilerFetcher>{children}</ProfilerFetcher>
            </ReduxStoreProvider>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
