'use client';
import { SERVER_URL } from "@/shared/libs/constants/api.config";
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc';
import { FaYandex } from 'react-icons/fa'
import { Button } from "@/shared/ui/external/Button/Button";
import { useTranslations } from "next-intl";

export function AuthSocials() {
    const router = useRouter();
    const t = useTranslations('auth');

    return (
        <div className="flex gap-4">
            <Button
                variant="default"
                className="flex items-center rounded-xl border"
                onClick={() => router.push(`${SERVER_URL}/auth/google`)}
            >
                <FcGoogle />
                {t("google")}
            </Button>
            <Button
                variant="default"
                className="flex items-center rounded-xl border"
                onClick={() => router.push(`${SERVER_URL}/auth/google`)}
            >
                <FaYandex />
                {t("yandex")}
            </Button>
        </div>
    )
}