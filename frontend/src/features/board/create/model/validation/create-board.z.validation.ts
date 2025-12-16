import z from 'zod'

export const CreateBoardSchema = z.object({
	title: z.string().max(32, 'Максимальная длина названия доски - 32 символа'),
	background: z.object({
		color: z.string().nullable(),
		url: z.string().nullable()
	})
})

export type CreateBoardRequest = z.infer<typeof CreateBoardSchema>
