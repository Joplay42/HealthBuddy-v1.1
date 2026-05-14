import { Dashboard } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider>
      <Dashboard>{children}</Dashboard>
    </ThemeProvider>
  );
};

export default layout;
