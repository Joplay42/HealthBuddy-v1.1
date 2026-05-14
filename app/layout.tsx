import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
});

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
		<html lang='en' suppressHydrationWarning>
			<head>
				{/* Blocking script: sets dark class before first paint to prevent theme flash */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('hb-theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){}})();`,
					}}
				/>
			</head>
			<body
				id='home'
				className={`${montserrat.className} ${inter.variable} ${jetbrainsMono.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
