"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    CreateBoardRequest,
    CreateBoardSchema,
} from "../validation/create.z.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createBoard } from "@/entities/Board/model/api/boardApi";
import { toast } from "sonner";

export const useCreateBoard = () => {
    const form = useForm<CreateBoardRequest>({
        resolver: zodResolver(CreateBoardSchema),
        defaultValues: {
            title: "",
            background: "",
        },
    });

    const { mutate } = useMutation({
        mutationKey: ["create board"],
        mutationFn: (data: CreateBoardRequest) => createBoard(data),
        onSuccess: () => {
            form.reset();
            toast.success("Доска успешно создана.");
        },
        onError(err) {
            if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("Ошибка при создании доски.");
            }
        },
    });

    const onSubmit: SubmitHandler<CreateBoardRequest> = (data) => mutate(data);

    return {
        form,
        onSubmit,
    };
};
