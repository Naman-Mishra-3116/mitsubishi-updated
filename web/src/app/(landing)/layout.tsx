import Footer from "@/components/footer/fragments/Footer";
import LandingHeader from "@/components/header/fragments/LandingHeader";
import { Box } from "@mantine/core";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Box
      bg={"#E6E5E4"}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <LandingHeader />
      <Box style={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}
