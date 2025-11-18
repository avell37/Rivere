'use client';
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../external/Select/Select";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher = () => {
    const t = useTranslations("theme");
    const { setTheme, theme } = useTheme();

    return (
        <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-[180px] px-2 py-1 rounded hover:bg-custom-hover transition-all">
            <SelectValue placeholder={t("selectTheme")} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="light">
                <div className="flex items-center gap-2">
                    <Sun className="size-4" />
                    {t("light")}
                </div>
            </SelectItem>
            <SelectItem value="dark">
                <div className="flex items-center gap-2">
                    <Moon className="size-4" />
                    {t("dark")}
                </div>
                </SelectItem>
        </SelectContent>
        </Select>
    )
}