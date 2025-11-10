"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/authApi";
import { PUBLIC_URL } from "@/shared/libs/constants/url.config";
import {
    registerSchema,
    SignUpRequest,
} from "../validation/register.z.validation";

export const useRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<SignUpRequest>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: "", email: "", password: "" },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["register user"],
        mutationFn: (data: SignUpRequest) => register(data),
        onSuccess: () => {
            form.reset();
            toast.success("Успешно");
            router.replace(PUBLIC_URL.home());
        },
        onError(err) {
            if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("Ошибка при авторизации");
            }
        },
    });

    const onSubmit: SubmitHandler<SignUpRequest> = (data) => {
        mutate(data);
    };

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    return {
        form,
        isPending,
        showPassword,
        toggleShowPassword,
        onSubmit,
    };
};
