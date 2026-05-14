import { Copyrights } from "@/components";
import React from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='bg-ink-950 text-bone font-sans h-screen flex flex-col overflow-hidden'>
			<div className='flex-1 min-h-0 overflow-auto'>{children}</div>
			<Copyrights width={"auto"} />
		</div>
	);
};

export default layout;
