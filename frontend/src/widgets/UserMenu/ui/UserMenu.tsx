'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/external/Avatar/Avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/external/Dropdown/Dropdown"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/external/Sidebar/ui/Sidebar"
import { EllipsisVertical, LogOut, Settings, User } from "lucide-react"

export const UserMenu = () => {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton size="lg">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage></AvatarImage>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col leading-tight">
                                    <span className="truncate font-medium">Username</span>
                                    <span className="text-xs">Email@gmail.com</span>
                                </div>
                                <div className="ml-auto">
                                    <EllipsisVertical />
                                </div>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-58">
                            <DropdownMenuItem>
                                <User />
                                Профиль
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings />
                                Настройки
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut />
                                Выход
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}
