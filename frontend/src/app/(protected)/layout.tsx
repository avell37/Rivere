import { SidebarProvider, SidebarTrigger } from "@/shared/ui/external/Sidebar/ui/Sidebar";
import { Header } from "@/widgets/Header/Header";
import { Sidebar } from "@/widgets/Sidebar/ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar />
            <main className="w-full">
                <Header />
                {children}
            </main>
        </SidebarProvider>
    )
}