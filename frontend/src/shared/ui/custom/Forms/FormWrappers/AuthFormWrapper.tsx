"use client"
import { AuthSocials } from "@/features/auth";
import { PUBLIC_URL } from "@/shared/libs/constants/url.config";
import { Button } from "@/shared/ui/external/Button/Button";
import { Form } from "@/shared/ui/external/Form/Form";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onSubmit: SubmitHandler<T>;
    isPending: boolean,
    children: React.ReactNode;
    label: string;
    buttonLabel: string;
    navigationLabel: string;
}

export const FormAuthWrapper = <T extends FieldValues>({
    form,
    isPending,
    label,
    buttonLabel,
    navigationLabel,
    children,
    onSubmit, 
}: FormWrapperProps<T>) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleSwitch = () => {
        if (pathname.includes("login")) router.push(`${PUBLIC_URL.auth()}/register`)
        else router.push(`${PUBLIC_URL.auth()}/login`)
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {children}
                <Button
                    variant="default"
                    type="submit"
                    className="block w-full rounded-xl"
                    disabled={isPending}
                >
                    {buttonLabel}
                </Button>
                <div className="flex justify-center items-center gap-2">
                    <AuthSocials />
                </div>
                <div className="flex justify-center items-center gap-1">
                    <span className="text-white max-sm:text-sm">{label}</span>
                    <Button
                        variant="none"
                        size="none"
                        type="button"
                        className="text-white cursor-pointer text-base hover:text-white/70"
                        onClick={handleSwitch}
                    >
                        {navigationLabel}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
