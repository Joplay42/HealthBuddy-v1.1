import { Dashboard } from "@/components";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Return the dashboard component to fetch the user
  return (
    <>
      <Dashboard>{children}</Dashboard>
    </>
  );
};

export default layout;
