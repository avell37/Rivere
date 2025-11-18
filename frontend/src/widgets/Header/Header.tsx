import { SidebarTrigger } from "@/shared/ui/external"
import { UserMenu } from "../UserMenu/ui/UserMenu"
import { ThemeSwitcher } from "@/shared/ui/custom/ThemeSwitcher/ThemeSwitcher"

export const Header = () => {
    return (
        <div className="flex items-center justify-between bg-white/70 dark:bg-neutral-900/60 px-4">
            <SidebarTrigger
                className="cursor-pointer"
            />
            <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <UserMenu />
            </div>
        </div>
    )
}
