import Layout from "@/layouts/Layout";
export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <Layout layoutType="details">{children}</Layout>;
}
