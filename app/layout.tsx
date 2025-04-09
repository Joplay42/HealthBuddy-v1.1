import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthBuddy",
  description: "Your HealthBuddy to track your progress!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="home" className={`${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}
