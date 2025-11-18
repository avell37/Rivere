import { PUBLIC_URL } from "@/shared/libs/constants/url.config";
import { LayoutDashboard, SquareKanban } from "lucide-react";

export const sidebarFields = (t: (key: string) => string) => [
    {
        title: "Dashboard",
        url: PUBLIC_URL.dashboard(),
        icon: LayoutDashboard
    },
    {
        title: "Boards",
        url: PUBLIC_URL.boards(),
        icon: SquareKanban
    }
]