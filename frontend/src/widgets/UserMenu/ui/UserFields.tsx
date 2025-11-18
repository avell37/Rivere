import { PUBLIC_URL } from "@/shared/libs/constants/url.config";
import { LayoutDashboard, SquareKanban } from "lucide-react";

export const userMenuFields = (t: (key: string) => string) => [
    {
        title: "Профиль",
        url: PUBLIC_URL.dashboard(),
        icon: LayoutDashboard
    },
    {
        title: "Действия",
        url: PUBLIC_URL.boards(),
        icon: SquareKanban
    },
    {
        title: "Карточки",
        url: PUBLIC_URL.boards(),
        icon: SquareKanban
    },
    {
        title: "Настройки",
        url: PUBLIC_URL.boards(),
        icon: SquareKanban
    },
]