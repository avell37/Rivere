'use client';
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../external/Select/Select";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const t = useTranslations("theme");
    const { setTheme, theme } = useTheme();

    return (
        <Select value={theme} defaultValue={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-[180px] border px-2 py-1 rounded hover:bg-custom-hover transition-all">
            <SelectValue placeholder={t("selectTheme")} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="light">{t("light")}</SelectItem>
            <SelectItem value="dark">{t("dark")}</SelectItem>
        </SelectContent>
        </Select>
    )
}