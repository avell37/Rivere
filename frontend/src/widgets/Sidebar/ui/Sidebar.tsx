import { SidebarContent, SidebarGroup, SidebarHeader, SidebarMain, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/shared/ui/external/Sidebar/ui/Sidebar"
import { useTranslations } from "next-intl"
import Link from "next/link";
import { sidebarFields } from "./SidebarFields";
import { UserMenu } from "@/widgets/UserMenu/ui/UserMenu";
import { PUBLIC_URL } from "@/shared/libs/constants/url.config";

export const Sidebar = () => {
    const t = useTranslations();
    const sidebar = sidebarFields(t);

    return (
        <SidebarMain>
            <SidebarHeader className="font-bold py-4">
                <Link
                    href={PUBLIC_URL.dashboard()}
                    className="text-3xl px-2"
                >
                    Rivere
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebar.map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton asChild>
                                    <Link 
                                        href={item.url}
                                        className="py-6 pr-6"
                                    >
                                        <item.icon />
                                        <span className="text-base">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </SidebarMain>
    )
}
