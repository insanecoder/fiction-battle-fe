import { vi, test, expect, describe } from "vitest";
import { ThemeToggle } from "../../ThemeToggle";
import { render, screen } from "@testing-library/react";
import { HeaderComponent } from "../HeaderComponent";
import userEvent from "@testing-library/user-event"
import { useAuthStore } from "../../../store/AuthStore";

vi.mock("../../../store/AuthStore", ()=>{
    const userState = {user:null, setUser:vi.fn((u) => {
        userState.user = u;
    }) };
    return { useAuthStore: ()=>userState };
});

describe ("HeaderComponent", () => {
    test("toggles theme from light → dark → light", async () => {
        render(<ThemeToggle />)
        const toggleBtn = screen.getByLabelText(/toggle theme/i);
        expect(document.documentElement.classList.contains("dark")).toBe(false);

        await userEvent.click(toggleBtn);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    })

    test("ComposeButton flow (logged out → login → compose)", async () => {
    const mockStore = useAuthStore() as any;
    render(<HeaderComponent />);

    // Click Compose Post (opens login modal)
    await userEvent.click(screen.getByLabelText(/compose a post/i));
    expect(screen.getByText(/Sign in to Compose a Post/i)).toBeInTheDocument();

    // Click Sign in (calls setUser and opens compose modal)
    await userEvent.click(screen.getByRole("button", { name: /Sign In With Google/i }));

    expect(mockStore.setUser).toHaveBeenCalledTimes(1);
    expect(mockStore.user).toEqual(
        expect.objectContaining({
        name: "Abhinav",
        email: "abhinavsharma2308@gmail.com",
        userName: "abhinavsharma2308",
        })
    );

    // Compose modal now open
    expect(screen.getByText("Compose a Post")).toBeInTheDocument();
    });
})
