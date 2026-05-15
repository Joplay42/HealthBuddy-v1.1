import { Website } from "@/components";
import { Suspense } from "react";

const page = () => {
	return (
		<Suspense>
			<Website />
		</Suspense>
	);
};

export default page;
