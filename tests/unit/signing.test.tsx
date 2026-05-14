import { beforeAll, expect, test, vi } from "vitest";
import {
	fireEvent,
	getByRole,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { AuthForm } from "@/components";

vi.mock("@/config/firebase", () => ({ app: {}, auth: {}, db: {} }));
vi.mock("firebase/auth", () => ({ signInWithEmailAndPassword: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("next/image", () => ({ default: (props: any) => <img {...props} /> }));
vi.mock("next/link", () => ({
	default: ({ href, children, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));
vi.mock("@/utils", () => ({ loginUser: vi.fn().mockResolvedValue(undefined) }));

beforeAll(() => {
	render(<AuthForm type='signin' />);
});

test("Rendering signin AuthForm test", () => {
	expect(screen.getAllByText("Create a new account")).toBeDefined();
});

test("Test all invalid input signin form", async () => {
	fireEvent.submit(screen.getByRole("button", { name: "Create new account" }));
	await waitFor(() => {
		expect(
			screen.getByRole("paragraph", { name: "error-message" }),
		).toBeDefined();
	});
});

test("", async () => {});
