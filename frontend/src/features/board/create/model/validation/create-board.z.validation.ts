import z from "zod";

export const CreateBoardSchema = z.object({
    title: z.string().max(32, "Максимальная длина названия доски - 32 символа"),
    background: z.string(),
});

export type CreateBoardRequest = z.infer<typeof CreateBoardSchema>;
