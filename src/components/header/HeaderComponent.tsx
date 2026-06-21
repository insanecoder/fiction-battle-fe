import logoUrl from "../../assets/fiction_battle.svg"
import { ThemeToggle } from "../ThemeToggle";
import ComposeButton from "../../common/components/ComposeButton";
import { useAuthStore } from "../../store/AuthStore";
import { logoutUser } from "../../common/utils/FirebaseUtils";

export function HeaderComponent() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const handleLogout = async () => {
        await logoutUser();
        logout();
    };

    return <header className="site-header">
        <div className="flex justify-between">
            <div className="flex">
                <img src={logoUrl} alt="Fiction Battle" className="h-[70px] inline" />
                <p className="inline ml-5 text-header self-center">Fiction Battle</p>
            </div>

            <div className="flex items-center">
                <ThemeToggle></ThemeToggle>
                <ComposeButton extraClasses={`ml-10 self-center ${user ? "py-2" : ""}`} />
                {user && (
                    <button
                        onClick={handleLogout}
                        className="ml-3 self-center text-sm font-medium text-slate-400 dark:text-dark-muted px-3 py-1.5 rounded-md hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors duration-150 cursor-pointer"
                    >
                        Log out
                    </button>
                )}
            </div>
        </div>

    </header>
}
